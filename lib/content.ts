export type Lang = 'tr' | 'en'

export const profile = {
    name: 'Said Bayraktar',
    email: 'saidbayraktar9@gmail.com',
    phone: '+90 535 078 61 01',
    location: 'Samsun, Türkiye',
    github: 'https://github.com/saidbayraqtars',
    githubUser: 'saidbayraqtars',
    linkedin: 'https://linkedin.com/in/said-bayraktar9',
}

export const stats = [
    { value: '1000+', tr: 'otomatik test', en: 'automated tests' },
    { value: '200+', tr: 'desteklenen kurumsal cihaz', en: 'corporate devices supported' },
    { value: '20+', tr: 'yayınlanmış proje', en: 'shipped projects' },
    { value: '3', tr: 'platform: web, mobil, masaüstü', en: 'platforms: web, mobile, desktop' },
]

export const skillGroups = [
    {
        tr: 'Diller',
        en: 'Languages',
        items: ['JavaScript', 'TypeScript', 'SQL', 'C#', 'Python'],
    },
    {
        tr: 'Frontend',
        en: 'Frontend',
        items: ['React', 'Next.js', 'React Native (Expo)', 'TailwindCSS', 'Astro'],
    },
    {
        tr: 'Backend & API',
        en: 'Backend & API',
        items: ['Node.js', 'Express', 'REST API', 'SSE', 'Auth.js / RBAC'],
    },
    {
        tr: 'Veritabanı',
        en: 'Databases',
        items: ['PostgreSQL', 'PostGIS', 'Microsoft SQL Server', 'Prisma ORM', 'SQLite'],
    },
    {
        tr: 'Masaüstü & Dağıtım',
        en: 'Desktop & Delivery',
        items: ['Electron', 'NSIS + auto-update', 'RSA-2048 lisanslama', 'Docker', 'Vercel'],
    },
    {
        tr: 'Sistem & Altyapı',
        en: 'Systems & Infrastructure',
        items: ['Windows Server', 'Active Directory', 'DNS / DHCP / GPO', 'Hyper-V', 'PowerShell'],
    },
]

export const experience = [
    {
        company: 'Expert Bilişim (Vega Yazılım)',
        periodTr: '02/2026 – Halen',
        periodEn: '02/2026 – present',
        roleTr: 'Full Stack Developer & IT Destek',
        roleEn: 'Full Stack Developer & IT Support',
        location: 'Samsun, Türkiye',
        current: true,
        bulletsTr: [
            'Toptancılar için bayi portalı, plasiyer mobil uygulaması ve ERP köprüsünden oluşan B2B sipariş sistemini kurdum; sipariş, sevkiyat ve tahsilat akışlarını 1000’in üzerinde otomatik testle yazdım.',
            'Vega ERP’nin SQL Server veritabanına tek satır yazmadan çalışan iş uygulamaları geliştirdim: sözleşme ve ticket takibi, finansal raporlama paneli, stok-maliyet uyarı ekranı.',
            'Masaüstü ürünleri Electron ve NSIS ile paketleyip otomatik güncelleme üzerinden dağıttım; RSA-2048 donanım bağlı lisanslamayı kurdum.',
            'Sıfırdan sunucu kurdum: RAID, Windows Server, Active Directory domain, DNS/DHCP rolleri ve grup politikasıyla yetki yapısı.',
            '200+ kurumsal cihaza uzaktan yazılım ve yerinde donanım desteği verdim; sahadan gelen talepleri ürüne taşıdım.',
        ],
        bulletsEn: [
            'Built a B2B ordering system for wholesalers — dealer portal, field-sales mobile app and ERP bridge — writing the order, shipment and collection flows behind 1000+ automated tests.',
            'Developed business apps on a Vega ERP SQL Server database without writing a single row back to it: contract and ticket tracking, a financial reporting dashboard, a stock and cost alert screen.',
            'Packaged desktop products with Electron and NSIS, shipped them over auto-update, and set up RSA-2048 hardware-bound licensing.',
            'Built servers from scratch: RAID configuration, Windows Server, Active Directory domain, DNS and DHCP roles, and a permission structure through group policy.',
            'Supported 200+ corporate devices with remote software and on-site hardware help, and carried field requests back into the product.',
        ],
        stack: ['Next.js', 'TypeScript', 'Expo', 'PostgreSQL', 'Electron', 'MSSQL'],
    },
    {
        company: 'Turkcell Superonline',
        periodTr: '12/2024 – 10/2025',
        periodEn: '12/2024 – 10/2025',
        roleTr: 'Saha Satış Sorumlusu',
        roleEn: 'Field Sales Representative',
        location: 'Samsun, Türkiye',
        current: false,
        bulletsTr: [
            'Aylık ortalama 30 yeni abonelik satışı gerçekleştirdim; sahada bireysel ve kurumsal müşterilere fiber internet sattım.',
            'Müşteriyle birebir çalışma alışkanlığı kazandım — bugün ürün gereksinimlerini aynı yerden topluyorum.',
        ],
        bulletsEn: [
            'Averaged 30 new subscriptions per month selling fiber internet to individual and corporate customers in the field.',
            'Learned to work directly with customers — the same habit I now use to gather product requirements.',
        ],
        stack: ['B2C', 'B2B', 'CRM'],
    },
]

export const education = [
    {
        schoolTr: 'Osmangazi Üniversitesi',
        schoolEn: 'Osmangazi University',
        degreeTr: 'Bilgisayar Programcılığı (Önlisans)',
        degreeEn: 'Computer Programming (Associate Degree)',
        period: '2023 – 2025',
        noteTr: 'Kaydımı dondurdum; 2024’ten bu yana sektörde tam zamanlı çalışıyorum.',
        noteEn: 'On leave of absence; working full time in the industry since 2024.',
    },
    {
        schoolTr: 'Mesleki ve Teknik Anadolu Lisesi',
        schoolEn: 'Vocational & Technical Anatolian High School',
        degreeTr: 'Tıbbi Cihaz Teknolojileri / Makine Teknisyenliği',
        degreeEn: 'Medical Device Technologies / Machine Technician',
        period: '2018 – 2023',
        noteTr: '',
        noteEn: '',
    },
]

export type Project = {
    slug: string
    titleTr: string
    titleEn: string
    descTr: string
    descEn: string
    stack: string[]
    repo?: string
    live?: string
    featured?: boolean
    kindTr: string
    kindEn: string
}

