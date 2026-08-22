import axios from "axios";
import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [isVolunteer, setIsVolunteer] = useState([]);
  const [allEvents, setAllEvents] = useState(null);

  async function fetchEvents() {
    try {
      const response = await api.get("api/v1/admin/get/my/events");
      setEvents(response.data.events);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function isUserVolunteer() {
    try {
      const response = await api.get(`/api/v1/user/is/user/volunteer`);
      console.log("user is volunter ", response);
      setIsVolunteer(response.data.isVolunteer);
    } catch (error) {
      setIsVolunteer(null);
      console.log(error);
    }
  }

  async function fetchAllEvents() {
    try {
      const response = await api.get("/api/v1/user/view/all/Events");
      setAllEvents(response.data.allEvents);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUser() {
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/user/get/me`);
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const values = {
    user,
    setUser,
    email,
    setEmail,
    loading,
    setLoading,
    events,
    setEvents,
    fetchEvents,
    isVolunteer,
    setIsVolunteer,
    isUserVolunteer,
    setAllEvents,
    allEvents,
    fetchAllEvents,
    fetchUser,
  };

  useEffect(() => {
    if (user?.role === "organizer") {
      fetchEvents();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "user") {
      fetchAllEvents();
    }
  }, [user]);

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
}
