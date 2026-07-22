/**
 * ==========================================================
 *  SİBER OBA CTF — YARIŞMA VERİSİ (TEK YÖNETİM DOSYASI)
 * ==========================================================
 *
 * Yeni bir CTF eklemek / düzenlemek / kaldırmak için SADECE bu
 * dosyayı düzenlemeniz yeterlidir. Site otomatik olarak günceller.
 *
 * ÖNEMLİ — FLAG HASH'İ NASIL ÜRETİLİR?
 *   Flag'in düz metnini asla bu dosyaya yazmayın! Yerine SHA-256
 *   hash'ini yazın. Hash üretmek için:
 *     1) /admin/hash-tool.html sayfasını tarayıcıda açın, flag'i
 *        girin, çıkan hash'i kopyalayıp aşağıya yapıştırın.
 *     2) Ya da terminalde:  printf '%s' 'SIBEROBA{ornek}' | sha256sum
 *
 * KATEGORİ (categories) ALANLARI:
 *   slug        : URL'de kullanılacak benzersiz kısa isim (örn: "web")
 *   name        : Ekranda görünecek isim (örn: "Web")
 *   icon        : Boxicons ikon class'ı (bkz. https://boxicons.com)
 *   description : Kategori kartında görünecek kısa açıklama
 *
 * CHALLENGE (challenges) ALANLARI:
 *   id          : Benzersiz kimlik (örn: "web-01"). Değiştirmeyin,
 *                 değiştirirseniz kullanıcıların çözüm kaydı sıfırlanır.
 *   category    : Yukarıdaki categories listesindeki bir "slug"
 *   title       : Görev başlığı
 *   points      : Puan (tam sayı)
 *   difficulty  : "kolay" | "orta" | "zor"
 *   description : Görev açıklaması. Düz metin veya basit HTML olabilir
 *                 (örn: <b>, <code>, <pre>, <br>, <a>). Satır sonları
 *                 için \n kullanabilirsiniz, otomatik satıra döker.
 *   flagFormat  : Kullanıcıya gösterilecek flag formatı ipucu (opsiyonel)
 *   flagHash    : sha256 hex hash (yukarıdaki admin aracıyla üretin)
 *   caseSensitive: true/false — flag büyük/küçük harfe duyarlı mı (varsayılan true)
 *   hint        : Opsiyonel ipucu metni. Yoksa hiç ipucu kutusu gösterilmez.
 *   files       : Opsiyonel dosya eki listesi.
 *                 [{ name: "gorunen-ad.zip", url: "files/web-01/dosya.zip" }]
 *                 Dosyaları /files/<challenge-id>/ klasörüne koyup path'i
 *                 buraya yazmanız yeterli.
 *   link        : Opsiyonel dış bağlantı (örn: canlı hedef site, OSINT
 *                 profili vb.) — "Hedefe Git" butonu olarak gösterilir.
 *
 * Yeni challenge eklemek için aşağıdaki listeye yeni bir obje eklemeniz,
 * yeni bir kategori eklemek için categories listesine yeni bir obje
 * eklemeniz yeterlidir. Sıralama önemli değildir.
 */

export const categories = [
	{
		slug: "test",
		name: "test",
		icon: "bx-code-alt",
		description: "Test için bir kategoridir.",
	},
];

export const challenges = [
	// ---------------- test ----------------
	{
		id: "test-01",
		category: "test",
		title: "Gizli Yorum",
		points: 10,
		difficulty: "kolay",
		description: "Aşağıdaki bağlantıda basit bir tanıtım sayfası bulunuyor. Sayfanın kaynak kodunu (HTML) incelediğinizde geliştiricinin unuttuğu bir yorum satırı dikkatinizi çekecektir.",
		flagFormat: "SIBEROBA{...}",
		flagHash: "717c140ab94441367e96b4b38c9ee7b2a7bfa56a69a585b4650ace2bbddb05a5",
		hint: "Tarayıcınızda sağ tık > 'Sayfa Kaynağını Görüntüle' veya Ctrl+U.",
		files: [],
		link: "https://siberoba.github.io/ctf",
	},
];
