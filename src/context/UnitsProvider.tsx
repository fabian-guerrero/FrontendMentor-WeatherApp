import { useState } from "react";
import { UnitsContext } from "./UnitsContext";
import type { Units } from "./UnitsContext";

interface Props {
  children: React.ReactNode;
}

export function UnitsProvider({ children }: Props) {
  const [units, setUnits] = useState<Units>("metric");

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
}