export const projects: Project[] = [
    {
        slug: 'b2b-order-system',
        titleTr: 'B2B Sipariş & Saha Satış Sistemi',
        titleEn: 'B2B Ordering & Field Sales System',
        descTr:
            'Bayi portalı, plasiyer mobil uygulaması ve ERP köprüsü. Rol tabanlı yetkilendirme, kullanıcının kendi raporunu kurduğu rapor tasarımcısı; sipariş, sevkiyat ve tahsilat akışları 1000+ otomatik testle korunuyor.',
        descEn:
            'Dealer portal, field-sales mobile app and ERP bridge. Role-based permissions and a report designer users build their own reports with; order, shipment and collection flows covered by 1000+ automated tests.',
        stack: ['Turborepo', 'Next.js', 'TypeScript', 'Expo', 'PostgreSQL', 'Prisma', 'Auth.js'],
        repo: 'https://github.com/saidbayraqtars/b2b-order-system',
        featured: true,
        kindTr: 'Monorepo · Web + Mobil',
        kindEn: 'Monorepo · Web + Mobile',
    },
    {
        slug: 'seawatch',
        titleTr: 'SeaWatch — Denizcilik & Liman Takip Sistemi',
        titleEn: 'SeaWatch — Maritime & Port Tracking',
        descTr:
            'Canlı gemi verisini bölge filtresinden geçirip React haritaya gerçek zamanlı ileten takip sistemi. Konum sorguları PostGIS üzerinde, akış SSE ile.',
        descEn:
            'Tracking system that filters live vessel data by region and streams it to a React map in real time. Spatial queries on PostGIS, delivery over SSE.',
        stack: ['Node.js', 'PostgreSQL / PostGIS', 'SSE', 'React'],
        featured: true,
        kindTr: 'Gerçek zamanlı sistem',
        kindEn: 'Real-time system',
    },
    {
        slug: 'vega-ticket',
        titleTr: 'Vega Ticket — Sözleşme & Ticket Takibi',
        titleEn: 'Vega Ticket — Contract & Ticket Tracking',
        descTr:
            '4-5 kişinin eşzamanlı kullandığı, ERP hesaplarının sözleşme ve yenileme tarihlerini takip eden ticket yönetim aracı. NSIS installer ve otomatik güncelleme kanalıyla dağıtılıyor.',
        descEn:
            'Ticket management tool used concurrently by 4-5 people that tracks contract and renewal dates for ERP accounts. Shipped through an NSIS installer and an auto-update channel.',
        stack: ['Electron', 'Node.js', 'Microsoft SQL Server'],
        repo: 'https://github.com/saidbayraqtars/vega-ticket-sistem-releases',
        featured: true,
        kindTr: 'Masaüstü · Üretimde',
        kindEn: 'Desktop · In production',
    },
    {
        slug: 'galya-panel',
        titleTr: 'Galya Panel — Stok & Maliyet İzleme',
        titleEn: 'Galya Panel — Stock & Cost Monitoring',
        descTr:
            'İki ERP veritabanını salt-okunur okuyup stokta olmayan ürünleri, sayım farklarını ve bekleyen e-faturaları tek ekranda gösteren masaüstü araç.',
        descEn:
            'Desktop tool that reads two ERP databases read-only and shows out-of-stock items, stock-count differences and pending e-invoices on one screen.',
        stack: ['Electron', 'Microsoft SQL Server', 'Node.js'],
        repo: 'https://github.com/saidbayraqtars/galya-panel-releases',
        featured: true,
        kindTr: 'Masaüstü · Üretimde',
        kindEn: 'Desktop · In production',
    },
    {
        slug: 'vega-whatsapp',
        titleTr: 'Vega WhatsApp',
        titleEn: 'Vega WhatsApp',
        descTr: 'ERP üzerinden WhatsApp bildirim ve mesaj akışını yöneten masaüstü ürün; otomatik güncelleme kanalıyla dağıtılıyor.',
        descEn: 'Desktop product that drives WhatsApp notification and message flows from the ERP, distributed over an auto-update channel.',
        stack: ['Electron', 'Node.js'],
        repo: 'https://github.com/saidbayraqtars/vega-whatsapp-releases',
        kindTr: 'Masaüstü',
        kindEn: 'Desktop',
    },
    {
        slug: 'arcteknik-suite',
        titleTr: 'ArcTeknik Suite & ERP',
        titleEn: 'ArcTeknik Suite & ERP',
        descTr: 'SQLite tabanlı ERP ve şef modülü; installer + latest.yml ile otomatik güncelleme yayın kanalı.',
        descEn: 'SQLite-based ERP and chef module, with an installer + latest.yml auto-update release channel.',
        stack: ['Electron', 'SQLite', 'Node.js'],
        repo: 'https://github.com/saidbayraqtars/ARCTEKNIK-SUITE-releases',
        kindTr: 'Masaüstü · ERP',
        kindEn: 'Desktop · ERP',
    },
    {
        slug: 'teknoklinik-toner',
        titleTr: 'TeknoKlinik Toner',
        titleEn: 'TeknoKlinik Toner',
        descTr: 'Toner ve sarf malzeme takibi için hazırlanmış web uygulaması.',
        descEn: 'Web app for toner and consumables tracking.',
        stack: ['JavaScript', 'Vercel'],
        repo: 'https://github.com/saidbayraqtars/teknoklinik-toner',
        live: 'https://teknoklinik-toner.vercel.app',
        kindTr: 'Web',
        kindEn: 'Web',
    },
    {
        slug: 'damrenurgunel',
        titleTr: 'Klinik Psikolog Damrenur Günel',
        titleEn: 'Clinical Psychologist Website',
        descTr: 'Kendi alan adında yayında olan kurumsal tanıtım ve randevu sitesi.',
        descEn: 'Corporate presentation and appointment site, live on its own domain.',
        stack: ['TypeScript', 'Next.js'],
        repo: 'https://github.com/saidbayraqtars/damrenurgunel-site',
        live: 'https://www.klinikpsikologdamrenurgunel.com.tr',
        kindTr: 'Web · Müşteri işi',
        kindEn: 'Web · Client work',
    },
    {
        slug: '3d-qr',
        titleTr: '3D QR',
        titleEn: '3D QR',
        descTr: 'QR kodları üç boyutlu, baskıya hazır modellere dönüştüren tarayıcı aracı.',
        descEn: 'Browser tool that turns QR codes into printable three-dimensional models.',
        stack: ['JavaScript', 'Three.js'],
        repo: 'https://github.com/saidbayraqtars/3d-qr',
        live: 'https://3d-qr.vercel.app',
        kindTr: 'Deneysel',
        kindEn: 'Experiment',
    },
    {
        slug: 'mayin-oyunu',
        titleTr: 'Mayın Tarlası',
        titleEn: 'Minesweeper',
        descTr: 'TypeScript ile yazılmış, tarayıcıda çalışan mayın tarlası oyunu.',
        descEn: 'Minesweeper written in TypeScript, running in the browser.',
        stack: ['TypeScript', 'React'],
        repo: 'https://github.com/saidbayraqtars/mayin-oyunu',
        live: 'https://mayin-oyunu.vercel.app',
        kindTr: 'Oyun',
        kindEn: 'Game',
    },
    {
        slug: 'pdf-to-xlsx',
        titleTr: 'PDF → XLSX Dönüştürücü',
        titleEn: 'PDF → XLSX Converter',
        descTr: 'PDF tablolarını Excel’e çeviren Python aracı.',
        descEn: 'Python tool that converts PDF tables into Excel.',
        stack: ['Python'],
        repo: 'https://github.com/saidbayraqtars/pdf-to-xlsx-converter',
        kindTr: 'Araç',
        kindEn: 'Tool',
    },
    {
        slug: 'expertbilisim',
        titleTr: 'Expert Bilişim Kurumsal Site',
        titleEn: 'Expert Bilişim Corporate Site',
        descTr: 'Çalıştığım şirket için hazırladığım kurumsal tanıtım sitesi.',
        descEn: 'Corporate site built for the company I work at.',
        stack: ['JavaScript', 'Vercel'],
        repo: 'https://github.com/saidbayraqtars/expertbilisimv1.0',
        live: 'https://expertbilisimv1-0.vercel.app',
        kindTr: 'Web · Kurumsal',
        kindEn: 'Web · Corporate',
    },
]

export const cvFiles = [
    {
        file: '/cv/Said_Bayraktar_FullStack_Developer_TR.pdf',
        labelTr: 'Full Stack Developer — Türkçe',
        labelEn: 'Full Stack Developer — Turkish',
    },
    {
        file: '/cv/Said_Bayraktar_FullStack_Developer_EN.pdf',
        labelTr: 'Full Stack Developer — İngilizce',
        labelEn: 'Full Stack Developer — English',
    },
    {
        file: '/cv/Said_Bayraktar_IT_Support_Specialist_TR.pdf',
        labelTr: 'IT Destek Uzmanı — Türkçe',
        labelEn: 'IT Support Specialist — Turkish',
    },
    {
        file: '/cv/Said_Bayraktar_IT_Support_Specialist_EN.pdf',
        labelTr: 'IT Destek Uzmanı — İngilizce',
        labelEn: 'IT Support Specialist — English',
    },
]

export const dict = {
    tr: {
        nav: { about: 'Hakkımda', skills: 'Yetenekler', work: 'Deneyim', projects: 'Projeler', contact: 'İletişim' },
        hero: {
            badge: 'Yeni projelere açığım',
            title1: 'Kurarım,',
            title2: 'yayınlarım,',
            title3: 'ayakta tutarım.',
            lead: 'React, Next.js ve Node.js ile web, mobil ve masaüstü uygulamaları geliştiriyorum. Bayi portalı, saha satış uygulaması ve SQL Server ERP’lere bağlanan masaüstü araçlar yazdım — ürünü kurup müşteride çalışır halde de tutuyorum.',
            cta: 'Projelere bak',
            cta2: 'CV indir',
            trusted: 'Kullandığım teknolojiler',
        },
        about: {
            eyebrow: 'Hakkımda',
            title: 'Ekranı da, altındaki sunucuyu da ben kuruyorum.',
            p1: 'Samsun’da Expert Bilişim (Vega Yazılım) bünyesinde full stack geliştirici ve IT destek olarak çalışıyorum. İşin büyük kısmı bir ERP’nin etrafında geçiyor: veriyi bozmadan okuyup üzerine sipariş, sözleşme, stok ve raporlama akışları kurmak.',
            p2: 'Ürünü yazmakla bitmiyor. Electron ve NSIS ile paketleyip otomatik güncelleme kanalına koyuyorum, lisanslamayı kuruyorum, sunucuyu RAID’den Active Directory’ye kadar hazırlıyorum ve 200+ cihazın sorununu kök nedeninde kapatıyorum.',
            p3: 'Sahadan gelen talebi ürüne taşımayı seviyorum — kullanıcıyla aynı odada olmadan iyi yazılım çıkmıyor.',
        },
        skills: {
            eyebrow: 'Yetenekler',
            title: 'Kullandığım araçlar',
            lead: 'Üretimde çalışan ürünlerde kullandığım teknolojiler.',
        },
        work: { eyebrow: 'Deneyim', title: 'Nerede ne yaptım', education: 'Eğitim' },
        projects: {
            eyebrow: 'Projeler',
            title: 'Seçilmiş işler',
            lead: 'Müşteride çalışan ürünler ve kişisel projeler.',
            all: 'Tümü',
            featured: 'Öne çıkanlar',
            code: 'Kod',
            live: 'Canlı',
            githubTitle: 'GitHub’da güncel',
            githubLead: 'Depolar canlı olarak GitHub API’sinden geliyor.',
            viewGithub: 'GitHub profilim',
            updated: 'güncellendi',
        },
        cv: {
            eyebrow: 'CV',
            title: 'Özgeçmişimi indir',
            lead: 'İki farklı role göre hazırlanmış, Türkçe ve İngilizce sürümler.',
            download: 'PDF indir',
        },
        contact: {
            eyebrow: 'İletişim',
            title: 'Bir işi konuşalım',
            lead: 'Yeni projelere ve yurt içi/yurt dışı relokasyona açığım. En hızlı e-posta üzerinden dönüş alırsınız.',
            mail: 'E-posta gönder',
            copy: 'Kopyala',
            copied: 'Kopyalandı',
        },
        footer: { rights: 'Tüm hakları saklıdır.', built: 'Next.js, Tailwind ve motion ile yazıldı.' },
        lang: 'EN',
    },
    en: {
        nav: { about: 'About', skills: 'Skills', work: 'Experience', projects: 'Projects', contact: 'Contact' },
        hero: {
            badge: 'Available for new work',
            title1: 'I build it,',
            title2: 'ship it,',
            title3: 'and keep it running.',
            lead: 'I build web, mobile and desktop applications with React, Next.js and Node.js. I have written a dealer portal, a field-sales app and desktop tools that plug into SQL Server ERPs — and I deploy what I build and keep it running at the customer site.',
            cta: 'See projects',
            cta2: 'Download CV',
            trusted: 'Technologies I work with',
        },
        about: {
            eyebrow: 'About',
            title: 'I build the screen and the server underneath it.',
            p1: 'I work in Samsun at Expert Bilişim (Vega Yazılım) as a full stack developer and IT support engineer. Most of the work orbits an ERP: reading its data without corrupting it, and building order, contract, stock and reporting flows on top.',
            p2: 'Writing the product is not the end of it. I package it with Electron and NSIS, put it on an auto-update channel, set up licensing, prepare the server from RAID to Active Directory, and close faults on 200+ devices at the root cause.',
            p3: 'I like carrying field requests back into the product — good software does not come out of a room the user is not in.',
        },
        skills: {
            eyebrow: 'Skills',
            title: 'The tools I use',
            lead: 'Technologies behind products that run in production.',
        },
        work: { eyebrow: 'Experience', title: 'Where I have worked', education: 'Education' },
        projects: {
            eyebrow: 'Projects',
            title: 'Selected work',
            lead: 'Products running at customers, plus personal projects.',
            all: 'All',
            featured: 'Featured',
            code: 'Code',
            live: 'Live',
            githubTitle: 'Fresh from GitHub',
            githubLead: 'Repositories pulled live from the GitHub API.',
            viewGithub: 'My GitHub profile',
            updated: 'updated',
        },
        cv: {
            eyebrow: 'CV',
            title: 'Download my resume',
            lead: 'Two role-specific versions, in Turkish and English.',
            download: 'Download PDF',
        },
        contact: {
            eyebrow: 'Contact',
            title: 'Let us talk about a project',
            lead: 'Open to new work and to relocation, in Türkiye or abroad. Email gets the fastest reply.',
            mail: 'Send an email',
            copy: 'Copy',
            copied: 'Copied',
        },
        footer: { rights: 'All rights reserved.', built: 'Built with Next.js, Tailwind and motion.' },
        lang: 'TR',
    },
} as const

export type Dict = (typeof dict)['tr']

