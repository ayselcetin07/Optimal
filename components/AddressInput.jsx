import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { LocationContext } from "../context/LocationContext";

const AddressInput = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const { addAddress } = useContext(LocationContext);

  const handleAdd = () => {
    if (name && details) {
      addAddress(name, details);
      setName("");
      setDetails("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Adres adı"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Adres detayları"
        value={details}
        onChangeText={setDetails}
        style={styles.input}
      />
      <Button title="Ekle" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});

export default AddressInput;
