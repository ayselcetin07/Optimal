// components/AddressList.jsx
import React, { useContext } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { LocationContext } from "../context/LocationContext";

const AddressList = () => {
  const { addresses, loading } = useContext(LocationContext);

  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Konum alınıyor...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={safeAddresses}
      keyExtractor={(item, index) =>
        item?.id ? item.id.toString() : index.toString()
      }
      renderItem={({ item }) => (
        <View
          style={{
            padding: 12,
            borderBottomWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
            {item?.name ?? "İsimsiz adres"}
          </Text>
          {item?.details && (
            <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
              {item.details}
            </Text>
          )}
        </View>
      )}
      ListEmptyComponent={
        <View style={{ padding: 20 }}>
          <Text style={{ textAlign: "center", color: "#999" }}>
            Henüz adres bulunamadı.
          </Text>
        </View>
      }
    />
  );
};

export default AddressList;
