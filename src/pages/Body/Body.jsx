import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { SingIn } from "../SignIn/SingIn";
import { Profile } from "../Profile/Profile";
import CreateListCounter from "../CreateListCounter/CreateListCounter";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singin" element={<SingIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createList" element={<CreateListCounter />} />
    </Routes>
  );
};