// Portfolio redesign: all public copy remains in this single bilingual source.
export type Localized = { tr: string; en: string }
export type Category = 'web' | 'business' | 'desktop' | 'tools'
export type CaseStudy = {
    slug: string
    name: string
    category: Category
    type: Localized
    headline: Localized
    description: Localized
    challenge: Localized
    solution: Localized
    outcomes: Localized[]
    stack: string[]
    image?: string
    theme: 'neva' | 'b2b' | 'vega' | 'sea'
    repo?: string
    repoType?: 'source' | 'releases'
    live?: string
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'neva-qr', name: 'Neva QR', category: 'web', theme: 'neva',
        type: { tr: 'SaaS · Dijital menü', en: 'SaaS · Digital menus' },
        headline: { tr: 'Bir menüden çok daha fazlası.', en: 'More than a menu.' },
        description: { tr: 'Restoranın kimliğini masaya taşıyan QR menü platformu. 40 özgün tasarım, işletmeye özel alt alan adı ve tek panelden yönetim.', en: 'A QR menu platform that brings a restaurant’s identity to the table. 40 distinct designs, dedicated subdomains and a single management panel.' },
        challenge: { tr: 'Restoranların basılı menü maliyetini azaltırken fiyatlarını, ürünlerini ve marka kimliklerini kendilerinin yönetebilmesi gerekiyordu.', en: 'Restaurants needed to update products, prices and their brand identity themselves, without reprinting menus.' },
        solution: { tr: 'Laravel ve Alpine.js ile çok işletmeli bir platform geliştirdim. Menü düzenleme, tema önizleme, QR üretimi, PDF çıktısı ve işletmeye özel alt alan adında yayınlama aynı akışta birleşiyor.', en: 'I built a multi-tenant platform with Laravel and Alpine.js, connecting menu editing, theme previews, QR generation, PDF export and publication on a dedicated subdomain.' },
        outcomes: [{ tr: '40 farklı menü tasarımı', en: '40 distinct menu designs' }, { tr: 'İşletmeye özel alt alan adı', en: 'A dedicated subdomain per restaurant' }, { tr: 'Masa bazlı QR ve ziyaret analitiği', en: 'Table-specific QR codes and visit analytics' }],
        stack: ['Laravel', 'PHP', 'Alpine.js', 'Tailwind CSS', 'SQLite', 'Cloudflare'], image: '/projects/neva-desktop.png', live: 'https://nevaqr.com',
    },
    {
        slug: 'b2b-order-system', name: 'B2B Sipariş', category: 'business', theme: 'b2b',
        type: { tr: 'İş yazılımı · Web & mobil', en: 'Business software · Web & mobile' },
        headline: { tr: 'Sahadan depoya, tek sistem.', en: 'From the field to the warehouse.' },
        description: { tr: 'Bayi portalı, mobil saha satış uygulaması ve ERP köprüsü. Sipariş, tahsilat ve sevkiyatın aynı dili konuştuğu bir iş sistemi.', en: 'A dealer portal, mobile field-sales app and ERP bridge. One connected system for orders, collections and dispatch.' },
        challenge: { tr: 'Toptancı, bayi ve saha ekibinin sipariş, stok ve tahsilat bilgisini farklı araçlardan takip etmesi iş akışını bölüyordu.', en: 'Wholesalers, dealers and sales representatives were tracking orders, stock and collections across separate tools.' },
        solution: { tr: 'Next.js bayi portalı ve Expo mobil uygulamasını bir monorepo içinde geliştirdim. Rol tabanlı yetkiler, rapor tasarımcısı ve Vega ERP köprüsüyle operasyonun farklı taraflarını aynı sisteme bağladım.', en: 'I built a Next.js dealer portal and Expo mobile app in a monorepo. Role-based permissions, a report designer and a Vega ERP bridge connect the different parts of the operation.' },
        outcomes: [{ tr: 'Bayi, saha ve yönetim için ayrı çalışma alanları', en: 'Dedicated dealer, field-sales and management workspaces' }, { tr: 'Siparişten tahsilata bütünleşik akış', en: 'A connected flow from order to collection' }, { tr: 'Özelleştirilebilir raporlar ve yetkilendirme', en: 'Custom reports and granular permissions' }],
        stack: ['Next.js', 'TypeScript', 'React Native', 'PostgreSQL', 'Prisma', 'Turborepo'], image: '/projects/b2b-dashboard.png', repo: 'https://github.com/saidbayraqtars/b2b-order-system', repoType: 'source',
    },
    {
        slug: 'vega-ticket', name: 'Vega Ticket', category: 'desktop', theme: 'vega',
        type: { tr: 'Masaüstü · ERP entegrasyonu', en: 'Desktop · ERP integration' },
        headline: { tr: 'Destek operasyonu, tek yerde.', en: 'Support operations, connected.' },
        description: { tr: 'Müşteri işlemleri, sözleşme süreleri ve servis kayıtları. Vega ERP verisiyle çalışan, ortak WhatsApp bildirim kuyruğuna sahip masaüstü uygulaması.', en: 'Customer operations, contract periods and service records. A desktop application connected to Vega ERP with a shared WhatsApp notification queue.' },
        challenge: { tr: 'Müşteriye yapılan işlemlerin, söylenen ücretlerin ve sözleşme sürelerinin ekip içinde ortak ve kolay erişilebilir bir yerde tutulması gerekiyordu.', en: 'The team needed one accessible place for customer work records, quoted fees and contract periods.' },
        solution: { tr: 'Electron uygulamasında Vega müşteri verisini salt okunur kullanıp işlem kayıtlarını ayrı veritabanında tuttum. Merkezi WhatsApp kuyruğu, servis kabulü ve etiket baskısını iş akışına ekledim.', en: 'I built an Electron application that reads Vega customer data and stores its own operations separately. A central WhatsApp queue, service intake and label printing support the workflow.' },
        outcomes: [{ tr: 'Ortak müşteri ve işlem geçmişi', en: 'Shared customer and operation history' }, { tr: 'Merkezi WhatsApp bildirimleri', en: 'Centralized WhatsApp notifications' }, { tr: 'Kurulum paketi ve otomatik güncelleme', en: 'Installer and automatic updates' }],
        stack: ['Electron', 'Node.js', 'SQL Server', 'WhatsApp', 'NSIS'], repo: 'https://github.com/saidbayraqtars/vega-ticket-sistem-releases', repoType: 'releases',
    },
    {
        slug: 'seawatch', name: 'SeaWatch', category: 'business', theme: 'sea',
        type: { tr: 'Gerçek zamanlı · Denizcilik', en: 'Real-time · Maritime' },
        headline: { tr: 'Denizdeki hareketi görünür kılmak.', en: 'Making maritime movement visible.' },
        description: { tr: 'AIS gemi konumlarını haritaya taşıyan web ve mobil takip sistemi. Bölge filtreleri, gemi detayları ve gerçek zamanlı veri akışı.', en: 'Web and mobile tracking that puts AIS vessel positions on a map, with regional filters, vessel details and real-time streaming.' },
        challenge: { tr: 'Farklı kaynaklardan gelen gemi verisinin coğrafi bölgelere göre filtrelenip kullanıcıya güncel bir harita deneyimi olarak sunulması gerekiyordu.', en: 'Vessel data from different providers needed regional filtering and a continuously updated map experience.' },
        solution: { tr: 'Değiştirilebilir AIS sağlayıcıları, PostgreSQL/PostGIS sorguları ve SSE yayınıyla veri hattını kurdum. React haritası ve mobil istemciyi bu akışa bağladım.', en: 'I connected interchangeable AIS providers, PostgreSQL/PostGIS queries and an SSE stream to a React map and mobile client.' },
        outcomes: [{ tr: 'Gerçek zamanlı gemi konum akışı', en: 'Real-time vessel position streaming' }, { tr: 'Coğrafi bölge filtreleri', en: 'Geographic region filters' }, { tr: 'Web ve mobil erişim', en: 'Web and mobile access' }],
        stack: ['React', 'Node.js', 'PostGIS', 'SSE', 'Expo'],
    },
    {
        slug: 'galya-panel', name: 'Galya Panel', category: 'desktop', theme: 'vega',
        type: { tr: 'Masaüstü · Stok & maliyet', en: 'Desktop · Stock & cost' },
        headline: { tr: 'Dikkat isteyen işler, tek ekranda.', en: 'See what needs attention.' },
        description: { tr: 'VegaWin ve Vega Şefim verilerini birleştiren stok, maliyet, sayım ve e-fatura takip uygulaması.', en: 'Stock, cost, inventory-count and e-invoice monitoring across VegaWin and Vega Şefim.' },
        challenge: { tr: 'Stok eksikleri, sayım farkları ve bekleyen e-faturalar farklı ERP ekranları arasında kayboluyordu.', en: 'Stock shortages, count discrepancies and pending invoices were spread across different ERP screens.' },
        solution: { tr: 'İki ERP veritabanını okuyup dikkat gerektiren kayıtları tek panelde topladım. Ara sayım, reçete takibi ve günlük satış raporları için ayrı çalışma alanları oluşturdum.', en: 'I combined records from two ERP databases in one monitoring panel, with workspaces for stock counts, recipes and daily sales reports.' },
        outcomes: [{ tr: 'İki ERP’den ortak görünüm', en: 'A shared view of two ERPs' }, { tr: 'Stok ve sayım farklarının takibi', en: 'Stock and inventory discrepancy tracking' }, { tr: 'Günlük satış ve maliyet raporları', en: 'Daily sales and cost reports' }],
        stack: ['Electron', 'Node.js', 'SQL Server'], repo: 'https://github.com/saidbayraqtars/galya-panel-releases', repoType: 'releases',
    },
    {
        slug: 'hizli-belge', name: 'Hızlı Belge Doldurucu', category: 'desktop', theme: 'b2b',
        type: { tr: 'Otomasyon · Toptan satış', en: 'Automation · Wholesale' },
        headline: { tr: 'Günlük evrak işine daha az zaman.', en: 'Less time on daily paperwork.' },
        description: { tr: 'Sebze ve meyve toptancıları için belge girişi, dara hesabı, kasa depozitosu ve Vega ERP kaydı.', en: 'Document entry, tare calculation, crate deposits and Vega ERP records for produce wholesalers.' },
        challenge: { tr: 'Eski Access uygulamasının yerine, bilgisayar deneyimi az olan kullanıcının hızlı belge girebileceği basit bir araç gerekiyordu.', en: 'An old Access application needed replacing with a simple tool for users with limited computer experience.' },
        solution: { tr: 'Klavye odaklı belge girişini otomatik dara ve tutar hesabıyla birleştirdim. Satış, tahsilat ve kasa depozitosu kayıtlarını Vega iş akışına bağladım.', en: 'I paired keyboard-first document entry with automatic tare and total calculations, connecting sales, collections and crate deposits to Vega.' },
        outcomes: [{ tr: 'Klavye ile hızlı satır girişi', en: 'Fast keyboard-based entry' }, { tr: 'Otomatik dara ve depozito hesabı', en: 'Automatic tare and deposit calculations' }, { tr: 'Vega ile bütünleşik belge akışı', en: 'An integrated Vega document flow' }],
        stack: ['Electron', 'JavaScript', 'SQL Server'], repo: 'https://github.com/saidbayraqtars/hizli-belge-doldurucu-releases', repoType: 'releases',
    },
    {
        slug: 'damrenur-gunel', name: 'Damrenur Günel', category: 'web', theme: 'neva',
        type: { tr: 'Kurumsal web · Sağlık', en: 'Business website · Healthcare' },
        headline: { tr: 'Güven veren bir dijital ilk izlenim.', en: 'A reassuring first impression.' },
        description: { tr: 'Klinik psikolog için hizmetlerini ve uzmanlığını anlatan, iletişime geçmeyi kolaylaştıran kurumsal web sitesi.', en: 'A website presenting a clinical psychologist’s services and expertise with clear ways to get in touch.' },
        challenge: { tr: 'Uzmanlık alanlarını anlaşılır şekilde aktaran ve danışanların kolayca iletişim kurabildiği bir dijital varlık gerekiyordu.', en: 'The practice needed a clear online presence that explained its specialties and made contact straightforward.' },
        solution: { tr: 'Mobil uyumlu hizmet sayfaları, okunabilir içerik yapısı ve doğrudan iletişim bağlantılarıyla kurumsal siteyi geliştirdim.', en: 'I built a responsive website with service pages, readable content and direct contact links.' },
        outcomes: [{ tr: 'Kendi alan adında yayın', en: 'Published on a dedicated domain' }, { tr: 'Mobil uyumlu arayüz', en: 'Responsive interface' }, { tr: 'Kolay erişilen iletişim bilgileri', en: 'Accessible contact information' }],
        stack: ['Next.js', 'TypeScript', 'Vercel'], repo: 'https://github.com/saidbayraqtars/damrenurgunel-site', repoType: 'source', live: 'https://www.klinikpsikologdamrenurgunel.com.tr',
    },
    {
        slug: 'expert-bilisim', name: 'Expert Bilişim', category: 'web', theme: 'b2b',
        type: { tr: 'Kurumsal web · Teknoloji', en: 'Business website · Technology' },
        headline: { tr: 'Teknik uzmanlığın dijital vitrini.', en: 'A digital home for technical expertise.' },
        description: { tr: 'Çalıştığım şirketin yazılım, teknik destek ve kurumsal hizmetlerini tanıtan web sitesi.', en: 'A company website presenting software, technical support and business services for my employer.' },
        challenge: { tr: 'Şirketin farklı hizmetlerinin tek ve anlaşılır bir kurumsal anlatıda toplanması gerekiyordu.', en: 'The company’s different services needed a clear, unified presentation.' },
        solution: { tr: 'Hizmetleri ve iletişim akışını merkeze alan kurumsal web arayüzünü geliştirip Vercel üzerinden yayınladım.', en: 'I developed a service-focused corporate website and published it through Vercel.' },
        outcomes: [{ tr: 'Hizmet odaklı bilgi mimarisi', en: 'Service-focused information architecture' }, { tr: 'Mobil uyum', en: 'Mobile responsiveness' }, { tr: 'Doğrudan iletişim', en: 'Direct contact' }],
        stack: ['JavaScript', 'Vercel'], repo: 'https://github.com/saidbayraqtars/expertbilisimv1.0', repoType: 'source', live: 'https://expertbilisimv1-0.vercel.app',
    },
    {
        slug: 'pdf-xlsx', name: 'PDF → Excel', category: 'tools', theme: 'sea',
        type: { tr: 'Araç · Veri dönüştürme', en: 'Tool · Data conversion' },
        headline: { tr: 'Veriyi yeniden yazmak yerine kullanmak.', en: 'Use the data. Skip the retyping.' },
        description: { tr: 'PDF içindeki tabloları Excel dosyasına dönüştüren Python aracı.', en: 'A Python utility that converts PDF tables into Excel files.' },
        challenge: { tr: 'PDF içinde kalan tabloların düzenlenebilir elektronik tablolara aktarılması gerekiyordu.', en: 'Tables stored in PDFs needed to become editable spreadsheets.' },
        solution: { tr: 'PDF tablolarını okuyup XLSX çıktısı oluşturan bir dönüştürme aracı geliştirdim.', en: 'I developed a utility that reads PDF tables and exports XLSX files.' },
        outcomes: [{ tr: 'PDF tablo çıkarımı', en: 'PDF table extraction' }, { tr: 'Düzenlenebilir XLSX çıktısı', en: 'Editable XLSX output' }, { tr: 'Tekrar kullanılabilir otomasyon', en: 'Reusable automation' }],
        stack: ['Python', 'PDF', 'Excel'], repo: 'https://github.com/saidbayraqtars/pdf-to-xlsx-converter', repoType: 'source',
    },
    {
        slug: 'teknoklinik-toner', name: 'TeknoKlinik Toner', category: 'web', theme: 'vega',
        type: { tr: 'Web uygulaması · Takip', en: 'Web application · Tracking' },
        headline: { tr: 'Sarf malzemelerini takipte tutmak.', en: 'Keep track of consumables.' },
        description: { tr: 'Toner ve sarf malzeme takibi için hazırlanmış web uygulaması.', en: 'A web application for tracking toner and consumables.' },
        challenge: { tr: 'Toner ve sarf malzemelerinin web üzerinden takip edilebilmesi için erişilebilir bir uygulama gerekiyordu.', en: 'The workflow needed an accessible web application for toner and consumable tracking.' },
        solution: { tr: 'Takip akışını bir web uygulamasına taşıdım ve Vercel üzerinde yayınladım.', en: 'I brought the tracking workflow to a web application and deployed it on Vercel.' },
        outcomes: [{ tr: 'Web üzerinden erişim', en: 'Web-based access' }, { tr: 'Malzeme takibi', en: 'Consumables tracking' }, { tr: 'Vercel üzerinden dağıtım', en: 'Delivery through Vercel' }],
        stack: ['JavaScript', 'Vercel'], repo: 'https://github.com/saidbayraqtars/teknoklinik-toner', repoType: 'source', live: 'https://teknoklinik-toner.vercel.app',
    },
]

