const sentence = 'Son yıllarda ülkemizde özellikle büyük şehirlerdeki konut kiralarında hızlı bir artış yaşanmaktadır. Bu durum, 5 Şubat 2023’te yaşanan felaketin ardından daha da belirgin hale gelmiş; pek çok vatandaşımız, güvenli bir barınma ihtiyacını karşılamak amacıyla farklı şehirlere yerleşmek zorunda kalmıştır. Başkent Ankara da bu şehirlerden biri olup, gerek göç hareketliliği gerekse artan talep nedeniyle kira fiyatlarında ciddi dalgalanmalar yaşamaktadır. Bu proje ile Ankara’da kiralama yapmak isteyen bireylere yol göstermek, ev sahiplerine fiyat belirlemede destek olmak ve kira piyasasında dengenin sağlanmasına katkı sunmak amacıyla makine öğrenimi tekniklerini kullanarak kapsamlı bir analiz ve tahmin modeli geliştirilmiştir.';

const typewriter = new Typewriter('#typewriter', {
  delay: 10,
  cursor: ''
});

typewriter
  .typeString(sentence).start();

