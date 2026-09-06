# Said Bayraktar — Portföy & freelance

Next.js 16, React 19, TypeScript, Tailwind CSS v4 ve shadcn/ui ile hazırlanmış kişisel portföy.

GitHub deposu: [saidbayraqtars/bayraktar](https://github.com/saidbayraqtars/bayraktar).

## Yerel çalıştırma

```bash
git clone https://github.com/saidbayraqtars/bayraktar.git
cd bayraktar
npm ci
npm run dev
```

Geliştirme adresi: http://localhost:3000

Üretim önizlemesi:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3010
```

## Doğrulama

```bash
npm run lint
npm run typecheck
npm run test:e2e
```

Uçtan uca testler, 3010 portundaki üretim önizlemesini kullanır. Windows üzerinde kurulu Microsoft Edge ile çalışır.
Testler iletişim mesajı göndermez; form doğrulamasını ve iletişim hedeflerini kontrol eder.

## İçerik ve dosyalar

- `lib/content.ts`: profil, CV kaynaklı deneyim/eğitim, `portfolio.tr/en` arayüz metinleri ve `caseStudies` proje hikâyeleri.
- `app/globals.css`: Tailwind v4, tema tokenları, masaüstü/mobil düzenler.
- `components/ui/`: shadcn bileşenleri ve iki kaynak prompttan uyarlanan `handwriting-text.tsx`, `smooth-scroll.tsx`.
- `components/sections/portfolio-hero.tsx`: açılış ve gerçek proje ekranları.
- `components/sections/project-showcase.tsx`: kayan proje sunumu, kategori filtreleri ve GitHub listesi.
- `components/sections/services.tsx`: hizmetler ve çalışma süreci.
- `components/sections/profile-section.tsx`: hakkımda, deneyim, eğitim, yetenekler ve CV seçimi.
- `components/sections/project-contact.tsx`: proje özeti formu, doğrudan iletişim ve SSS.
- `app/projects/[slug]/page.tsx`: statik üretilen 10 proje detay sayfası.
- `app/api/github/route.ts`: herkese açık GitHub depoları; 1 saat yenileme ve hata yanıtı.
- `public/cv/`: iki rol × iki dil için dört PDF.
- `public/projects/`: yerel proje dokümanlarından alınan ekran görüntüleri.
- `public/fonts/`: yerel Kalam yazı tipi ve OFL lisansı.
- `tests/portfolio.spec.ts`: 6 ana akış senaryosu ve tests/motion.spec.ts içinde 2 animasyon senaryosu.
- `docs/`: ekran görüntüleri ve teslim raporu.

Proje zaten shadcn + TypeScript + Tailwind yapısına uygundur. Yeniden kurulum gerekmez.
Standart bileşen yolu `@/components/ui`, stil yolu `app/globals.css` olarak `components.json` içinde tanımlıdır.
Ortak UI klasörü, shadcn CLI ve bileşen importlarının aynı yapıyı kullanmasını sağlar.

Yeni shadcn bileşeni ekleme:

```bash
npx shadcn@latest add tooltip
```

## İki kaynak bileşenin uyarlanması

El yazısı; verilen SVG kontur çizimi ve tek parçada dolgu yaklaşımını korur.
Üçüncü taraf CDN betiği yerine npm'den tembel yüklenen opentype.js ve yerel lisanslı font kullanır.
Font yüklenmezse metin görünür kalır. Hareket azaltma tercihi desteklenir.

SmoothScroll; Lenis kök sağlayıcısıdır, gerçek sayfa içeriğini children olarak kabul eder ve main ref'ini dışarı aktarır.
Üst üste kayan proje panelleri masaüstü ve mobilde ekran yüksekliğine uyarlanır; sonraki panel yükselirken önceki panel küçülür. Çok küçük ekranlarda ve hareket azaltma tercihinde normal belge akışına döner.
Çapa bağlantıları ve klavye gezinmesi korunur.

Kaynaklar: [Lenis React](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md), [opentype.js](https://github.com/opentypejs/opentype.js).

## İletişim davranışı

Form, proje bilgilerini kullanıcının e-posta uygulamasında taslak olarak açar. Sunucudan e-posta göndermez.
E-posta adresi kopyalanabilir; telefon, WhatsApp, GitHub ve LinkedIn bağlantıları ayrıca bulunur.
Sunucudan doğrudan gönderim istenirse bir e-posta servisinin erişimi ayrıca yapılandırılmalıdır.

## SEO ve yayınlama

Kanonik adres, sitemap ve metadata tek kaynaktan: `lib/site.ts`.
Varsayılan: https://said-bayraktar.vercel.app
Özel alan adı için `NEXT_PUBLIC_SITE_URL` tanımlanıp yeniden derlenir.

Klasör mevcut `said-bayraktar` Vercel projesine bağlıdır. Bu çalışmada canlı dağıtım yapılmamıştır.
Yayınlama kararı verildiğinde:

```bash
npx vercel deploy --prod --yes
```

Sürüm depoları kaynak kod olarak etiketlenmez. Özel proje kodları ve yerel yapılandırma dosyaları siteye kopyalanmaz.


Varsayılan tema koyudur. El yazısı üç ifade arasında değişir ve kullanıcı tarafından duraklatılabilir.

