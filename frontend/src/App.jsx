import React, { useContext , useEffect} from "react";
import { Route, Routes } from "react-router-dom";

import PublicLayout from "./components/landingPage/PublicLayout";
import HeroSection from "./components/landingPage/HeroSection";
import Login from "./components/Authentication/Login/Login";
import Register from "./components/Authentication/Signup/Register";
import Otp from "./components/Authentication/Signup/Otp";
import UserLayout from "./components/Users/UserLayout";
import UserDashboard from "./components/Users/User dashboard/UserDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/Dashboard/AdminDashboard";
import AppLoading from "./components/loaders/AppLoading";
import { userContext } from "./context/UserContext";
import ProtectedRoute from "./components/Users/UserProtectedRoute";
import UserProtectedRoute from "./components/Users/UserProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import PublicRoute from "./components/landingPage/PublicRoute";
import CreateEvent from "./components/admin/Events/create events/CreateEvent";
import MyEvents from "./components/admin/Events/show events/MyEvents";
import RegisteredUser from "./components/admin/Events/registered users/RegisteredUser";
import Volunteers from "./components/admin/Events/volunteers/Volunteers";
import { ToastContainer } from "react-toastify";
import AddVolunteeers from "./components/admin/Events/volunteers/AddVolunteeers";
import SeeVolunteers from "./components/admin/Events/volunteers/SeeVolunteers";
import JoinAsVolunteer from "./components/Users/JoinAsVolunteer";
import EventDetails from "./components/admin/Events/details event/EventDetails";
import CommonRoute from "./components/Volunteer scanner page/CommonRoute";
import Profile from "./components/Profile/Profile";
import Events from "./components/Users/User Events/Events";
import UserEventDetails from "./components/Users/Event details/UserEventDetails";
import RegisteredEvents from "./components/Users/Registered Events/RegisteredEvents";
import UserVolunteerPage from "./components/Users/user Volunteers/UserVolunteerPage";
import NotFoundRoute from "./components/Users/NotFoundRoute";
import UserProfile from "./components/Users/Profile/UserProfile";
import ViewAllRegisteredUser from "./components/admin/Dashboard/all registered User/ViewAllRegisteredUser";
import AppSkeleton from "./components/loaders/SkeltonAppLoading";
import LandingPage from "./components/landingPage/LandingPage";
import EnterDetailsForForget from "./components/Authentication/ForgetPassword/EnterDetailsForForget";
import EnterOtpForForget from "./components/Authentication/ForgetPassword/EnterOtpForForget";
import CreateNewPassword from "./components/Authentication/ForgetPassword/CreateNewPassword";

const App = () => {
  const { loading, user, isUserVolunteer, isVolunteer } =
    useContext(userContext);

  useEffect(() => {
    if (user?.role === "user") {
      isUserVolunteer();
    }
  }, [user]);

  return loading ? (
    <AppSkeleton />
  ) : (
    <>
      {
        <Routes>
          {/* public routes */}
          <Route
            path="/"
            element={
              <PublicRoute user={user}>
                <PublicLayout />
              </PublicRoute>
            }
          >
            <Route index element={<LandingPage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Otp />} />
            <Route path="/forget/password/request" element={<EnterDetailsForForget/>} />
            <Route path="/forget/password/verfiy" element={<EnterOtpForForget/>} />
            <Route path="/forget/password" element={<CreateNewPassword/>} />
          </Route>

          {/* user routes */}
          <Route
            path="/user"
            element={
              <UserProtectedRoute user={user}>
                <UserLayout />
              </UserProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="event/detail/:id" element={<UserEventDetails />} />
            <Route path="registered/events" element={<RegisteredEvents />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="volunteer" element={<UserVolunteerPage />} />

            <Route path="join/:event/:token" element={<JoinAsVolunteer />} />
            <Route path="scan/qr/" element={<CommonRoute />}></Route>
            <Route path="*" element={<NotFoundRoute />}></Route>
          </Route>

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute user={user}>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="create/event" element={<CreateEvent />} />
            <Route path="my/event" element={<MyEvents />} />
            <Route path="registered/users/:id" element={<RegisteredUser />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="add/volunteers/:id" element={<AddVolunteeers />} />
            <Route path="see/volunteers/:id" element={<SeeVolunteers />} />
            <Route path="view/event/details/:id" element={<EventDetails />} />
            <Route path="view/all/registered/users" element={<ViewAllRegisteredUser />} />
            <Route path="profile" element={<Profile />}></Route>
            <Route path="*" element={<NotFoundRoute/>} />
          </Route>
          {/* common routes */}


          <Route path="*" element={<NotFoundRoute/>} />
        </Routes>
      }

      {/* tost container to show tosts */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="light"
        toastStyle={{
          width: "300px",
          minHeight: "auto",
          fontSize: "14px",
        }}
      />
    </>
  );
};

export default App;
