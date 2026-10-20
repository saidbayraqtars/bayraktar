#!/usr/bin/env bash
# Installs the Cloudflare Origin CA certificate for sbayraktar.com.tr.
#
# The private key never leaves the server: deploy/yukle.sh created it with a CSR.
#   1. bash deploy/sertifika.sh csr          -> prints the CSR
#   2. Cloudflare > sbayraktar.com.tr > SSL/TLS > Origin Server > Create Certificate
#      > "Use my private key and CSR", paste the CSR, 15 years, PEM.
#   3. Save the certificate it shows to a file, then:
#      bash deploy/sertifika.sh kur origin.pem
#   4. Cloudflare SSL/TLS mode: Full (strict).

set -euo pipefail
SUNUCU="${NEVA_SSH:-nevaqr}"

case "${1:-}" in
  csr)
    ssh "$SUNUCU" "cat /etc/ssl/sbayraktar/origin.csr"
    ;;
  kur)
    PEM="${2:?certificate file}"
    grep -q 'BEGIN CERTIFICATE' "$PEM" || { echo "not a PEM certificate: $PEM"; exit 1; }
    ssh "$SUNUCU" "
      set -e
      cp /etc/ssl/sbayraktar/origin.pem /etc/ssl/sbayraktar/origin.pem.onceki
      cat > /etc/ssl/sbayraktar/origin.pem
      if openssl x509 -noout -modulus -in /etc/ssl/sbayraktar/origin.pem | cmp -s - <(openssl rsa -noout -modulus -in /etc/ssl/sbayraktar/origin.key) && nginx -t 2>/dev/null; then
        systemctl reload nginx
        openssl x509 -noout -issuer -enddate -in /etc/ssl/sbayraktar/origin.pem
      else
        mv /etc/ssl/sbayraktar/origin.pem.onceki /etc/ssl/sbayraktar/origin.pem
        echo 'certificate does not match the key: previous certificate kept'; exit 1
      fi
    " < "$PEM"
    ;;
  *)
    echo "usage: bash deploy/sertifika.sh csr | kur <origin.pem>"; exit 1 ;;
esac
