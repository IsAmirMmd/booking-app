import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurr, setIsLoadingCurr] = useState(false);
  const { data: bookmarks, isLoading } = useFetch(
    "http://localhost:5000/bookmarks"
  );
  async function getBookmark(id) {
    setIsLoadingCurr(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoadingCurr(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        isLoadingCurr,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
