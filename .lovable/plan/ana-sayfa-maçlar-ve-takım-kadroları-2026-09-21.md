# Ana sayfa, maçlar ve takım kadroları

## Uygulama kapsamı
- Ana görsel alanını otomatik ilerleyen, oklar ve seçim noktalarıyla elle de kontrol edilebilen bir kaydırıcıya dönüştürmek.
- Kaydırıcı içeriklerini yerel görsel yolu, başlık ve açıklama alanları bulunan tek bir JSON dosyasında tutmak.
- Ana sayfaya yan yana “Gelecek Maç” ve “Son Maç” kartları eklemek; tarih, skor, setler ve kulüp logolarını tek bir JSON dosyasından okumak.
- Üst menüde “Takımlarımız” açılır menüsü oluşturmak ve istenen 11 takım kategorisinin her biri için ayrı, paylaşılabilir takım sayfası sağlamak.
- Takım sayfalarında seçili takımın tanıtım görselini ve JSON dizisinden gelen oyuncu kadrosunu kart düzeninde göstermek.
- Oyuncu bilgileri verilmediği için, gerçek isim uydurmadan düzenlenebilir örnek oyuncu kayıtları ve yerel bir oyuncu görseli kullanmak.
- Mevcut WhatsApp, salon, iletişim ve alt bilgi alanlarını korumak; formlara yer vermemek.

## Sayfa yapısı
- `/`: Kaydırıcı, maç kartları, takım kategorileri, salon ve iletişim.
- `/takimlar`: Tüm takım kategorilerinin listesi.
- `/takimlar/{takim-adresi}`: Seçilen takımın kadro sayfası.

## Teknik ayrıntılar
- `sliderData.json`, `matchesData.json` ve takım/oyuncu dizisini ayrı veri dosyalarında tutmak.
- Mevcut yerel takım fotoğraflarını kaydırıcı ve takım kapaklarında kullanmak; dış görsel bağlantısı eklememek.
- Takım logoları için mevcut kulüp logosunu yerel kaynak olarak kullanmak; rakip bilgilerini JSON’dan kolayca değiştirilebilir örnek içerik olarak işaretlemek.
- Kaydırıcıyı erişilebilir duraklatma, önceki/sonraki kontrolleri ve azaltılmış hareket tercihiyle uyumlu yapmak.
- Her yeni sayfaya kendine özgü başlık ve paylaşım açıklaması eklemek; masaüstü ve mobil görünümü doğrulamak.
