import { View, Text, TouchableOpacity } from "react-native";

const AddressItem = ({ address, onDelete }) => {
  return (
    <View className="py-2 border-b border-gray-300">
      <Text className="text-base font-semibold">{address.name}</Text>
      <Text className="text-sm text-gray-600">{address.details}</Text>
      <TouchableOpacity
        className="bg-red-500 w-24 h-8 rounded-xl justify-center items-center mt-2"
        onPress={() => onDelete(address.id)}
      >
        <Text className="text-white font-semibold text-center">Adresi Sil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressItem;
