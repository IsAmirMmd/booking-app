import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurr, setIsLoadingCurr] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const { data, isLoading } = useFetch("http://localhost:5000/bookmarks");

  useEffect(() => {
    async function getBookmarks() {
      setIsLoadingCurr(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setIsLoadingCurr(false);
      }
    }
    getBookmarks();
  }, []);

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

  async function createBookmark(newBookmark) {
    setIsLoadingCurr(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/bookmarks",
        newBookmark
      );
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurr(false);
    }
  }
  async function removeBookmark(bookmarkId) {
    setIsLoadingCurr(true);
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${bookmarkId}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== bookmarkId));
    } catch (error) {
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
        createBookmark,
        setBookmarks,
        removeBookmark,
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
