// Gerekli React ve React Native bileşenlerini içe aktar
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Platform, StatusBar } from "react-native";

// Konum verilerini yöneten context'i içe aktar
import { LocationContext } from "../context/LocationContext";

// Adres giriş bileşeni
const AddressInput = () => {
  // Adres adı ve detayları için state tanımla
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  // Context'ten adres ekleme fonksiyonunu al
  const { addAddress } = useContext(LocationContext);

  // "Ekle" butonuna basıldığında adresi ekle ve alanları temizle
  const handleAdd = () => {
    if (name && details) {
      addAddress(name, details); // Yeni adresi context'e ekle
      setName(""); // Ad alanını sıfırla
      setDetails(""); // Detay alanını sıfırla
    }
  };

  // Android cihazlar için status bar yüksekliğini padding olarak ekle
  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  // Giriş alanları ve butonun yer aldığı arayüzü döndür
  return (
    <View style={{ paddingTop, paddingHorizontal: 16 }}>
      {/* Adres adı için metin girişi */}
      <TextInput
        placeholder="Adres adı"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 p-3 mb-3 rounded-md"
      />
      {/* Adres detayları için metin girişi */}
      <TextInput
        placeholder="Adres detayları"
        value={details}
        onChangeText={setDetails}
        className="border border-gray-300 p-3 mb-3 rounded-md"
      />
      {/* Adres ekleme butonu */}
      <Button title="Ekle" onPress={handleAdd} />
    </View>
  );
};

// Bileşeni dışa aktar
export default AddressInput;
