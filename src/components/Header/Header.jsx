import { useRef, useState } from "react";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";

function Header() {
  const [destination, setDestination] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOperation = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

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
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {showOption && (
            <GuestOption
              setShowOption={setShowOption}
              handleOperation={handleOperation}
              options={options}
            />
          )}
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

function GuestOption({ options, handleOperation, setShowOption }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setShowOption(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOperation={handleOperation}
        type="adult"
        minLimit="1"
        options={options}
      />
      <OptionItem
        handleOperation={handleOperation}
        type="children"
        minLimit="0"
        options={options}
      />
      <OptionItem
        handleOperation={handleOperation}
        type="room"
        minLimit="1"
        options={options}
      />
    </div>
  );
}

function OptionItem({ type, minLimit, options, handleOperation }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOperation(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOperation(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
