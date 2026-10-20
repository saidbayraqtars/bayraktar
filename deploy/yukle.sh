#!/usr/bin/env bash
# sbayraktar.com.tr — build and publish to the Neva VPS.
#
# Usage (from the project root, Git Bash):  bash deploy/yukle.sh
#
# 1. npm run build  -> out/ (static export + WebP widths + redirects snippet)
# 2. out/ is unpacked into a temp dir and swapped into /var/www/sbayraktar in
#    one move, so visitors never see a half-uploaded site.
# 3. nginx files from deploy/nginx are installed; nginx is reloaded only if
#    `nginx -t` passes. The first run also creates a temporary self-signed
#    certificate and a CSR for Cloudflare Origin CA (deploy/sertifika.sh).

set -euo pipefail

SUNUCU="${NEVA_SSH:-nevaqr}"        # host entry in ~/.ssh/config
HEDEF="/var/www/sbayraktar"

cd "$(dirname "$0")/.."

echo "-> building"
npm run build >/dev/null

echo "-> sending site to $SUNUCU"
tar -czf - -C out . | ssh "$SUNUCU" "
  set -e
  YENI=\$(mktemp -d /var/www/.sbayraktar.XXXXXX)
  tar -xzf - -C \"\$YENI\"
  chown -R www-data:www-data \"\$YENI\"
  find \"\$YENI\" -type d -exec chmod 755 {} \;
  find \"\$YENI\" -type f -exec chmod 644 {} \;
  ESKI=\$(mktemp -d /var/www/.sbayraktar-eski.XXXXXX)
  mv $HEDEF \"\$ESKI/eski\" 2>/dev/null || true
  mv \"\$YENI\" $HEDEF
  rm -rf \"\$ESKI\"
"

echo "-> installing nginx config"
tar -czf - -C deploy/nginx sbayraktar.conf sbayraktar-headers.conf sbayraktar-redirects.conf | ssh "$SUNUCU" "
  set -e
  T=\$(mktemp -d)
  tar -xzf - -C \"\$T\"
  if [ ! -f /etc/ssl/sbayraktar/origin.key ]; then
    mkdir -p /etc/ssl/sbayraktar && chmod 700 /etc/ssl/sbayraktar
    openssl req -new -newkey rsa:2048 -nodes -keyout /etc/ssl/sbayraktar/origin.key \
      -subj '/CN=sbayraktar.com.tr' -addext 'subjectAltName=DNS:sbayraktar.com.tr,DNS:*.sbayraktar.com.tr' \
      -out /etc/ssl/sbayraktar/origin.csr 2>/dev/null
    openssl x509 -req -days 30 -in /etc/ssl/sbayraktar/origin.csr -signkey /etc/ssl/sbayraktar/origin.key \
      -copy_extensions copy -out /etc/ssl/sbayraktar/origin.pem 2>/dev/null
    chmod 600 /etc/ssl/sbayraktar/origin.key
    echo '   temporary self-signed certificate created; CSR: /etc/ssl/sbayraktar/origin.csr'
  fi
  for f in sbayraktar-headers.conf sbayraktar-redirects.conf; do
    [ -f /etc/nginx/snippets/\$f ] && cp /etc/nginx/snippets/\$f \"\$T/\$f.onceki\"
    install -m 644 \"\$T/\$f\" /etc/nginx/snippets/\$f
  done
  [ -f /etc/nginx/sites-available/sbayraktar.conf ] && cp /etc/nginx/sites-available/sbayraktar.conf \"\$T/sbayraktar.conf.onceki\"
  install -m 644 \"\$T/sbayraktar.conf\" /etc/nginx/sites-available/sbayraktar.conf
  ln -sf /etc/nginx/sites-available/sbayraktar.conf /etc/nginx/sites-enabled/sbayraktar.conf
  if nginx -t 2>/dev/null; then
    systemctl reload nginx
    echo '   nginx reloaded'
  else
    nginx -t || true
    echo '   nginx -t FAILED: restoring previous files, nginx not reloaded'
    for f in sbayraktar-headers.conf sbayraktar-redirects.conf; do
      [ -f \"\$T/\$f.onceki\" ] && install -m 644 \"\$T/\$f.onceki\" /etc/nginx/snippets/\$f
    done
    if [ -f \"\$T/sbayraktar.conf.onceki\" ]; then
      install -m 644 \"\$T/sbayraktar.conf.onceki\" /etc/nginx/sites-available/sbayraktar.conf
    else
      rm -f /etc/nginx/sites-enabled/sbayraktar.conf
    fi
    rm -rf \"\$T\"; exit 1
  fi
  rm -rf \"\$T\"
"

echo "-> checking"
ssh "$SUNUCU" "for u in / /isler /p/okka /projects/neva-qr /olmayan-sayfa; do
  printf '%-18s ' \"\$u\"; curl -sk -o /dev/null -w '%{http_code} %{redirect_url}\n' --resolve www.sbayraktar.com.tr:443:127.0.0.1 \"https://www.sbayraktar.com.tr\$u\"
done"

echo "OK - https://www.sbayraktar.com.tr"
