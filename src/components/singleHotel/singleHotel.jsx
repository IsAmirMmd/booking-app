import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const SingleHotelView = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(
    `http://localhost:5000/hotels/${id}`,
    ""
  );
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} reviews &bull; {data.smart_location}
        </div>
        <img src={data.picture_url.url} alt={data.name} />
      </div>
    </div>
  );
};

export default SingleHotelView;
