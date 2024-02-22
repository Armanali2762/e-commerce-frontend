import React, { createContext, useContext, useState } from 'react';

// Create a context for global state
const GlobalContext = createContext();

// Global provider component
export const GlobalProvider = ({ children }) => {
  const [globalCategory, setGlobalCategory] = useState([]);
  const [globalProduct, setGlobalProduct] = useState(null);
  const [globalAddProduct, setGlobalAddProduct] = useState(false);
  const [globalConfirmProduct, setGlobalConfirmProduct] = useState(false);
  const [gSelectColor, setGSelectColor] = useState(null);
  const [gBridge, setGBridge] = useState(null);
  const [gQty, setGQty] = useState(null);
  const [gValue, setGValue] = useState(null);
  const [gPurchaseHistory, setGPurchaseHistory] = useState(false);
  // Method to update global category state
  const updateGlobalCategory = (value) => {
    setGlobalCategory(value);
  };

  // Return the provider with the global state and methods
  return (
    <GlobalContext.Provider value={{
      gPurchaseHistory,
      setGPurchaseHistory,
      setGValue,
      gValue,
      gQty,
      setGQty,
      globalCategory,
      setGlobalCategory,
      globalProduct,
      setGlobalProduct,
      globalAddProduct,
      setGlobalAddProduct,
      globalConfirmProduct,
      setGlobalConfirmProduct,
      gSelectColor,
      setGSelectColor,
      gBridge,
      setGBridge
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access global state and methods
export const useGlobals = () => {
  return useContext(GlobalContext);
};
