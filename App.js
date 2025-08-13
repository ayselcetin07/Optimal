//import "./global.css";
// App.js
import React from "react";
import { LocationProvider } from "./context/LocationContext";
import AddressList from "./components/AddressList";

export default function App() {
  return (
    <LocationProvider>
      <AddressList />
    </LocationProvider>
  );
}
