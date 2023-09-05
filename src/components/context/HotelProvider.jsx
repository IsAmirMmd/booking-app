import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurr, setIsLoadingCurr] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurr(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/hotels/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoadingCurr(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{ hotels, isLoading, getHotel, currentHotel, isLoadingCurr }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;

export function useHotels() {
  return useContext(HotelContext);
}