export const portfolio = {
    tr: {
        nav: { projects: 'Projeler', about: 'Hakkımda', services: 'Neler yapıyorum?', contact: 'Birlikte çalışalım', cv: 'CV indir', menu: 'Menüyü aç', menuTitle: 'Sayfalar', close: 'Kapat', theme: 'Temayı değiştir', language: 'Switch to English', skip: 'İçeriğe geç', home: 'Ana sayfa' },
        hero: { available: 'Freelance projelere açığım', role: 'FULL STACK DEVELOPER & ÇÖZÜM ORTAĞINIZ', greeting: 'Merhaba, ben Said.', line1: 'İyi fikirleri', handwriting: 'gerçek ürünlere', words: ['gerçek ürünlere', 'web deneyimlerine', 'akıllı sistemlere'], pauseAnimation: 'Yazı animasyonunu duraklat', resumeAnimation: 'Yazı animasyonunu sürdür', line3: 'dönüştürüyorum.', lead: 'İşinizi anlayan, yazılımınızı geliştiren ve yayına taşıyan bir geliştirici. Web sitelerinden ERP entegrasyonlarına, baştan sona yanınızdayım.', cta: 'Projenizi konuşalım', secondary: 'İşlerimi keşfedin', annotation: 'fikirden yayına.', imageLabel: 'Geliştirdiğim ürünlerden', imageAlt: 'B2B sipariş sistemi yönetici panosunun demo ekranı', miniLabel: 'Neva QR · Dijital menü', location: 'Samsun, Türkiye', remote: 'Her yerden birlikte çalışabiliriz', scroll: 'Biraz aşağıda, yaptığım işler', stack: 'Fikre uygun araçlar. Amaca uygun yazılım.', disciplines: ['Web deneyimleri', 'İş uygulamaları', 'ERP entegrasyonları', 'Masaüstü & mobil'] },
        work: { eyebrow: 'SEÇİLMİŞ PROJELER', title: 'Kodun gerçek hayattaki karşılığı.', lead: 'Farklı sektörler, farklı ihtiyaçlar. Ortak nokta: işin içinde çalışan yazılım.', details: 'Projeyi incele', live: 'Canlı site', source: 'Kaynak kod', releases: 'Sürümler', private: 'Proje hakkında konuşalım', screenshot: 'Projeden ekran görüntüsü', demoScreenshot: 'Demo verilerle ürün ekranı', workflow: 'Uygulamanın çalışma akışı', more: 'Her projenin ayrı bir hikâyesi var.', moreLead: 'İş uygulamaları, kurumsal siteler ve günlük hayatı kolaylaştıran araçlar.', all: 'Tümü', web: 'Web & SaaS', business: 'İş sistemleri', desktop: 'Masaüstü', tools: 'Araçlar', count: 'proje', empty: 'Bu kategoride henüz proje yok.', github: 'GitHub’da üretmeye devam.', githubLead: 'Kaynak kodlar, küçük denemeler ve uygulama sürümleri.', githubLink: 'GitHub profilim', githubShow: 'Tüm depoları göster', githubHide: 'Listeyi daralt', githubLoading: 'GitHub depoları yükleniyor…', githubError: 'GitHub listesi şu anda yüklenemedi. Tüm depoları profilimden görebilirsiniz.', retry: 'Tekrar dene', repo: 'depo', updated: 'Son güncelleme', releaseLabel: 'Sürüm deposu', repoLabel: 'Proje deposu' },
        services: { eyebrow: 'NASIL YARDIMCI OLABİLİRİM?', title: 'İşinize uyan yazılım.', lead: 'İhtiyaç netleştiğinde doğru çözüm de netleşir. Tek bir sayfadan, işletmenizin günlük akışını yöneten bir sisteme kadar.', items: [ { title: 'Web siteleri & dijital ürünler', description: 'Markanızı anlatan, mobilde rahat kullanılan ve müşterinin size ulaşmasını kolaylaştıran web deneyimleri.', tags: ['Kurumsal web', 'SaaS', 'Yönetim panelleri'] }, { title: 'İş yazılımları & entegrasyonlar', description: 'Sipariş, stok ve müşteri verilerinizi bir araya getiren; mevcut ERP’nizle birlikte çalışan özel uygulamalar.', tags: ['Vega ERP', 'B2B sistemleri', 'API entegrasyonu'] }, { title: 'Otomasyon & masaüstü', description: 'Tekrar eden işleri azaltan, ekibin günlük akışına uyan ve güncellenebilir şekilde teslim edilen araçlar.', tags: ['Electron', 'Raporlama', 'Veri dönüştürme'] } ], processTitle: 'Açık bir süreç. Birlikte ilerleme.', steps: [ { title: 'Önce sizi dinlerim.', description: 'İhtiyacı, kullanıcıları ve mevcut iş akışınızı birlikte netleştiririz.' }, { title: 'Kapsamı somutlaştırırım.', description: 'Ekranları, teslimleri ve takvimi görerek neye başlayacağımıza karar veririz.' }, { title: 'Görerek ilerlersiniz.', description: 'Çalışan parçaları düzenli paylaşır, geri bildirimlerle geliştiririm.' }, { title: 'Yayına birlikte çıkarız.', description: 'Kurulum, son kontroller ve kullanım aktarımıyla ürünü teslim ederim.' } ] },
        about: { eyebrow: 'EKRANIN DİĞER TARAFINDA', title: 'Sadece kodu değil, işi de anlıyorum.', p1: 'Ben Said Bayraktar. Samsun’da yaşayan bir full stack geliştiriciyim. Expert Bilişim’de yazılım geliştirme ile teknik desteği bir arada yürütüyorum.', p2: 'Sahada müşteriyle çalışmak bana şunu öğretti: iyi yazılım, kullanıcısının gününü kolaylaştırmalı. Bu yüzden önce süreci dinliyor, sonra ekranı tasarlıyor ve arkasındaki sistemi kuruyorum.', p3: 'Web, mobil ve masaüstü ürünler geliştiriyorum. Gerektiğinde sunucuyu da kuruyor, ürünü müşteride çalışır hale getiriyorum.', signature: 'Tanıştığımıza memnun oldum.', experience: 'Deneyim', education: 'Eğitim', skills: 'Araç çantam', cvTitle: 'Biraz daha yakından tanıyın.', cvLead: 'Yazılım geliştirme ve IT destek için, Türkçe ve İngilizce özgeçmişlerim.', cvRole: 'CV türü', developer: 'Yazılım geliştirme', support: 'IT destek', cvLanguage: 'CV dili', download: 'PDF indir', preview: 'Önizle', cvNote: 'PDF · Yeni sekmede önizleyebilir veya doğrudan indirebilirsiniz.', local: 'Samsun / Türkiye', fact1: 'Web, mobil ve masaüstü', fact2: '200+ kurumsal cihaza destek', fact3: 'Türkçe & İngilizce (B2)', fact4: 'Uzaktan çalışma & relokasyon' },
        contact: { eyebrow: 'BİR SONRAKİ PROJE, SİZİNKİ OLABİLİR.', title: 'Aklınızda bir fikir mi var?', handwriting: 'Konuşalım.', lead: 'Bir web sitesi, işinizi kolaylaştıracak bir uygulama ya da henüz şekillenmemiş bir fikir. Birlikte nereden başlayabileceğimize bakalım.', brief: 'Projenizi birkaç cümlede anlatın.', name: 'Adınız', email: 'E-posta adresiniz', service: 'Neye ihtiyacınız var?', message: 'Projenizden bahsedin', namePlaceholder: 'Adınız ve soyadınız', emailPlaceholder: 'siz@sirketiniz.com', messagePlaceholder: 'Ne yapmak istiyorsunuz? Kim kullanacak? Aklınızda bir tarih var mı?', submit: 'E-posta taslağı oluştur', note: 'Bu form e-posta uygulamanızı açar. Mesaj, siz gönderdiğinizde bana ulaşır.', drafted: 'E-posta taslağı hazır. Uygulamanız açılmadıysa aşağıdaki adresi kullanabilirsiniz.', copied: 'E-posta adresi kopyalandı.', copyError: 'Kopyalanamadı. Adresi seçerek kopyalayabilirsiniz.', copy: 'E-posta adresini kopyala', whatsapp: 'WhatsApp’ta konuşalım', whatsappText: 'Merhaba Said, bir yazılım projesi hakkında görüşmek istiyorum.', mailSubject: 'Yeni proje görüşmesi', mailGreeting: 'Merhaba Said,', choice: ['Web sitesi / SaaS', 'İş yazılımı / ERP', 'Masaüstü / otomasyon', 'Henüz net değil'], direct: 'Doğrudan ulaşmak isterseniz', faqTitle: 'Başlamadan önce', faqs: [ { q: 'Samsun dışında da çalışabilir miyiz?', a: 'Evet. İhtiyaç görüşmesi, ekran paylaşımları ve teslim sürecini uzaktan yürütebiliriz. Yüz yüze çalışma gereken kısmı ayrıca planlarız.' }, { q: 'Proje ücreti ve süresi nasıl belirleniyor?', a: 'İstediğiniz ekranları, entegrasyonları ve teslim kapsamını birlikte netleştirdikten sonra teklif ve takvim hazırlıyorum. İlk görüşmede ihtiyacı anlamak yeterli.' }, { q: 'Mevcut projemi geliştirebilir misiniz?', a: 'Evet. Önce mevcut kodu ve altyapıyı incelerim. İyileştirme alanlarını ve devam etmenin kapsamını somutlaştırarak ilerleriz.' }, { q: 'Yayın sonrasında ne oluyor?', a: 'Kurulum ve kullanım aktarımını teslimin parçası olarak planlarım. Bakım, destek ve yeni özelliklerin kapsamını ayrıca konuşuruz.' } ] },
        detail: { back: 'Tüm projelere dön', eyebrow: 'PROJE HİKÂYESİ', challenge: 'İhtiyaç', solution: 'Geliştirdiğim çözüm', outcomes: 'Neler sunuyor?', tools: 'Kullanılan teknolojiler', role: 'Rolüm', roleValue: 'Yazılım geliştirme & entegrasyon', next: 'Sıradaki proje', cta: 'İşiniz için benzer bir çözüm mü arıyorsunuz?', discuss: 'Birlikte konuşalım', repoNote: 'Bu bağlantı kurulum dosyaları ve uygulama sürümlerini içerir.', illustration: 'Projenin işlevlerini gösteren şematik sunum' },
        footer: { line: 'İyi fikirler, çalışan ürünlere.', rights: 'Tüm hakları saklıdır.', top: 'Başa dön', made: 'Samsun’dan, her yere.' },
        visuals: { customer: 'Müşteri', operation: 'İşlem kaydı', notify: 'WhatsApp', complete: 'Ekibe ortak, müşteriye anlaşılır.', source: 'Vega ERP', read: 'Müşteri verisi', own: 'Ayrı uygulama veritabanı', flow: 'MÜŞTERİ İŞLEMLERİ', desktop: 'Masaüstü', web: 'Web', mobile: 'Mobil', sea: 'AIS verisi → Bölge filtresi → Canlı harita' },
    },
    en: {
        nav: { projects: 'Projects', about: 'About', services: 'What I do', contact: 'Let’s work together', cv: 'Download CV', menu: 'Open menu', menuTitle: 'Navigation', close: 'Close', theme: 'Switch theme', language: 'Türkçeye geç', skip: 'Skip to content', home: 'Home' },
        hero: { available: 'Available for freelance work', role: 'FULL STACK DEVELOPER & YOUR TECH PARTNER', greeting: 'Hi, I’m Said.', line1: 'Turning good ideas', handwriting: 'into real products.', words: ['into real products.', 'into web experiences.', 'into smarter systems.'], pauseAnimation: 'Pause text animation', resumeAnimation: 'Resume text animation', line3: '', lead: 'A developer who understands your business, builds your software and takes it live. From websites to ERP integrations, I’m with you from start to finish.', cta: 'Let’s talk about your project', secondary: 'Explore my work', annotation: 'from idea to launch.', imageLabel: 'A look at my products', imageAlt: 'Demo screen of the B2B ordering system management dashboard', miniLabel: 'Neva QR · Digital menu', location: 'Samsun, Türkiye', remote: 'Working together, wherever you are', scroll: 'Keep scrolling for the work', stack: 'The right tools for a meaningful product.', disciplines: ['Web experiences', 'Business applications', 'ERP integrations', 'Desktop & mobile'] },
        work: { eyebrow: 'SELECTED WORK', title: 'Code, out in the real world.', lead: 'Different industries, different needs. One common thread: software that does the work.', details: 'Explore the project', live: 'Live website', source: 'Source code', releases: 'Releases', private: 'Let’s discuss this project', screenshot: 'Screenshot from the project', demoScreenshot: 'Product screen with demo data', workflow: 'How the application works', more: 'Every project has a story.', moreLead: 'Business applications, company websites and tools that make everyday work easier.', all: 'All', web: 'Web & SaaS', business: 'Business systems', desktop: 'Desktop', tools: 'Tools', count: 'projects', empty: 'No projects in this category yet.', github: 'Still building, on GitHub.', githubLead: 'Source code, small experiments and application releases.', githubLink: 'My GitHub profile', githubShow: 'Show all repositories', githubHide: 'Show fewer', githubLoading: 'Loading GitHub repositories…', githubError: 'The GitHub list is unavailable right now. You can find all repositories on my profile.', retry: 'Try again', repo: 'repositories', updated: 'Last updated', releaseLabel: 'Release repository', repoLabel: 'Project repository' },
        services: { eyebrow: 'HOW I CAN HELP', title: 'Software that fits your business.', lead: 'A clear need leads to a better solution. From a single page to the system behind your daily operations.', items: [ { title: 'Websites & digital products', description: 'Web experiences that tell your story, work comfortably on mobile and help customers reach you.', tags: ['Company websites', 'SaaS', 'Admin panels'] }, { title: 'Business software & integrations', description: 'Custom applications connecting orders, inventory and customers with the ERP you already use.', tags: ['Vega ERP', 'B2B systems', 'API integration'] }, { title: 'Automation & desktop', description: 'Tools that reduce repetitive work, fit your team’s routine and arrive ready for ongoing updates.', tags: ['Electron', 'Reporting', 'Data conversion'] } ], processTitle: 'A clear process. Shared progress.', steps: [ { title: 'First, I listen.', description: 'We clarify the need, the users and the way your business works.' }, { title: 'Then, we define it.', description: 'You see the screens, deliverables and timeline before we begin.' }, { title: 'You see the progress.', description: 'I share working pieces regularly and build on your feedback.' }, { title: 'We take it live.', description: 'Setup, final checks and a practical handover bring the product to your team.' } ] },
        about: { eyebrow: 'THE PERSON BEHIND THE SCREEN', title: 'I understand the work behind the code.', p1: 'I’m Said Bayraktar, a full stack developer based in Samsun, Türkiye. At Expert Bilişim, I combine software development with hands-on IT support.', p2: 'Working directly with customers taught me that good software should make someone’s day easier. I start by listening to the workflow, then design the interface and build the system behind it.', p3: 'I develop web, mobile and desktop products. When needed, I also set up the server and get the software running at the customer’s site.', signature: 'Nice to meet you.', experience: 'Experience', education: 'Education', skills: 'My toolkit', cvTitle: 'Get to know my background.', cvLead: 'Resumes for software development and IT support, in Turkish and English.', cvRole: 'Resume type', developer: 'Software development', support: 'IT support', cvLanguage: 'Resume language', download: 'Download PDF', preview: 'Preview', cvNote: 'PDF · Preview in a new tab or download directly.', local: 'Samsun / Türkiye', fact1: 'Web, mobile and desktop', fact2: '200+ corporate devices supported', fact3: 'Turkish & English (B2)', fact4: 'Remote work & relocation' },
        contact: { eyebrow: 'THE NEXT PROJECT COULD BE YOURS.', title: 'Have something in mind?', handwriting: 'Let’s talk.', lead: 'A website, an application to make work easier, or an idea that’s still taking shape. Let’s find a place to start.', brief: 'Tell me a little about your project.', name: 'Your name', email: 'Email address', service: 'What do you need?', message: 'About your project', namePlaceholder: 'Your full name', emailPlaceholder: 'you@company.com', messagePlaceholder: 'What would you like to build? Who will use it? Any timeline in mind?', submit: 'Create an email draft', note: 'This form opens your email application. I receive the message when you send it.', drafted: 'Your email draft is ready. If your email app didn’t open, use the address below.', copied: 'Email address copied.', copyError: 'Could not copy. You can select and copy the address instead.', copy: 'Copy email address', whatsapp: 'Let’s talk on WhatsApp', whatsappText: 'Hi Said, I’d like to discuss a software project.', mailSubject: 'New project enquiry', mailGreeting: 'Hi Said,', choice: ['Website / SaaS', 'Business software / ERP', 'Desktop / automation', 'Still figuring it out'], direct: 'Prefer to reach out directly?', faqTitle: 'Before we start', faqs: [ { q: 'Can we work together outside Samsun?', a: 'Yes. We can handle discovery, screen sharing and delivery remotely, and plan any in-person work separately.' }, { q: 'How do you estimate cost and timing?', a: 'We define the screens, integrations and delivery scope together, then I prepare a proposal and timeline. An initial conversation is enough to start understanding the need.' }, { q: 'Can you work on my existing project?', a: 'Yes. I first review the existing code and infrastructure, then outline concrete improvements and the scope for continuing.' }, { q: 'What happens after launch?', a: 'I plan setup and a practical handover as part of delivery. We discuss the scope of ongoing maintenance, support and new features separately.' } ] },
        detail: { back: 'Back to all projects', eyebrow: 'PROJECT STORY', challenge: 'The need', solution: 'What I built', outcomes: 'What it offers', tools: 'Technologies', role: 'My role', roleValue: 'Software development & integration', next: 'Next project', cta: 'Looking for a similar solution for your business?', discuss: 'Let’s talk', repoNote: 'This repository contains installers and application releases.', illustration: 'A schematic presentation of the project’s capabilities' },
        footer: { line: 'Good ideas. Working products.', rights: 'All rights reserved.', top: 'Back to top', made: 'From Samsun, to everywhere.' },
        visuals: { customer: 'Customer', operation: 'Work record', notify: 'WhatsApp', complete: 'Shared with your team. Clear for your customers.', source: 'Vega ERP', read: 'Customer data', own: 'Separate application database', flow: 'CUSTOMER OPERATIONS', desktop: 'Desktop', web: 'Web', mobile: 'Mobile', sea: 'AIS data → Region filter → Live map' },
    },
}

