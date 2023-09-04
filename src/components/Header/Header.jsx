import { useState } from "react";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

function Header() {
  const [destination, setDestination] = useState("");

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/4/9</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown">1 adult &bull; 2 children &bull; 1 room</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
