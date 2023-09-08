import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

const BookMarkList = () => {
  const { bookmarks, currentBookmark, removeBookmark } = useBookmark();
  const handleDelete = (e, id) => {
    e.preventDefault();
    removeBookmark(id);
  };

  return (
    <div>
      <h2>Your bookmarks ({bookmarks.length})</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  currentBookmark?.id === item.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookMarkList;
