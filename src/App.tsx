import "./App.scss";

import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  return (
    <>
      <Header />
      <h1 className="mainTitle text-preset-2">How’s the sky looking today?</h1>
      <SearchBar onSelectLocation={setSelectedLocation} />

      <main>
        {selectedLocation && (
          <p>
            Ciudad seleccionada: {selectedLocation.name},{" "}
            {selectedLocation.country}
          </p>
        )}
      </main>
    </>
  );
}

export default App;
