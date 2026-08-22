import React, { useContext, useState } from "react";
import { userContext } from "../../../context/UserContext";
import VolunteerEventsDetails from "./VolunteerEventsDetails";
import NotVolunteer from "./NotVolunteer";
import EmptyEvents from "./EmptyEvents";
import { useParams, useSearchParams } from "react-router-dom";

const UserVolunteerPage = () => {
  const { isVolunteer } = useContext(userContext);
  const [query] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(
    query.get("filter") || "upcoming",
  );
  const filters = ["upcoming", "live", "completed"];

  const currentTime = Date.now();

  const liveEvents = isVolunteer?.filter((event) => {
    const eventDate = new Date(event?.event?.eventDate);
    const eventStartTime = eventDate.getTime();
    const eventEndTime =
      eventStartTime + event?.event?.duration * 60 * 60 * 1000;
    return currentTime >= eventStartTime && currentTime <= eventEndTime;
  });

  const upcomingEvents = isVolunteer?.filter((event) => {
    const eventDate = new Date(event?.event?.eventDate);
    const eventStartTime = eventDate.getTime();
    const eventEndTime =
      eventStartTime + event?.event?.duration * 60 * 60 * 1000;
    return currentTime < eventStartTime;
  });

  const completedEvents = isVolunteer?.filter((event) => {
    const eventDate = new Date(event?.event?.eventDate);
    const eventStartTime = eventDate.getTime();
    const eventEndTime =
      eventStartTime + event?.event?.duration * 60 * 60 * 1000;
    return currentTime > eventEndTime;
  });

  return (
    <div className="min-h-screen flex flex-col gap-6 w-full p-4 md:p-7">
      <div>
        <h1 className="md:text-xl font-semibold md:font-medium">
          Events for which you are Volunteer
        </h1>
      </div>
      {isVolunteer && (
        <div>
          <select
            value={selectedFilter}
            className="p-2 px-4 select-none cursor-pointer rounded-2xl outline-none border border-gray-300"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {filters.map((filter, idx) => {
              return <option key={idx}>{filter}</option>;
            })}
          </select>
        </div>
      )}

      <div className="flex flex-col  gap-5 flex-wrap">
        {/* if their is empty array in isVolunteer then it shoudl return a error component like you arnot volunteer for any event  */}
        {isVolunteer === null ? (
          <NotVolunteer />
        ) : // if user is volunteer thn the event for which user is volunteer they will appear
        selectedFilter === "completed" ? (
          completedEvents?.length !== 0 ? (
            completedEvents?.map((event) => {
              return (
                <VolunteerEventsDetails
                  key={event._id}
                  type={"completed"}
                  event={event.event}
                />
              );
            })
          ) : (
            <EmptyEvents type={"completed"} />
          )
        ) : null}
        {selectedFilter === "upcoming" ? (
          upcomingEvents?.length !== 0 ? (
            upcomingEvents?.map((event) => {
              return (
                <VolunteerEventsDetails
                  key={event._id}
                  type={"upcoming"}
                  event={event.event}
                />
              );
            })
          ) : (
            <EmptyEvents type={"upcoming"} />
          )
        ) : null}
        {selectedFilter === "live" ? (
          liveEvents?.length !== 0 ? (
            liveEvents?.map((event) => {
              return (
                <VolunteerEventsDetails
                  key={event._id}
                  type={"live"}
                  event={event.event}
                />
              );
            })
          ) : (
            <EmptyEvents type={"live"} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default UserVolunteerPage;
