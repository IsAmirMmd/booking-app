import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

const BookMark = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map locations={[]} />
    </div>
  );
};

export default BookMark;
