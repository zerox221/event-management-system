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
  const [summary, setSummary] = useState(null);
  const [data, setData] = useState(null);
  const [topPerformingEvents, setTopPerformingEvents] = useState(null);
  const [forgetPasswordEmail,setForgetPasswordEmail] = useState(false);
  const [featuredEvents,setFeaturedEvents] = useState([]);

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

    async function fetchFetauredEvents() {
    try {
      const response = await api.get(`/api/v1/user/get/latest/events`);
      setFeaturedEvents(response.data.events);
    } catch (error) {
      console.log(error.response.data.message);
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

  const EventsSummary = [];

  async function fetchDashboardSummary() {
    try {
      const response = await api.get("/api/v1/admin/get/dashboard/summary");
      setSummary(response.data.dashboardSummary);
      setData(response?.data?.eventsRegistration);
      setTopPerformingEvents(response?.data?.topPerformingEvents);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    if (user?.role === "organizer") {
       console.log("calling summary event");
      fetchDashboardSummary();
    }
  }, [user]);

    useEffect(()=>{
    if(user?.role==="user"){
      fetchFetauredEvents();
    }
  },[user])

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
    EventsSummary,
    topPerformingEvents,
    summary,
    data,
    forgetPasswordEmail,
    setForgetPasswordEmail,
    featuredEvents,
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
