# MiniSosyal Full-Stack Uygulaması

Bu proje "Web Tabanlı Programlama Hafta 5 - MiniSosyal" dökümanındaki gereksinimleri karşılayan, React, Express, PostgreSQL ve Prisma ORM içeren tam yığın (full-stack) bir prototiptir.

## İçerik ve Klasör Yapısı

Proje dosyaları `minisosyal` klasörü altında toplanmıştır.
- `client/`: React (Vite) ile hazırlanan ve TailwindCSS kullanan frontend kodları
- `/`: Express.js, Prisma, ve JWT tabanlı kurulan Backend sunucu kodları

## Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için PostgreSQL'in yüklü ve çalışır durumda olması gerekmektedir. Veritabanı yapılandırması `minisosyal/.env` dosyasında `DATABASE_URL` altında tanımlanmıştır.

### Adım 1: Backend
1. Terminal üzerinden `minisosyal` kök dizinine gidin.
2. (Opsiyonel) Eğer modül kurma sorunu yaşadıysanız bağımlılıkları tekrar yükleyin:
   ```bash
   npm install
   ```
3. PostgreSQL veritabanınızı başlatın ve `.env` dosyasındaki veritabanı şifrenizi (varsayılan: `postgres:postgres@localhost:5432/minisosyal`) kendi yerel bağlantınız ile güncelleyin.
4. Veritabanı tablolarını oluşturun:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Sunucuyu başlatın:
   ```bash
   npx nodemon server.js
   ```

### Adım 2: Frontend
1. Yeni bir terminalde `minisosyal/client` klasörüne girin:
   ```bash
   cd minisosyal/client
   ```
2. Bağımlılıkları kurun (eğer daha önce tamamlanmadıysa):
   ```bash
   npm install
   ```
3. React gelişim sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Konsolda beliren linke (genellikle http://localhost:5173) tıklayarak uygulamayı tarayıcınızdan görüntüleyin. Kayıt olma, giriş yapma ve gönderi paylaşma işlemlerini test edebilirsiniz! 🚀
