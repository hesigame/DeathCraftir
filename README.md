# DeathCraft

وب‌سایت رسمی سرور ماینکرفت DeathCraft (https://deathcraft.ir). سایت استاتیک است و با GitHub Pages اجرا می‌شود.

## ساختار پروژه

```
index.html            صفحه اصلی
404.html              صفحه خطا (باید در ریشه بماند)
rules/  info/  stats/  shop/  panel/    هر صفحه در پوشه‌ی خودش (آدرس تمیز: /rules/)
assets/
  css/  base.css (پایه و هدر و فوتر) · home.css · pages.css
  js/   main.js (تم، منو، کپی آی‌پی) · status.js (وضعیت زنده سرور)
  img/  favicon، آیکون‌ها، og-cover.png، تصویر تیم و بج‌ها
manifest.webmanifest  sw.js    اپلیکیشن قابل نصب (PWA)
robots.txt  sitemap.xml  llms.txt    سئو
CNAME                 دامنه
```

فایل‌های `rules.html`، `info.html`، `stats.html` و `shop.html` در ریشه فقط برای انتقال آدرس‌های قدیمی هستند و بعد از جایگزین شدن در گوگل می‌شود حذفشان کرد.

## اجرا روی کامپیوتر

مسیرها از ریشه شروع می‌شوند، پس فایل را مستقیم باز نکنید:

```
python -m http.server 8000
```

سپس http://localhost:8000 را باز کنید.
