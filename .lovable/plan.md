# Slider sadeleştirme ve görsel performansı

## Uygulanacak değişiklikler
- Ana sayfa slider’ındaki tüm tanıtım metinlerini, butonları ve istatistikleri kaldırıp yalnızca üstte “Antrenmandan Kareler” başlığını göstereceğim.
- İlk slider görselini sabit tutacak, diğer görsellerin yönetici panelinden tek tek eklenip kaldırılmasını sürdüreceğim.
- İlk görseli öncelikli yükleyecek; tüm slider görsellerini masaüstü ve mobilde ortalanmış, kırpılmadan bozulmayan kaplama düzeninde göstereceğim.
- Yönetici panelinden yüklenen takım, slider, oyuncu ve maç logosu görsellerini tarayıcıda en fazla 1920 piksele küçültüp WebP olarak sıkıştıracağım.
- Son kaynak kodunu bağımlılıklar ve geçici çıktılar olmadan ZIP olarak hazırlayıp indirme bağlantısı sunacağım.

## Teknik ayrıntılar
- Optimizasyon tarayıcı Canvas API ile yapılacak; saydam PNG logolarının şeffaflığı WebP içinde korunacak.
- İlk görsel `loading="eager"` ve yüksek indirme önceliğiyle, diğerleri gecikmeli yüklenecek.
- Slider kontrolleri ve otomatik geçiş korunacak; yalnızca içerik sunumu sadeleşecek.
