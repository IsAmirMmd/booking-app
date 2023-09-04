import { useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

function Header() {
  const [destination, setDestination] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

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
          <div id="optionDropDown" onClick={() => setShowOption(!showOption)}>
            1 adult &bull; 2 children &bull; 1 room
          </div>
          {showOption && <GuestOption options={options} />}
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

function GuestOption({ options }) {
  return (
    <div className="guestOptions">
      <OptionItem />
      <OptionItem />
      <OptionItem />
    </div>
  );
}

function OptionItem() {
  return (
    <div className="guestOptionItem">
      <span className="optionText">Adult</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">1</span>
        <button className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
