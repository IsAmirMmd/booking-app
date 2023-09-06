import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BookmarkProvider";

const BookMark = () => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locations={bookmarks} />
    </div>
  );
};

export default BookMark;
