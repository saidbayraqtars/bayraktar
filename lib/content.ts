export type Lang = 'tr' | 'en'
export type Localized = { tr: string; en: string }

export const profile = {
    name: 'Said Bayraktar',
    email: 'saidbayraktar9@gmail.com',
    phone: '+90 535 078 61 01',
    whatsapp: '905350786101',
    location: 'Samsun, Türkiye',
    github: 'https://github.com/saidbayraqtars',
    githubUser: 'saidbayraqtars',
    linkedin: 'https://linkedin.com/in/said-bayraktar9',
}

export const skillGroups = [
    { tr: 'Diller', en: 'Languages', items: ['JavaScript', 'TypeScript', 'SQL', 'C#', 'Python'] },
    { tr: 'Arayüz', en: 'Frontend', items: ['React', 'Next.js', 'React Native (Expo)', 'Tailwind CSS', 'Astro'] },
    { tr: 'Sunucu ve API', en: 'Backend and API', items: ['Node.js', 'Express', 'NestJS', 'Laravel', 'SSE'] },
    { tr: 'Veritabanı', en: 'Databases', items: ['PostgreSQL', 'PostGIS', 'SQL Server', 'Prisma', 'SQLite'] },
    { tr: 'Masaüstü ve dağıtım', en: 'Desktop and delivery', items: ['Electron', 'NSIS + otomatik güncelleme', 'RSA lisanslama', 'Docker', 'Cloudflare'] },
    { tr: 'Sistem', en: 'Systems', items: ['Windows Server', 'Active Directory', 'DNS / DHCP / GPO', 'Hyper-V', 'PowerShell'] },
]

export const experience = [
    {
        company: 'Freelance',
        period: { tr: '10/2026 - Halen', en: '10/2026 - present' },
        role: { tr: 'Full Stack Developer', en: 'Full Stack Developer' },
        current: true,
        bullets: [
            { tr: 'Web siteleri, iş yazılımları ve masaüstü uygulamaları geliştiriyorum.', en: 'I build websites, business software and desktop applications.' },
            { tr: 'Expert Bilişim için geliştirdiğim Vega ürünlerine uzaktan destek veriyorum: sürüm yayını, hata düzeltme, kurulum ve müşteri talepleri.', en: 'I give remote support for the Vega products I built for Expert Bilişim: releases, bug fixes, installations and customer requests.' },
        ],
    },
    {
        company: 'Expert Bilişim (Vega Yazılım)',
        period: { tr: '02/2026 - 10/2026', en: '02/2026 - 10/2026' },
        role: { tr: 'Full Stack Developer ve IT Destek', en: 'Full Stack Developer and IT Support' },
        current: false,
        bullets: [
            { tr: 'Vega ERP’ye bağlanan masaüstü ürünleri yazdım: WhatsApp tahsilat otomasyonu, destek takibi, hızlı belge girişi, günlük kasa.', en: 'Wrote desktop products that plug into Vega ERP: WhatsApp collections automation, support tracking, fast document entry, daily cash.' },
            { tr: 'Ürünleri Electron ve NSIS ile paketleyip otomatik güncellemeyle dağıttım; donanıma bağlı RSA lisanslamayı ve bulut lisans panelini kurdum.', en: 'Packaged products with Electron and NSIS, shipped them over auto-update, and set up hardware-bound RSA licensing and a cloud licence panel.' },
            { tr: 'Sıfırdan sunucu kurdum ve 200’den fazla kurumsal cihaza yerinde ve uzaktan destek verdim.', en: 'Built servers from scratch and supported more than 200 corporate devices on site and remotely.' },
        ],
    },
    {
        company: 'Turkcell Superonline',
        period: { tr: '12/2024 - 10/2025', en: '12/2024 - 10/2025' },
        role: { tr: 'Saha Satış Sorumlusu', en: 'Field Sales Representative' },
        current: false,
        bullets: [
            { tr: 'Ayda ortalama 30 yeni abonelik sattım; müşteriyle birebir çalışmayı burada öğrendim.', en: 'Averaged 30 new subscriptions a month and learned to work directly with customers.' },
        ],
    },
]

export const education = [
    { school: { tr: 'Osmangazi Üniversitesi', en: 'Osmangazi University' }, degree: { tr: 'Bilgisayar Programcılığı (önlisans, kayıt donduruldu)', en: 'Computer Programming (associate degree, on leave)' }, period: '2023 - 2025' },
    { school: { tr: 'Mesleki ve Teknik Anadolu Lisesi', en: 'Vocational and Technical High School' }, degree: { tr: 'Tıbbi Cihaz Teknolojileri', en: 'Medical Device Technologies' }, period: '2018 - 2023' },
]

