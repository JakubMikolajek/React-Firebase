import React from "react";
import { Route, Routes } from "react-router-dom";

import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import AddRegistration from "./components/AddRegistration";
import RegistrationList from "./components/RegistrationList";
import UserList from "./components/AdminSiteComponent/UserList";
import NotFound from "./components/NotFound";
import UserProfile from "./components/AdminSiteComponent/UserProfile";
import UserRegistrations from "./components/AdminSiteComponent/UserRegistrations";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<HomeGuest />} />
          <Route path="/account" element={<Home />} />
          <Route path="/new-registration" element={<AddRegistration />} />
          <Route path="/your-registration" element={<RegistrationList />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user-list/:id" element={<UserProfile />} />
          <Route
            path="/user-list/:id/registrations"
            element={<UserRegistrations />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
