import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LocationContext } from "../context/LocationContext";

const AddressItem = ({ address }) => {
  const { removeAddress, updateAddress } = useContext(LocationContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(address.name);
  const [details, setDetails] = useState(address.details);

  const handleSave = async () => {
    await updateAddress(address.id, name, details);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(address.name);
    setDetails(address.details);
    setIsEditing(false);
  };

  return (
    <View className="py-2 border-b border-gray-300">
      {isEditing ? (
        <>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border px-2 py-1 rounded mb-2 text-base"
            placeholder="Adres adı"
          />
          <TextInput
            value={details}
            onChangeText={setDetails}
            className="border px-2 py-1 rounded mb-2 text-sm"
            placeholder="Adres detayı"
          />
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-green-600 w-24 h-8 rounded-xl justify-center items-center"
              onPress={handleSave}
            >
              <Text className="text-white font-semibold text-center">
                Kaydet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-400 w-24 h-8 rounded-xl justify-center items-center"
              onPress={handleCancel}
            >
              <Text className="text-white font-semibold text-center">
                İptal
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text className="text-base font-semibold">{address.name}</Text>
          <Text className="text-sm text-gray-600">{address.details}</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-red-500 w-24 h-8 rounded-xl justify-center items-center mt-2"
              onPress={() => removeAddress(address.id)}
            >
              <Text className="text-white font-semibold text-center">
                Adresi Sil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-amber-400 w-24 h-8 rounded-xl justify-center items-center mt-2"
              onPress={() => setIsEditing(true)}
            >
              <Text className="text-white font-semibold text-center">
                Düzenle
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default AddressItem;
