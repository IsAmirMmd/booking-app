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
import BookmarkProvider from "./components/context/BookmarkProvider";
import BookMarkList from "./components/BookmarkList/BookmarkList";
import SingleBookmark from "./components/singleBookmark/singleBookmark";
import AddNewBookmark from "./components/addNewBookmark/addNewBookmark";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/login/login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotelView />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookMark />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookMarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
