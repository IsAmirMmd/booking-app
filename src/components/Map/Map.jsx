import { useHotels } from "../context/HotelProvider";

const Map = () => {
  const { isLoading, hotels } = useHotels();

  return <div className="mapContainer">map</div>;
};

export default Map;
