import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import AddressItem from "./AddressItem";
import { LocationContext } from "../context/LocationContext";

const AddressList = () => {
  const { addresses, loading } = useContext(LocationContext);

  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-base text-center">Adresler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={safeAddresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AddressItem address={item} />}
        ListEmptyComponent={
          <Text className="text-center mt-10 text-gray-500">
            Henüz adres eklenmedi.
          </Text>
        }
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

export default AddressList;
