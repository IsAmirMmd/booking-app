/* eslint-disable no-fallthrough */
import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: "",
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "REJECT":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown Action");
  }
}

const BookmarkProvider = ({ children }) => {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function getBookmarks() {
      dispatch({ type: "LOADING" });
      try {
        const { data } = await axios.get(`http://localhost:5000/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "REJECT", payload: "an Error ..." });
        toast.error(error.message);
      }
    }
    getBookmarks();
  }, []);

  async function getBookmark(id) {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "REJECT", payload: "an Error ..." });
      toast.error(error.message);
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/bookmarks",
        newBookmark
      );
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      dispatch({ type: "REJECT", payload: "an Error ..." });
      toast.error(error.message);
    }
  }
  async function removeBookmark(bookmarkId) {
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`http://localhost:5000/bookmarks/${bookmarkId}`);
      dispatch({ type: "bookmark/deleted", payload: bookmarkId });
    } catch (error) {
      dispatch({ type: "REJECT", payload: "an Error ..." });
      toast.error(error.message);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currentBookmark,
        createBookmark,
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
