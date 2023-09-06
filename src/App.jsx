import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import Hotels from "./components/hotels/Hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotelView from "./components/singleHotel/singleHotel";
import BookMark from "./components/bookmark/Bookmark";

function App() {
  return (
    <HotelProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotelView />} />
        </Route>
        <Route path="/bookmark" element={<BookMark />} />
      </Routes>
    </HotelProvider>
  );
}

export default App;
