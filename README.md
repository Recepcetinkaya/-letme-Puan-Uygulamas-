# İşletme Puan Uygulaması
Bu proje, kullanıcıların işletmeleri arayabileceği, puanlarını görüntüleyebileceği ve filtreleyebileceği bir mobil uygulamadır. Uygulamayı açtığınızda, ana ekranda en popüler ve yüksek puanlı işletmeleri görebilirsiniz. Uygulama, kullanıcıların kendilerine en yakın olan işletmeleri görebilmelerini sağlar. Arama sonuçlarını daraltmak için filtreleme seçeneklerini kullanabilirsiniz. Filtreler arasında işletme türü, puan aralığı ve mesafe  kriterleri bulunur. Aynı zamanda işletmeye tıklandığında bulunduğu konumdan işletmeye rota oluşturur.   Her işletmenin detay sayfasında üzerinden alınan puanları  görebilirsiniz.

## Özellikler
- Kullanıcının mevcut konumunu harita üzerinde gösterir.
- Yakınlardaki popüler işletmeleri harita üzerinde işaretler.
- Bu popüler işletmelerin adını,adresini ,işletmenin resmini ve google maps puanını gösterir.
- İşletmeleri filtreleyerek veya doğrudan aratarak bulabilir.
- Google Maps Directions API kullanarak rota oluşturur ve harita üzerinde gösterir.

## Kullanım

 - Uygulamayı açın ve konum izni verin.
 - Harita üzerinde, yakınınızdaki popüler yerler işaretlenmiş olarak görünecektir.
 - Bir işaretçiye dokunun, seçilen yer hakkında bilgi ve varış süreleri görünecektir.
## Kurulum
Bu uygulamayı yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js ve npm yüklü olmalıdır.
- Expo CLI yüklü olmalıdır.
- `react-native-maps` kütüphanesi ve Google Maps API anahtarı gereklidir.

### Adımlar
1. Bu repository'i klonlayın:
   ```sh
   git clone https://github.com/Recepcetinkaya/Isletme-Puan-Uygulamasi
   
