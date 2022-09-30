import { CalendarBlank, Clock, ClockCounterClockwise, NotePencil } from "phosphor-react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import useUser from "../hooks/useUser";
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    setInterval(() => setDateTime(new Date()), 30000);
  }, [user]);
  return (
    <>
      <div className="welcome-grid-container">
        <div className="welcome-main-box"
        >
          <div className="flex-date-time">
            <CalendarBlank alt="Calender icon" color={"#805ad5"} size={24} />{"  "}
            <div className="intro-text-light">
              {dateTime.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>{"  "}

            <Clock alt="clock icon" color={"#805ad5"} size={24} />{"  "}
            
            <div className="intro-text-light">
              {dateTime.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
          </div>

          <div className="intro-text">
            Welcome {user.user_metadata?.name}, how are you feeling ?
          </div>
          <div>
            <div className="lottie-container">
              <img src="./checkin.svg" alt="" className="hero-image" />
            </div>
            <div className="welcome-button-container">
              <button
                className="normal-button"
                aria-label="Make a cbt entry"
                onClick={() => navigate(appRoutes.cbtForm)}
              >
                <NotePencil size={16} />
               New entry
              </button>
              <button
                className="normal-button"
                aria-label="Make a cbt entry"
                onClick={() => navigate(appRoutes.historicalSubmites)}
              >
                <ClockCounterClockwise size={16} />
                View histroy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
