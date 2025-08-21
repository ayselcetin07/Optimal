import "./global.css";
import { SafeAreaView, View } from "react-native";
import { LocationProvider } from "./context/LocationContext";
import AddressInput from "./components/AddressInput";
import AddressList from "./components/AddressList";
import MapViewScreen from "./screens/MapViewScreen";

const App = () => {
  return (
    <LocationProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <AddressInput />
          <AddressList />
        </View>
        <View style={{ height: 300, paddingHorizontal: 16 }}>
          <MapViewScreen />
        </View>
      </SafeAreaView>
    </LocationProvider>
  );
};

export default App;
