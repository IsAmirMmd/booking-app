import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider value={{ hotels, isLoading }}>
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
