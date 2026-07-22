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
		slug: "web",
		name: "Web",
		icon: "bx-code-alt",
		description: "Web uygulama güvenliği, XSS, SQLi, kaynak kod inceleme ve daha fazlası.",
	},
	{
		slug: "osint",
		name: "OSINT",
		icon: "bx-search-alt",
		description: "Açık kaynak istihbarat teknikleriyle bilgi ve kişi/konum tespiti.",
	},
	{
		slug: "forensics",
		name: "Adli Bilişim",
		icon: "bx-folder-open",
		description: "Dosya analizi, metadata, steganografi ve disk/network imajları.",
	},
	{
		slug: "crypto",
		name: "Kriptografi",
		icon: "bx-lock",
		description: "Şifreleme algoritmaları, encoding ve klasik şifre çözme görevleri.",
	},
	{
		slug: "misc",
		name: "Genel Kültür",
		icon: "bx-puzzle",
		description: "Kategorilere sığmayan yaratıcı ve eğlenceli görevler.",
	},
];

export const challenges = [
	// ---------------- WEB ----------------
	{
		id: "web-01",
		category: "web",
		title: "Gizli Yorum",
		points: 100,
		difficulty: "kolay",
		description:
			"Aşağıdaki bağlantıda basit bir tanıtım sayfası bulunuyor. Sayfanın kaynak kodunu (HTML) incelediğinizde geliştiricinin unuttuğu bir yorum satırı dikkatinizi çekecektir.\n\nİpucu: Tarayıcınızda sağ tık > 'Sayfa Kaynağını Görüntüle' veya Ctrl+U.",
		flagFormat: "SIBEROBA{...}",
		flagHash: "0a03f07c94a0990f8c9359cc680a09dd140d3911a3f12ceeba65851733c90553",
		hint: "Kaynak kodda HTML yorumları <!-- ... --> şeklinde görünür.",
		files: [],
		link: "https://example.com/",
	},

	// ---------------- OSINT ----------------
	{
		id: "osint-01",
		category: "osint",
		title: "Fotoğraftaki İpucu",
		points: 150,
		difficulty: "orta",
		description:
			"Ekteki fotoğraf bir etkinlik sırasında çekilmiştir. Fotoğrafın çekildiği şehri tespit edip flag formatında gönderin.\n\nİpucu: Görsel EXIF verileri, arka plandaki tabelalar ve bina mimarisi işinize yarayabilir.",
		flagFormat: "SIBEROBA{lokasyon_bulundu_sehir_ismi}",
		flagHash: "c13aa3026b5c422425ae4e15493ce83d7fb267d6f744d36a24a3a8e5a0c7aeb9",
		hint: "exiftool ya da benzeri bir metadata görüntüleyici kullanmayı deneyin.",
		files: [{ name: "etkinlik-fotografi.jpg", url: "files/osint-01/etkinlik-fotografi.jpg" }],
		link: "",
	},

	// ---------------- FORENSICS ----------------
	{
		id: "forensics-01",
		category: "forensics",
		title: "Metadata Avcısı",
		points: 120,
		difficulty: "kolay",
		description:
			"Ekteki dosyanın metadata bilgilerinde bir yazar/uygulama alanına flag gizlenmiştir.\n\nİpucu: 'exiftool', 'strings' veya dosya özellikleri işinizi görebilir.",
		flagFormat: "SIBEROBA{...}",
		flagHash: "291d4abfe080549ab936d6672b792b2b3172e14762e03eaf30197424e0d1c23d",
		hint: "",
		files: [{ name: "belge.pdf", url: "files/forensics-01/belge.pdf" }],
		link: "",
	},

	// ---------------- CRYPTO ----------------
	{
		id: "crypto-01",
		category: "crypto",
		title: "Klasik Şifre",
		points: 80,
		difficulty: "kolay",
		description:
			"Aşağıdaki metin klasik bir şifreleme yöntemiyle şifrelenmiştir:\n\n<code>FVOREBON{pnrfne_xvevyqv_ebg13}</code>\n\nBu şifreyi çözüp flag'i gönderin.",
		flagFormat: "SIBEROBA{...}",
		flagHash: "edc9d39b6c683274e872ab0bfd954481bdc2e87638c44f2412a0fef5d24300b2",
		hint: "Sezar şifrelemesinin özel bir hali olan ROT13'ü araştırın.",
		files: [],
		link: "",
	},

	// ---------------- MISC ----------------
	{
		id: "misc-01",
		category: "misc",
		title: "robots.txt Gizemi",
		points: 60,
		difficulty: "kolay",
		description:
			"Bazen en basit yerler en çok göz ardı edilenlerdir. Verilen hedef sitenin robots.txt dosyasına göz atın.",
		flagFormat: "SIBEROBA{...}",
		flagHash: "8b51ff1c612a3c72c5bd1045aeb923ddc3f18ce282058a9240d6810a53f61e9e",
		hint: "https://hedefsite.com/robots.txt adresini deneyin.",
		files: [],
		link: "https://example.com/",
	},
];
