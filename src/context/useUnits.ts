import { useContext } from "react";
import { UnitsContext } from "./UnitsContext";

export function useUnits() {
  return useContext(UnitsContext);
}
