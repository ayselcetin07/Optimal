// Axios kütüphanesini ve Google API anahtarını içe aktar
import axios from "axios";
import { GOOGLE_API_KEY } from "../config/config";

// Adres bilgisinden koordinat (latitude, longitude) elde eden fonksiyon
export const getCoordinatesFromAddress = async (address) => {
  try {
    // Google Geocoding API'ye HTTP GET isteği gönder
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address, // Kullanıcının girdiği adres
          key: GOOGLE_API_KEY, // API erişim anahtarı
        },
      }
    );

    // API'den gelen ilk sonucu al
    const result = response.data.results[0];
    if (!result) return null; // Sonuç yoksa null döndür

    // Koordinatları ayıkla
    const { lat, lng } = result.geometry.location;

    // React Native Maps için uygun formatta döndür
    return {
      latitude: lat,
      longitude: lng,
    };
  } catch (error) {
    // Hata durumunda konsola yaz ve null döndür
    console.error("Geocoding hatası:", error);
    return null;
  }
};
