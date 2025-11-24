import { createContext } from "react";

export type Units = "metric" | "imperial";

export interface UnitsContextType {
  units: Units;
  setUnits: (units: Units) => void;
}

export const UnitsContext = createContext<UnitsContextType>({
  units: "metric",
  setUnits: () => {},
});
