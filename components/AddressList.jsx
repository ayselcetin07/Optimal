// Gerekli React ve React Native bileşenlerini içe aktar
import React, { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AddressItem from "./AdressItem";

// Konum verilerini yöneten context'i içe aktar
import { LocationContext } from "../context/LocationContext";

// Adres listesini gösteren bileşen
const AddressList = () => {
  // Context'ten adres verilerini ve yüklenme durumunu al
  const { addresses, loading, removeAddress } = useContext(LocationContext);

  // Adres verisinin dizi olup olmadığını kontrol et, değilse boş dizi kullan
  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  // Veriler yükleniyorsa kullanıcıya bilgi göster
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-base text-center">Adresler yükleniyor...</Text>
      </View>
    );
  }

  // Adres listesi yüklendiyse FlatList ile göster
  return (
    <View className="flex-1 p-4">
      <FlatList
        data={safeAddresses} // Gösterilecek adres verisi
        keyExtractor={(item) => item.id.toString()} // Her öğe için benzersiz anahtar
        renderItem={({ item }) => (
          <AddressItem address={item} onDelete={removeAddress} />
        )}
        // Liste boşsa kullanıcıya bilgi göster
        ListEmptyComponent={
          <Text className="text-center mt-10 text-gray-500">
            Henüz adres eklenmedi.
          </Text>
        }
        // Liste boşsa içeriği ortalamak için stil uygula
        contentContainerStyle={
          safeAddresses.length === 0 && {
            flexGrow: 1,
            justifyContent: "center",
          }
        }
      />
    </View>
  );
};

// Bileşeni dışa aktar
export default AddressList;
