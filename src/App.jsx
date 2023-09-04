import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import Hotels from "./components/hotels/Hotels";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
