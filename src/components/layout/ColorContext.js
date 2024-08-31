import React, {createContext, useState } from "react";

const ColorContext = createContext();
const ColorProvider = ({ children }) => {
  // const [color, setColor] = useState('#DFB6B2');
  const [color, setColor] = useState('#93A0C6');

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };