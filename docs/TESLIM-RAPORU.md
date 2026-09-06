# Portföy yenilemesi — 6 Eylül 2026

## Sonuç

İki kaynak prompt; el yazısı animasyonu ve Lenis kaydırmalı proje sunumu olarak kişisel portföye uyarlandı.
10 proje hikâyesi, üç ana vitrin, hizmetler, dört aşamalı çalışma süreci, CV deneyimi ve proje görüşmesi akışı tamamlandı.
TR/EN, açık/koyu tema ve yerel tercih saklama korunup yenilendi.

## İçerik kaynakları

- Kullanıcının Desktop/Yeni klasör içindeki dört Said Bayraktar PDF CV'si.
- B2B projesinin docs/hafiza/MEMORY.md indeksi ve ürün ekranları.
- Neva QR, Vega Ticket, Galya Panel, Hızlı Belge Doldurucu ve SeaWatch README kayıtları.
- GitHub kullanıcısı saidbayraqtars'ın herkese açık API çıktısı: kontrolde 23 depo.
- Mevcut portföyün lib/content.ts içeriği.

Ekran görüntüleri:
- B2B: docs/design/screens/adim-12/pano-durum.png (Demo Toptan).
- Neva: docs/ekran-goruntuleri/pazarlama.png ve menu-lumina.png.
- Diğer detay görselleri açıkça şematik sunum olarak etiketlendi.

## Kontroller

- npm run build: başarılı, 10 proje detay sayfası statik üretildi.
- npm run typecheck: başarılı.
- npm run lint: hata ve uyarı yok.
- npm run test:e2e: 6/6 geçti.
- 320, 390, 768, 1024 ve 1440 px genişlikte yatay taşma yok.
- Açık/koyu temada axe WCAG 2 A/AA ve 2.1 AA otomatik taraması: ihlal yok.
- Mobil menü açma/kapama ve CV bölümüne gitme başarılı.
- TR/EN tercihi yenileme sonrasında korundu.
- CV rol/dil seçimi ve gerçek PDF indirme doğrulandı; dört PDF HTTP 200.
- Proje filtreleme, detay sayfası, geri dönüş ve çapa gezinmesi geçti.
- 10 proje rotası HTTP 200; bilinmeyen proje HTTP 404.
- GitHub canlı yanıtı, hata mesajı ve tekrar deneme akışı geçti.
- Hareket azaltma ve font indirilemediğinde metin fallback'i doğrulandı.
- Form doğrulaması, WhatsApp ve e-posta hedefleri kontrol edildi; testten mesaj gönderilmedi.
- Sitemap, robots, OG ve favicon HTTP 200.
- Neva QR, TeknoKlinik Toner, Expert Bilişim ve Damrenur Günel dış site bağlantıları HTTP 200.

Bu otomatik kontroller erişilebilirlik veya her cihaz için mutlak kusursuzluk iddiası değildir.

## Görsel kanıt

- desktop-preview.png
- mobile-hero.png
- projects-preview.png
- dark-preview.png
- english-mobile.png

## Teslim sınırı

Yerel üretim önizlemesi: http://127.0.0.1:3010
Canlı Vercel yayını bu çalışmada değiştirilmedi.
İletişim formu e-posta taslağı açar; bir e-posta gönderim servisi bağlı değildir.
Önceki kaynakların arşivi Windows geçici klasöründe said-portfolio-before-20260906.zip olarak saklandı.


## Animasyon revizyonu — 6 Eylül 2026

- Kullanıcının geri bildirimiyle ilk ziyaretin varsayılan teması koyu yapıldı. Açık tema açıkça seçilirse seçim korunur.
- Açılış el yazısı üç ifade arasında 4,2 saniyelik döngüde yeniden çizilir; duraklat/sürdür düğmesi eklendi.
- Proje vitrini ekran yüksekliğine göre boyutlandırılan sabit panellere dönüştürüldü. Sonraki panel yaklaşırken önceki panel küçülerek geriye çekilir; yukarı kaydırmada hareket tersine döner.
- Önceki 760 px yükseklik sınırı kaldırıldı. 1280×700 masaüstü ve 390×844 mobilde efekt ve içerik taşmaları doğrulandı.
- Çok küçük/yatay ekranlar ve hareket azaltma tercihi normal belge akışını kullanır.
- Mevcut 6 uçtan uca test ve yeni 2 animasyon testi geçti. Yeni testler kelime değişimi, duraklat/sürdür, tema seçimi kalıcılığı, üst üste geçiş ve ters kaydırmayı kontrol eder.
- Yeni görsel kanıt: scroll-stack-desktop.png ve scroll-stack-mobile.png.
