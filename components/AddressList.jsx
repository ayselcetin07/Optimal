import React, { useContext } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { LocationContext } from "../context/LocationContext";

const AddressList = () => {
  const { addresses, loading } = useContext(LocationContext);

  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  if (loading) {
    return <Text style={styles.loading}>Adresler yükleniyor...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={safeAddresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Henüz adres eklenmedi.</Text>
        }
        contentContainerStyle={safeAddresses.length === 0 && styles.center}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default AddressList;
