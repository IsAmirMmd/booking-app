import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";

const BookMarkList = () => {
  const { bookmarks, currentBookmark } = useBookmark();
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookMarkList;
