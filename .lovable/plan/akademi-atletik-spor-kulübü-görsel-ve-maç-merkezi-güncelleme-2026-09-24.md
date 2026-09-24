# Akademi Atletik Spor Kulübü görsel ve maç merkezi güncellemesi

## Uygulanacak değişiklikler
- Yüklenen ilk logo görselinin beyaz zeminini kaldırıp şeffaf PNG olarak hazırlayacağım; eski logo kullanılan tüm alanları yeni logoya geçireceğim ve koyu/açık zeminde okunması için hafif beyaz kontur-gölge uygulayacağım.
- İlk görselden sonra yüklenen yedi antrenman fotoğrafını mevcut kayan galeriye ekleyeceğim. Galerinin otomatik geçişi, kontrol düğmeleri ve mevcut metin düzeni korunacak.
- Header, Footer, ana sayfa, takım sayfaları, sayfa başlıkları ve yönetici panelindeki tüm kulüp adlarını “AKADEMİ ATLETİK SPOR KULÜBÜ” olarak güncelleyeceğim.
- Maç Merkezi’ni iki tam genişlikte, alt alta açık gri kart olarak yeniden düzenleyeceğim. Her kartta üstte Puan Durumu ve Fikstür düğmeleri, ortalı bölüm başlığı, küçük turnuva amblemi, büyük takım logoları, ortada tarih/saat veya skor ve set bilgileri bulunacak.
- Yönetici panelindeki her maç formuna ev sahibi ve rakip logo URL alanları ile logo dosyası yükleme alanları ekleyeceğim. Dosya seçilirse güvenli medya deposuna yüklenip URL’nin yerine geçecek; seçim yapılmazsa girilen URL kullanılacak.
- Maç kaydından sonra ana sayfa verisini yenileyerek logoların ve maç bilgilerinin sayfa yenilemeden görünmesini sağlayacağım.
- Oyuncu kartlarının görsel, forma numarası ve isim düzenine dokunmayacağım.

## Teknik ayrıntılar
- Mevcut Lovable Cloud tabloları ve `home_logo` / `away_logo` alanları kullanılacak; yeni tablo gerekmiyor.
- Yeni antrenman fotoğrafları özel medya alanına yüklenip mevcut `/api/public/media/...` yolu üzerinden gösterilecek.
- Logo uygulamanın yerel görseli olacak; favicon ve mevcut görsel yolları gerektiği ölçüde güncellenecek.
- Masaüstü ve mobil görünüm, form gönderimi ve dinamik veri yenilemesi tarayıcıda doğrulanacak.
