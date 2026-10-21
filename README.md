# DeathCraft Website

## ساختار فایل‌ها
- `index.html`، `rules.html`، `stats.html`، `info.html` و `404.html`: صفحات اصلی سایت
- `assets/css/`: فایل‌های CSS
- `assets/js/`: فایل‌های JavaScript
- `assets/images/`: لوگوها، آیکون‌ها و تصاویر
- `sw.js`: Service Worker و کش آفلاین
- `manifest.json`: تنظیمات نصب PWA

## آمار MCTracker
سایت از API عمومی `https://mctracker.ir/api/server/715` برای اطلاعاتی که API ارائه می‌دهد استفاده می‌کند.
درصد آپتایم ۳۰ روزه در صفحه رسمی `https://mctracker.ir/servers/deathcraft` نمایش داده می‌شود. اگر API درصد آپتایم را برنگرداند، سایت عدد ساختگی نشان نمی‌دهد و لینک MCTracker را نمایش می‌دهد.

## انتشار
فایل‌های داخل پوشه `DeathCraft-main` را در ریشه GitHub Pages قرار دهید.


## فونت فارسی
فونت Vazirmatn در ابتدای `assets/css/theme.css` از فایل رسمی CSS در jsDelivr بارگذاری می‌شود. چون سایت از نام فونت `Vazirmatn` استفاده می‌کند، نیازی به تغییر صفحات HTML نیست. این روش به اتصال به CDN نیاز دارد؛ برای میزبانی کاملاً محلی باید فایل WOFF2 داخل `assets/fonts/` قرار گیرد.