export const cvFiles = [
    { file: '/cv/Said_Bayraktar_FullStack_Developer_TR.pdf', role: 'dev', lang: 'tr' },
    { file: '/cv/Said_Bayraktar_FullStack_Developer_EN.pdf', role: 'dev', lang: 'en' },
    { file: '/cv/Said_Bayraktar_IT_Support_Specialist_TR.pdf', role: 'it', lang: 'tr' },
    { file: '/cv/Said_Bayraktar_IT_Support_Specialist_EN.pdf', role: 'it', lang: 'en' },
] as const

/** Real figures only: each number below comes from a shipped project. */
export const stats = [
    { value: 19, suffix: '', label: { tr: 'proje yayında ya da sahada', en: 'projects live or in the field' } },
    { value: 1200, suffix: '+', label: { tr: 'otomatik test, yalnızca B2B Sipariş’te', en: 'automated tests in B2B Sipariş alone' } },
    { value: 200, suffix: '+', label: { tr: 'kurumsal cihaza destek', en: 'corporate devices supported' } },
    { value: 43, suffix: '', label: { tr: 'menü tasarımı Neva QR’da', en: 'menu designs in Neva QR' } },
]

export const layers = [
    {
        id: 'ui',
        name: { tr: 'Arayüz', en: 'Interface' },
        line: { tr: 'Kullanıcının dokunduğu her ekran.', en: 'Every screen people actually touch.' },
        body: { tr: 'Bayi portalı, saha satış uygulaması, restoran menüsü. Masaüstünde, telefonda ve tarayıcıda aynı özenle.', en: 'Dealer portals, field-sales apps, restaurant menus. Built with the same care on desktop, phone and browser.' },
        tools: ['React', 'Next.js', 'Expo', 'Tailwind CSS', 'Electron'],
    },
    {
        id: 'api',
        name: { tr: 'Sunucu', en: 'Server' },
        line: { tr: 'İş kurallarının yaşadığı yer.', en: 'Where the business rules live.' },
        body: { tr: 'Sipariş, tahsilat, stok ve yetki akışları. Gerçek zamanlı veri, kuyruklar ve WhatsApp entegrasyonları.', en: 'Order, collection, stock and permission flows. Real-time data, queues and WhatsApp integrations.' },
        tools: ['Node.js', 'Express', 'NestJS', 'Laravel', 'SSE'],
    },
    {
        id: 'data',
        name: { tr: 'Veri', en: 'Data' },
        line: { tr: 'ERP’yi bozmadan okumak.', en: 'Reading the ERP without breaking it.' },
        body: { tr: 'Vega ERP’nin SQL Server veritabanına bağlanan araçlar, PostgreSQL ve PostGIS ile kurulan yeni sistemler.', en: 'Tools that plug into Vega ERP’s SQL Server database, and new systems built on PostgreSQL and PostGIS.' },
        tools: ['SQL Server', 'PostgreSQL', 'PostGIS', 'Prisma', 'SQLite'],
    },
    {
        id: 'infra',
        name: { tr: 'Altyapı', en: 'Infrastructure' },
        line: { tr: 'Müşteride çalışır halde tutmak.', en: 'Keeping it running at the customer.' },
        body: { tr: 'Kurulum paketi, otomatik güncelleme ve lisans. Gerekirse sunucuyu RAID’den Active Directory’ye kadar kurarım.', en: 'Installers, automatic updates and licensing. When needed I build the server too, from RAID to Active Directory.' },
        tools: ['Windows Server', 'Cloudflare', 'Docker', 'NSIS', 'RSA lisans'],
    },
]

