import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBookmark } from "../context/BookmarkProvider";
const SingleBookmark = () => {
  const { id } = useParams();

  const { getBookmark, isLoadingCurr, currentBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoadingCurr) return <p>loading...</p>;

  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        &larr; back
      </button>
      <div className="">
        <h2>{currentBookmark.cityName}</h2>
        <div>{currentBookmark.country}</div>
      </div>
    </div>
  );
};

export default SingleBookmark;
