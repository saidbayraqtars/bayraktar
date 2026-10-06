import type { Localized } from '@/lib/content'

export type ProjectStatus = 'live' | 'field' | 'ready' | 'dev'

export type Project = {
  slug: string
  name: string
  /** 1 = biggest project. The shelves are ordered by this number. */
  rank: number
  kind: Localized
  status: ProjectStatus
  /** One sentence shown in the speech bubble when the cartridge is hovered. */
  pitch: Localized
  summary: Localized
  highlights: Localized[]
  stack: string[]
  /** Public website. Projects without one get a showcase page under /p/<slug>. */
  url?: string
  repo?: string
  /** Real screenshot with demo data, under /public/work. */
  image?: string
  /** Further screens of the same product; scroll scenes switch to them. */
  shots?: string[]
  /** Short facts that float around the window in the featured scroll scenes (ranks 1-4). */
  stats?: Localized[]
  /** Where the scene's pointer clicks, in % of the screenshot (x, y). */
  target?: [number, number]
  /** Built while working at Expert Bilişim; the showcase page says so. */
  employer?: boolean
  /** Cartridge label colour and the text colour that sits on it. */
  color: string
  ink: string
}

export const projects: Project[] = [
  {
    slug: 'b2b-order-system', image: '/work/b2b.png', name: 'B2B Sipariş', rank: 1, status: 'field', color: '#2f5bd3', ink: '#ffffff',
    kind: { tr: 'Web + mobil iş sistemi', en: 'Web + mobile business system' },
    pitch: { tr: 'Bayi portalı, saha satış uygulaması ve ERP köprüsü. 1.200’den fazla otomatik test.', en: 'Dealer portal, field-sales app and ERP bridge. More than 1,200 automated tests.' },
    summary: { tr: 'Toptancılar için bayi portalı, plasiyer mobil uygulaması ve ERP köprüsünden oluşan sipariş sistemi. Sipariş, sevkiyat, tahsilat ve depo stoku aynı yerde; her akış otomatik testlerle korunuyor.', en: 'An ordering system for wholesalers made of a dealer portal, a field-sales mobile app and an ERP bridge. Orders, shipments, collections and warehouse stock live in one place, and every flow is covered by automated tests.' },
    highlights: [
      { tr: 'Bayi, saha ve yönetim için ayrı çalışma alanları', en: 'Separate workspaces for dealers, field sales and management' },
      { tr: 'Çoklu birim, depo bazlı stok ve fiyat geçmişi', en: 'Multiple units, per-warehouse stock and price history' },
      { tr: 'Kullanıcının kendi kurduğu raporlar ve rol tabanlı yetkiler', en: 'User-built reports and role-based permissions' },
    ],
    stack: ['Next.js', 'TypeScript', 'Expo', 'PostgreSQL', 'Prisma', 'Electron'],
    stats: [
      { tr: '1.200+ otomatik test', en: '1,200+ automated tests' },
      { tr: '3 uygulama, tek veri', en: '3 apps, one database' },
      { tr: 'ERP köprüsü', en: 'ERP bridge' },
    ],
    target: [30, 56],
    repo: 'https://github.com/saidbayraqtars/b2b-order-system',
  },
  {
    slug: 'okka', image: '/work/okka-fatura.jpg', shots: ['/work/okka-uretim.jpg'], name: 'Okka ERP', rank: 2, status: 'dev', color: '#146b63', ink: '#ffffff',
    kind: { tr: 'ERP · Geliştirmede', en: 'ERP · In development' },
    pitch: { tr: 'Ön muhasebe, cari, stok, personel ve üretimi tek yerde toplayan yeni nesil ERP.', en: 'A new ERP bringing accounting, accounts, stock, staff and production together.' },
    summary: { tr: 'Ön muhasebe, cari, stok, personel, gider ve üretim modüllerini sıfırdan TypeScript ile kurduğum ERP. Belge onayı stok defterine yazıyor; her modül kendi tasarım sistemi bileşenleri ve uçtan uca testleriyle geliyor.', en: 'An ERP I am building from scratch in TypeScript, covering accounting, accounts, stock, staff, expenses and production. Approved documents post to the stock ledger, and every module ships with design-system components and end-to-end tests.' },
    highlights: [
      { tr: 'Stok ve cari defteri, belge onay akışı', en: 'Stock and account ledgers with a document approval flow' },
      { tr: 'Toplu faturalama, bağlı iade, masraf dağıtımı', en: 'Batch invoicing, linked returns and cost allocation' },
      { tr: 'Storybook tasarım sistemi ve Playwright testleri', en: 'A Storybook design system and Playwright tests' },
    ],
    stack: ['TypeScript', 'React', 'SQL Server', 'Storybook', 'Playwright'],
    stats: [
      { tr: '6 modül', en: '6 modules' },
      { tr: 'Storybook tasarım sistemi', en: 'Storybook design system' },
      { tr: 'Uçtan uca testler', en: 'End-to-end tests' },
    ],
    target: [10, 46],
  },
  {
    slug: 'vega-whatsapp', image: '/work/vega-whatsapp.jpg', shots: ['/work/vega-whatsapp-2.jpg'], name: 'Vega WhatsApp', rank: 3, status: 'field', color: '#1f9d55', ink: '#ffffff', employer: true,
    kind: { tr: 'Masaüstü · Tahsilat otomasyonu', en: 'Desktop · Collections automation' },
    pitch: { tr: 'ERP carilerine WhatsApp’tan bakiye hatırlatma, ekstre ve belge gönderiyor.', en: 'Sends balance reminders, statements and documents to ERP accounts over WhatsApp.' },
    summary: { tr: 'Vega ERP carilerine WhatsApp üzerinden bakiye hatırlatma, ekstre, belge bildirimi, çek/senet vadesi ve e-fatura PDF’i gönderen masaüstü ürün. Yapay zekâ ile otomatik yanıt, çoklu hesap ve resmî Meta Cloud API modu var.', en: 'A desktop product that sends balance reminders, statements, document notices, cheque due dates and e-invoice PDFs to Vega ERP accounts over WhatsApp. It has AI auto-replies, multiple accounts and an official Meta Cloud API mode.' },
    highlights: [
      { tr: 'Toplu ve zamanlanmış gönderim', en: 'Bulk and scheduled sending' },
      { tr: 'Yapay zekâ ile otomatik yanıt ve kontör sistemi', en: 'AI auto-replies with a credit system' },
      { tr: 'Otomatik güncellenen kurulum paketi', en: 'An installer that updates itself' },
    ],
    stack: ['Node.js', 'Express', 'SQL Server', 'Baileys', 'Meta Cloud API'],
    stats: [
      { tr: 'Sahada 12 makinede', en: 'Running on 12 machines' },
      { tr: 'Resmî Meta Cloud API', en: 'Official Meta Cloud API' },
      { tr: 'Yapay zekâ ile yanıt', en: 'AI auto-replies' },
    ],
    target: [21, 24],
  },
  {
    slug: 'neva-qr', image: '/work/neva.png', name: 'Neva QR', rank: 4, status: 'live', color: '#2b2440', ink: '#f3cf6b', url: 'https://nevaqr.com',
    kind: { tr: 'SaaS · Dijital menü', en: 'SaaS · Digital menus' },
    pitch: { tr: 'Restoranlar için 40’tan fazla tasarımlı QR menü platformu. Canlıda.', en: 'A QR menu platform for restaurants with more than 40 designs. Live.' },
    summary: { tr: 'Restoranın kimliğini masaya taşıyan QR menü platformu.', en: 'A QR menu platform that brings a restaurant’s identity to the table.' },
    highlights: [
      { tr: 'Her restorana kendi renkleri ve tasarımı', en: 'Each restaurant gets its own colours and design' },
      { tr: 'Masadaki QR ile anında açılan menü', en: 'A menu that opens from the QR code on the table' },
      { tr: 'Ürün ve fiyatlar panelden güncelleniyor', en: 'Products and prices are updated from the panel' },
    ],
    stack: ['Laravel', 'PHP', 'Alpine.js', 'SQLite', 'Cloudflare'],
    shots: ['/work/neva-menu.png'],
    stats: [
      { tr: '40+ menü tasarımı', en: '40+ menu designs' },
      { tr: 'Canlıda', en: 'Live' },
      { tr: 'Cloudflare üzerinde', en: 'Runs on Cloudflare' },
    ],
    target: [62, 50],
  },
  {
    slug: 'arcteknik-suite', image: '/work/arcteknik.png', name: 'ArcTeknik ERP', rank: 5, status: 'ready', color: '#e0832b', ink: '#1f1206',
    kind: { tr: 'Masaüstü ERP · Teknik servis', en: 'Desktop ERP · Technical service' },
    pitch: { tr: 'Teknik servis ve perakende için internetsiz çalışan ERP.', en: 'An offline ERP for technical service shops and retail.' },
    summary: { tr: 'Teknik servis ve perakende işletmeleri için tamamen çevrimdışı çalışan ERP. Tek kod tabanından birden fazla uygulama çıkıyor; donanıma bağlı RSA lisansla dağıtılıyor ve diğer masaüstü ürünlerime şablon oldu.', en: 'A fully offline ERP for technical service and retail businesses. One codebase produces several applications, ships with hardware-bound RSA licensing and became the template for my other desktop products.' },
    highlights: [
      { tr: 'Servis kabulü, stok, satış ve cari', en: 'Service intake, stock, sales and accounts' },
      { tr: 'SQL Server ve SQLite sürümleri', en: 'SQL Server and SQLite editions' },
      { tr: 'RSA-2048 lisans ve otomatik güncelleme', en: 'RSA-2048 licensing and automatic updates' },
    ],
    stack: ['React', 'Electron', 'Express', 'SQL Server', 'SQLite'],
  },
  {
    slug: 'hizli-belge', image: '/work/hizli-belge.jpg', name: 'Hızlı Belge', rank: 6, status: 'field', color: '#f2c94c', ink: '#2a2105', employer: true,
    kind: { tr: 'Masaüstü · Toptan satış', en: 'Desktop · Wholesale' },
    pitch: { tr: 'Sebze-meyve toptancıları için klavyeyle hızlı belge girişi ve kasa takibi.', en: 'Fast keyboard document entry and crate tracking for produce wholesalers.' },
    summary: { tr: 'Sebze ve meyve toptancıları için belge girişi, dara hesabı, kasa depozitosu ve Vega ERP kaydı. Eski bir Access uygulamasının yerini aldı; bilgisayar deneyimi az olan kullanıcı için klavye odaklı tasarlandı.', en: 'Document entry, tare calculation, crate deposits and Vega ERP records for produce wholesalers. It replaced an old Access application and was designed keyboard-first for users with little computer experience.' },
    highlights: [
      { tr: 'Klavye ile hızlı satır girişi', en: 'Fast keyboard row entry' },
      { tr: 'Otomatik dara, depozito ve kasa iadesi', en: 'Automatic tare, deposits and crate returns' },
      { tr: 'Vega ile bütünleşik belge akışı', en: 'A document flow integrated with Vega' },
    ],
    stack: ['Electron', 'JavaScript', 'SQL Server'],
  },
  {
    slug: 'galya-panel', name: 'Galya Panel', rank: 7, status: 'field', color: '#8e3b46', ink: '#ffffff',
    kind: { tr: 'Masaüstü · Stok ve maliyet', en: 'Desktop · Stock and cost' },
    pitch: { tr: 'İki ERP’nin stok, sayım ve maliyet verisini tek ekranda topluyor.', en: 'Brings stock, count and cost data from two ERPs onto one screen.' },
    summary: { tr: 'VegaWin ve Vega Şefim verilerini salt okunur birleştiren stok, maliyet, sayım ve e-fatura takip uygulaması. Dikkat isteyen kayıtlar tek panelde; ara sayım, reçete ve günlük satış raporları ayrı çalışma alanlarında.', en: 'A stock, cost, count and e-invoice monitor that reads VegaWin and Vega Şefim data without writing to it. Records that need attention sit in one panel, with separate workspaces for counts, recipes and daily sales reports.' },
    highlights: [
      { tr: 'İki ERP’den ortak görünüm', en: 'One view across two ERPs' },
      { tr: 'Stok ve sayım farkı takibi', en: 'Stock and count difference tracking' },
      { tr: 'Günlük satış ve maliyet raporları', en: 'Daily sales and cost reports' },
    ],
    stack: ['Electron', 'Node.js', 'SQL Server'],
  },
  {
    slug: 'vega-ticket', name: 'Vega Ticket', rank: 8, status: 'field', color: '#3a6ea5', ink: '#ffffff', employer: true,
    kind: { tr: 'Masaüstü · Destek operasyonu', en: 'Desktop · Support operations' },
    pitch: { tr: 'Müşteri işlemleri, sözleşme süreleri ve servis kayıtları tek yerde.', en: 'Customer work, contract periods and service records in one place.' },
    summary: { tr: 'Destek ekibinin müşteriye yaptığı işlemleri, söylenen ücretleri ve sözleşme sürelerini ortak tuttuğu masaüstü uygulama. Vega müşteri verisini okuyor, kendi kayıtlarını ayrı veritabanında tutuyor; merkezi WhatsApp kuyruğu ve A5 servis fişi var.', en: 'A desktop application where the support team shares customer work records, quoted fees and contract periods. It reads Vega customer data, keeps its own records in a separate database, and has a central WhatsApp queue and A5 service slips.' },
    highlights: [
      { tr: 'Ortak müşteri ve işlem geçmişi', en: 'Shared customer and work history' },
      { tr: 'Merkezi WhatsApp bildirimleri', en: 'Central WhatsApp notifications' },
      { tr: 'Servis kabulü ve etiket baskısı', en: 'Service intake and label printing' },
    ],
    stack: ['React', 'Electron', 'Express', 'SQL Server', 'Baileys'],
    repo: 'https://github.com/saidbayraqtars/vega-ticket-sistem-releases',
  },
  {
    slug: 'seawatch', name: 'SeaWatch', rank: 9, status: 'ready', color: '#0e4f6e', ink: '#dff6ff',
    kind: { tr: 'SaaS · Denizcilik', en: 'SaaS · Maritime' },
    pitch: { tr: 'Gemi konumlarını bölgeye göre süzüp haritaya canlı aktaran takip sistemi.', en: 'Filters vessel positions by region and streams them to a live map.' },
    summary: { tr: 'AIS gemi konumlarını PostgreSQL/PostGIS’te bölgeye göre süzüp web ve mobil haritaya SSE ile gerçek zamanlı aktaran takip sistemi. Veri sağlayıcısı değiştirilebilir, abonelik bölge bazlı.', en: 'A tracking system that filters AIS vessel positions by region in PostgreSQL/PostGIS and streams them to web and mobile maps over SSE. Data providers are interchangeable and subscriptions are per region.' },
    highlights: [
      { tr: 'Gerçek zamanlı gemi konum akışı', en: 'Real-time vessel position stream' },
      { tr: 'Coğrafi bölge süzgeçleri', en: 'Geographic region filters' },
      { tr: 'Web ve mobil istemci', en: 'Web and mobile clients' },
    ],
    stack: ['React', 'Node.js', 'PostGIS', 'SSE', 'Expo'],
  },
  {
    slug: 'yavuz-grup', image: '/work/yavuz.jpg', name: 'Yavuz Grup', rank: 10, status: 'live', color: '#b9a48a', ink: '#2a2118', url: 'https://yavuzgrupinsaat.com.tr',
    kind: { tr: 'Kurumsal web · Yapı', en: 'Company website · Construction' },
    pitch: { tr: 'Seramik ve yapı malzemeleri firması için vitrin sitesi ve yönetim paneli.', en: 'A showcase site and admin panel for a ceramics and building supplies company.' },
    summary: { tr: 'Seramik ve yapı malzemeleri firmasının vitrin sitesi.', en: 'Showcase site for a ceramics and building supplies company.' },
    highlights: [], stack: ['HTML', 'Cloudflare R2', 'Workers'],
  },
  {
    slug: 'gunluk-kasa', name: 'Günlük Kasa', rank: 11, status: 'field', color: '#5c7a3a', ink: '#ffffff', employer: true,
    kind: { tr: 'Masaüstü · Kasa yönetimi', en: 'Desktop · Cash management' },
    pitch: { tr: 'Günün kasasını ERP’den çıkarıyor, gün sonunda kapatıp imzalı rapor basıyor.', en: 'Builds the day’s cash summary from the ERP, then closes it with a signed report.' },
    summary: { tr: 'Vega veritabanından tek günün kasa özetini çıkaran masaüstü uygulama: devreden, giriş, çıkış, güncel bakiye ve yürüyen bakiyeli hareketler. Masraf, avans, satış faturası ve havale ekrandan Vega’ya yazılıyor; gün sonunda kasa sayılıp kapatılıyor.', en: 'A desktop application that builds a single day’s cash summary from the Vega database: carried over, in, out, current balance and a running ledger. Expenses, advances, sales invoices and transfers are written to Vega from the screen, and the till is counted and closed at the end of the day.' },
    highlights: [
      { tr: 'Gün sonu kasa kapanışı ve imzalı rapor', en: 'End-of-day close with a signed report' },
      { tr: 'Beş belge türü doğrudan Vega’ya', en: 'Five document types written straight to Vega' },
      { tr: 'Otomatik güncelleme', en: 'Automatic updates' },
    ],
    stack: ['React', 'Electron', 'Express', 'SQL Server'],
  },
  {
    slug: 'expert-bilisim', image: '/work/expert.jpg', name: 'Expert Bilişim', rank: 12, status: 'live', color: '#d23c3c', ink: '#ffffff', url: 'https://www.expertbilisim.com.tr',
    kind: { tr: 'Kurumsal web · Yazılım', en: 'Company website · Software' },
    pitch: { tr: 'Vega Yazılım Samsun Bölge Temsilciliği’nin kurumsal sitesi.', en: 'The company website of Vega Yazılım’s Samsun regional office.' },
    summary: { tr: 'Vega Yazılım Samsun Bölge Temsilciliği’nin kurumsal sitesi.', en: 'Company website of Vega Yazılım’s Samsun regional office.' },
    highlights: [], stack: ['React', 'Vite'],
  },
  {
    slug: 'arcteknik-sef', image: '/work/sef.png', name: 'ArcTeknik Şef', rank: 13, status: 'ready', color: '#6b3fa0', ink: '#ffffff',
    kind: { tr: 'Masaüstü · Restoran', en: 'Desktop · Restaurants' },
    pitch: { tr: 'Restoran ve kafeler için kasa, mutfak, garson ve self-servis ekranları.', en: 'Till, kitchen, waiter and self-service screens for restaurants and cafés.' },
    summary: { tr: 'Restoran ve kafeler için kasa, mutfak ekranı, garson tableti, self-servis ve sipariş çağrı ekranından oluşan otomasyon. Garsonlar telefondan QR ile bağlanıyor; her şey yerel ağda çalışıyor.', en: 'Automation for restaurants and cafés made of a till, kitchen display, waiter tablets, self-service and an order call screen. Waiters connect from their phones with a QR code, and everything runs on the local network.' },
    highlights: [
      { tr: 'Mutfak ve çağrı ekranları', en: 'Kitchen and call screens' },
      { tr: 'Telefondan QR ile garson girişi', en: 'Waiter sign-in from a phone with a QR code' },
      { tr: 'İnternetsiz, yerel ağda çalışma', en: 'Runs offline on the local network' },
    ],
    stack: ['Electron', 'Express', 'SQL Server'],
  },
  {
    slug: 'vega-panel', name: 'Vega Panel', rank: 14, status: 'live', color: '#24364b', ink: '#cfe3ff', employer: true,
    kind: { tr: 'Bulut · Lisans ve kontör', en: 'Cloud · Licences and credits' },
    pitch: { tr: 'Vega ürünlerinin lisanslarını ve yapay zekâ kontörlerini buluttan yönetiyor.', en: 'Manages licences and AI credits for Vega products from the cloud.' },
    summary: { tr: 'Vega masaüstü ürünlerinin lisanslarını üreten ve yapay zekâ kontörlerini yöneten bulut paneli. Kontör sunucusu, Vega WhatsApp’ın yapay zekâ çağrılarını karşılayıp müşteri başına kontör düşüyor; kimlik RSA imzalı lisansla doğrulanıyor.', en: 'A cloud panel that issues licences for Vega desktop products and manages AI credits. Its credit server answers Vega WhatsApp’s AI calls and deducts credits per customer, with identity verified by an RSA-signed licence.' },
    highlights: [
      { tr: 'Bulutta lisans üretimi', en: 'Licence issuing in the cloud' },
      { tr: 'Müşteri başına yapay zekâ kontörü', en: 'Per-customer AI credits' },
      { tr: 'Çok müşterili WhatsApp webhook', en: 'A multi-tenant WhatsApp webhook' },
    ],
    stack: ['Cloudflare Workers', 'D1', 'TypeScript'],
  },
  {
    slug: 'omay-metal', image: '/work/omay.jpg', name: 'Ömay Metal', rank: 15, status: 'live', color: '#4a5560', ink: '#ffffff', url: 'https://omaymetalcit.com.tr',
    kind: { tr: 'Kurumsal web · Çit sistemleri', en: 'Company website · Fencing' },
    pitch: { tr: 'Çit sistemleri firması için ürün sayfaları, keşif formu ve yönetim paneli.', en: 'Product pages, a site-visit form and an admin panel for a fencing company.' },
    summary: { tr: 'Çit sistemleri firmasının kurumsal sitesi.', en: 'Company website for a fencing company.' },
    highlights: [], stack: ['Next.js', 'Tailwind', 'Cloudflare'],
  },
  {
    slug: 'teknoklinik-toner', image: '/work/teknoklinik.jpg', name: 'TeknoKlinik', rank: 16, status: 'live', color: '#00897b', ink: '#ffffff', url: 'https://samsuntonerdolum.com.tr',
    kind: { tr: 'Web · Toner dolum', en: 'Website · Toner refills' },
    pitch: { tr: 'Samsun’da toner dolum hizmeti için arama odaklı site.', en: 'A search-focused site for a toner refill service in Samsun.' },
    summary: { tr: 'Toner dolum hizmeti için SEO odaklı site.', en: 'SEO-focused site for a toner refill service.' },
    highlights: [], stack: ['React', 'Vercel'],
  },
  {
    slug: 'nakliyat-55', image: '/work/nakliyat.jpg', name: 'Nakliyat 55', rank: 17, status: 'live', color: '#ef6c00', ink: '#1f0e00', url: 'https://nakliyat55.com.tr',
    kind: { tr: 'Web · Nakliyat', en: 'Website · Removals' },
    pitch: { tr: 'Nakliyat firması için reklam açılış sayfası ve yerel arama sitesi.', en: 'An ad landing page and local search site for a removals company.' },
    summary: { tr: 'Nakliyat firması için açılış sayfası.', en: 'Landing page for a removals company.' },
    highlights: [], stack: ['HTML', 'Node.js'],
  },
  {
    slug: 'damrenur-gunel', image: '/work/damrenur.jpg', name: 'Damrenur Günel', rank: 18, status: 'live', color: '#b5838d', ink: '#2b1418', url: 'https://damrenurgunel.vercel.app',
    kind: { tr: 'Web · Sağlık', en: 'Website · Healthcare' },
    pitch: { tr: 'Klinik psikolog için hizmetleri anlatan, iletişimi kolaylaştıran site.', en: 'A site for a clinical psychologist that explains services and makes contact easy.' },
    summary: { tr: 'Klinik psikolog için kurumsal site.', en: 'Website for a clinical psychologist.' },
    highlights: [], stack: ['Next.js', 'TypeScript'],
  },
  {
    slug: 'reklam-otomasyon', name: 'Reklam Paneli', rank: 19, status: 'dev', color: '#e5487b', ink: '#ffffff',
    kind: { tr: 'SaaS · Reklam yönetimi', en: 'SaaS · Ad management' },
    pitch: { tr: 'Google Ads ve Meta reklamlarını tek panelden, yapay zekâ desteğiyle yönetiyor.', en: 'Manages Google Ads and Meta campaigns from one panel, with AI help.' },
    summary: { tr: 'Google Ads ve Meta reklamlarını tek panelden yöneten, yapay zekâ destekli optimizasyon öneren ve Reels için otomatik video kreatifi üreten panel. Reklam API onayları bekleniyor.', en: 'A panel that manages Google Ads and Meta campaigns in one place, suggests AI-assisted optimisations and generates video creatives for Reels. Ad API approvals are pending.' },
    highlights: [
      { tr: 'İki reklam ağı, tek panel', en: 'Two ad networks, one panel' },
      { tr: 'Yapay zekâ ile bütçe ve hedefleme önerisi', en: 'AI budget and targeting suggestions' },
      { tr: 'Otomatik video kreatif üretimi', en: 'Automatic video creative generation' },
    ],
    stack: ['Next.js', 'NestJS', 'TypeScript'],
  },
].sort((a, b) => a.rank - b.rank) as Project[]

export function projectHref(project: Project) {
  return project.url ?? `/p/${project.slug}`
}

export function displayHost(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

export const showcaseProjects = projects.filter((project) => !project.url)