export const copy = {
    tr: {
        skip: 'İçeriğe geç',
        role: 'Full stack geliştirici',
        nav: { work: 'İşler', about: 'Hakkımda', contact: 'İletişim', menu: 'Menü', close: 'Kapat' },
        theme: 'Temayı değiştir',
        language: 'Switch to English',
        langShort: 'EN',
        intro: { skip: 'Geç' },
        hero: {
            line1: 'Ekrandan',
            line2: 'sunucuya.',
            lead: 'Web, mobil ve masaüstü yazılım geliştiriyorum. Arayüzü de, arkasındaki sunucuyu da ben kuruyorum.',
            work: 'İşleri gör',
            contact: 'Konuşalım',
        },
        layersTitle: 'Bir yazılımın dört katmanı',
        work: {
            title: 'İşler, büyükten küçüğe.',
            lead: 'Sahada çalışan iş yazılımlarından kurumsal sitelere, 19 proje.',
            more: 'Daha küçük, aynı özenle',
            open: 'Siteyi aç',
            view: 'İncele',
            employer: 'Expert Bilişim için',
        },
        status: { live: 'Canlı', field: 'Sahada', ready: 'Satışa hazır', dev: 'Geliştirmede' },
        statsTitle: 'Sayılarla',
        about: {
            title: 'Kodu da, işi de anlıyorum.',
            p1: 'Samsun’da yaşayan bir full stack geliştiriciyim. Saha satışında müşteriyle birebir çalışırken şunu öğrendim: iyi yazılım, kullanan kişinin gününü kolaylaştırır.',
            p2: 'Şubat-Ekim 2026 arasında Expert Bilişim’de yazılım geliştirme ile IT desteği bir arada yürüttüm. Ekim 2026’dan beri freelance çalışıyorum ve orada geliştirdiğim ürünlere uzaktan destek vermeye devam ediyorum.',
            experience: 'Deneyim',
            education: 'Eğitim',
            facts: ['Samsun, Türkiye', 'Türkçe ve İngilizce', 'Uzaktan çalışmaya açık'],
        },
        contact: {
            title: 'Konuşalım.',
            lead: 'Bir web sitesi, işinizi kolaylaştıracak bir uygulama ya da henüz şekillenmemiş bir fikir. En hızlı e-postayla dönüyorum.',
            copy: 'Kopyala',
            copied: 'Kopyalandı',
            whatsapp: 'WhatsApp',
            whatsappText: 'Merhaba Said, bir yazılım projesi hakkında görüşmek istiyorum.',
            cv: 'Özgeçmiş',
            cvDev: 'Yazılım geliştirme',
            cvIt: 'IT destek',
            links: 'Kod ve profil',
        },
        footer: { top: 'Başa dön', rights: 'Tüm hakları saklıdır.' },
        showcase: {
            back: 'Tüm işler',
            highlights: 'Neler yapıyor',
            stack: 'Teknolojiler',
            employer: 'Expert Bilişim için geliştirildi.',
            repo: 'Sürümler',
            next: 'Sıradaki iş',
            cta: 'Benzer bir şeye mi ihtiyacınız var?',
        },
        notFound: { title: 'Bu sayfa burada değil.', body: 'Taşınmış ya da hiç olmamış olabilir.', back: 'Ana sayfa' },
    },
    en: {
        skip: 'Skip to content',
        role: 'Full stack developer',
        nav: { work: 'Work', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close' },
        theme: 'Switch theme',
        language: 'Türkçeye geç',
        langShort: 'TR',
        intro: { skip: 'Skip' },
        hero: {
            line1: 'Screen',
            line2: 'to server.',
            lead: 'I build web, mobile and desktop software, from the interface down to the server behind it.',
            work: 'See the work',
            contact: 'Let’s talk',
        },
        layersTitle: 'The four layers of a product',
        work: {
            title: 'Work, biggest first.',
            lead: 'From business software running in the field to company websites, 19 projects.',
            more: 'Smaller, built with the same care',
            open: 'Open site',
            view: 'View',
            employer: 'For Expert Bilişim',
        },
        status: { live: 'Live', field: 'In use', ready: 'Ready to sell', dev: 'In development' },
        statsTitle: 'In numbers',
        about: {
            title: 'I understand the work behind the code.',
            p1: 'I’m a full stack developer based in Samsun, Türkiye. Selling face to face in the field taught me that good software makes someone’s day easier.',
            p2: 'From February to October 2026 I combined software development with IT support at Expert Bilişim. Since October 2026 I work freelance and keep giving remote support for the products I built there.',
            experience: 'Experience',
            education: 'Education',
            facts: ['Samsun, Türkiye', 'Turkish and English', 'Open to remote work'],
        },
        contact: {
            title: 'Let’s talk.',
            lead: 'A website, an app to make your work easier, or an idea still taking shape. Email gets the fastest reply.',
            copy: 'Copy',
            copied: 'Copied',
            whatsapp: 'WhatsApp',
            whatsappText: 'Hi Said, I’d like to discuss a software project.',
            cv: 'Resume',
            cvDev: 'Software development',
            cvIt: 'IT support',
            links: 'Code and profile',
        },
        footer: { top: 'Back to top', rights: 'All rights reserved.' },
        showcase: {
            back: 'All work',
            highlights: 'What it does',
            stack: 'Technologies',
            employer: 'Built for Expert Bilişim.',
            repo: 'Releases',
            next: 'Next project',
            cta: 'Need something similar?',
        },
        notFound: { title: 'This page isn’t here.', body: 'It may have moved, or it never existed.', back: 'Home' },
    },
}

export type Copy = (typeof copy)['tr']

