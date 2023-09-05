import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelProvider";
import { useEffect } from "react";
const SingleHotelView = () => {
  const { id } = useParams();

  const { getHotel, isLoadingCurr, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurr) return <p>loading...</p>;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
};

export default SingleHotelView;
