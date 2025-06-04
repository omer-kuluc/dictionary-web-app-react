# - Dictionary Web App – React

Kelimelerin anlamını, telaffuzunu ve örnek cümlelerini kolayca öğrenmeye yarayan modern sözlük uygulaması.  
Temiz arayüzü ve karanlık/aydınlık tema desteğiyle kullanıcıya konforlu bir deneyim sunar.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)

## - Canlı Demo

👉 [https://dictionary-web-app-react-omega.vercel.app/](https://dictionary-web-app-react-omega.vercel.app/)

---

## - Proje Özeti

**Dictionary Web App**, bir kelime yazıldığında anlamı, telaffuzu, eş anlamlıları ve örnek kullanımları gibi detaylı verileri kullanıcıya sunan bir sözlük uygulamasıdır.  
Veriler API üzerinden dinamik olarak çekilir ve sade bir arayüzle gösterilir.

---

## - Özellikler

### - Arama Fonksiyonu

- Sayfanın üst kısmındaki giriş alanına yazılan kelimeler anlık olarak işlenir.
- Geçerli bir kelime bulunamazsa hata mesajı görünür.
  
![image](https://github.com/user-attachments/assets/91b6ce41-ab64-4b1f-81ad-9272040a7edc)


### - Telaffuz Sesleri

- Varsa kelimenin telaffuzu ses ikonuna tıklanarak dinlenebilir.
- Ses çalma özelliğiyle öğrenmeyi destekler.
  
![image](https://github.com/user-attachments/assets/65a39058-c862-4c04-92b8-a7c1e9b222f6)



### - Anlam & Kullanım

- Kelimenin türü (isim, fiil vb.) ve tanımı listelenir.
- Tanımın altında örnek bir cümle yer alır.

![image](https://github.com/user-attachments/assets/990defd8-2bc8-49c4-9b50-0fc21d723605)


### - Eş Anlamlılar

- "Synonyms" başlığı altında ilgili kelimenin eş anlamlıları listelenir.
- Tıklanabilir şekilde sunularak yeni arama yapılabilir.

![image](https://github.com/user-attachments/assets/83f3404d-0bbe-4728-bb59-fd133b8a7558)


### - Tema Değiştirme (Dark / Light)

- Sağ üstteki anahtarla karanlık ve aydınlık tema arasında geçiş yapılabilir.
- Tema tercihi `localStorage` ile korunur.

![image](https://github.com/user-attachments/assets/d46aab14-438d-4ac4-8350-45b9a3634916)


### - Font Seçimi

- Açılır menüyle farklı font türleri (örneğin Sans Serif, Serif) seçilebilir.
- Uygulamanın genel görünümüne etki eder.

![image](https://github.com/user-attachments/assets/e5b58f7e-242e-420d-931c-5efb6c5de493)


### - Duyarlı Tasarım

- Mobil, tablet ve masaüstü cihazlarda tutarlı görünüm sağlar.

---

## - Kullanılan Teknolojiler

- React  
- JavaScript (ES6+)  
- CSS3  
- localStorage  
- [Free Dictionary API](https://dictionaryapi.dev)

---

## - Kurulum ve Çalıştırma

### 1. Depoyu Klonla

```bash
git clone https://github.com/omer-kuluc/dictionary-web-app-react.git
```

### 2. Dizin Değiştir

```bash
cd dictionary-web-app-react
```

### 3. Gerekli Paketleri Kur

```bash
npm install
```

### 4. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:5173](http://localhost:5173) adresinde çalışacaktır.

---

## - Hedefler

- Hızlı ve doğru kelime arama  
- Telaffuz desteği  
- Tema ve yazı tipi özelleştirmesi  
- Eş anlamlılarla keşfetmeye teşvik  

---

> Bu uygulama, sözlük alışkanlıklarını daha modern ve etkileşimli hale getirmek amacıyla geliştirilmiştir. Geliştirici katkılarına açıktır!
