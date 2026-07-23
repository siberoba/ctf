/**
 * ==========================================================
 *  SİBER OBA CTF — VERİ YÜKLEYİCİ
 * ==========================================================
 *
 * Yarışma verisi data/ klasöründeki JSON dosyalarında tutulur.
 * Veri büyüdükçe tek dosya şişmesin diye her kategori kendi
 * challenge dosyasında saklanır.
 *
 *   data/categories.json           : tüm kategoriler
 *   data/challenges/<slug>.json    : o kategoriye ait challenge'lar
 *                                    (slug, categories.json'daki "slug"
 *                                    alanıyla birebir aynı olmalı)
 *
 * KATEGORİ (categories) ALANLARI:
 *   slug        : URL'de kullanılacak benzersiz kısa isim (örn: "web")
 *   name        : Ekranda görünecek isim (örn: "Web")
 *   icon        : Boxicons ikon class'ı (bkz. https://boxicons.com)
 *   description : Kategori kartında görünecek kısa açıklama
 *
 * CHALLENGE ALANLARI (data/challenges/<slug>.json içindeki her obje):
 *   id          : Benzersiz kimlik (örn: "web-01"). Değiştirmeyin,
 *                 değiştirirseniz kullanıcıların çözüm kaydı sıfırlanır.
 *   title       : Görev başlığı
 *   points      : Puan (tam sayı)
 *   difficulty  : "kolay" | "orta" | "zor"
 *   description : Görev açıklaması. Düz metin veya basit HTML olabilir
 *                 (örn: <b>, <code>, <pre>, <br>, <a>). Satır sonları
 *                 için \n kullanabilirsiniz, otomatik satıra döker.
 *   flagFormat  : Kullanıcıya gösterilecek flag formatı ipucu (opsiyonel)
 *   flagHash    : sha256 hex hash (/admin/hash-tool.html ile üretin)
 *   caseSensitive: true/false — flag büyük/küçük harfe duyarlı mı (varsayılan true)
 *   hint        : Opsiyonel ipucu metni. Yoksa hiç ipucu kutusu gösterilmez.
 *   files       : Opsiyonel dosya eki listesi.
 *                 [{ "name": "gorunen-ad.zip", "url": "files/web-01/dosya.zip" }]
 *   link        : Opsiyonel dış bağlantı — "Hedefe Git" butonu olarak gösterilir.
 *
 *   NOT: Flag'in düz metnini asla bu dosyalara yazmayın! Sadece SHA-256
 *   hash'ini yazın.
 *
 * Yeni kategori eklemek için categories.json'a bir obje ekleyip
 * data/challenges/<slug>.json dosyasını oluşturmanız yeterlidir.
 */

let dataPromise = null;

export function loadData() {
	if (!dataPromise) {
		dataPromise = fetchAll();
	}
	return dataPromise;
}

async function fetchAll() {
	const categories = await fetchJson("data/categories.json");

	const perCategory = await Promise.all(categories.map((cat) => fetchJson(`data/challenges/${cat.slug}.json`)));

	const challenges = perCategory.flatMap((list, i) => list.map((challenge) => ({ ...challenge, category: categories[i].slug })));

	return { categories, challenges };
}

async function fetchJson(url) {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Veri yüklenemedi: ${url} (${res.status})`);
	}
	return res.json();
}
