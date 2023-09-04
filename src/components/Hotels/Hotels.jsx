import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  if (isLoading) return <p>loading...</p>;

  return <div>hotels {data.length}</div>;
};

export default Hotels;
