import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { SingIn } from "../SignIn/SingIn";
import { Profile } from "../Profile/Profile";
import CreateListCounter from "../CreateListCounter/CreateListCounter";
import Gods from "../Gods/Gods";
import GodDetails from "../GodDetails/GodDetails";
import GodAddAdmin from "../GodAddAdmin/GodAddAdmin";
import ListGodsAdmin from "../ListGodsAdmin/ListGodsAdmin";
import GodEditAdmin from "../GodEditAdmin/GodEditAdmin";
import ListCountersWeb from "../ListCountersWeb/ListCountersWeb";
import ListUsersAdmin from "../ListUsersAdmin/ListUsersAdmin";
import UserEditAdmin from "../UserEditAdmin/UserEditAdmin";

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singin" element={<SingIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createList" element={<CreateListCounter />} />
      <Route path="/gods" element={<Gods />} />
      <Route path="/god/details" element={<GodDetails />} />
      <Route path="/addGod/" element={<GodAddAdmin />} />
      <Route path="/listGods/" element={<ListGodsAdmin />} />
      <Route path="/editGod/" element={<GodEditAdmin />} />
      <Route path="/counters/" element={<ListCountersWeb />} />
      <Route path="/getUsers/" element={<ListUsersAdmin />} />
      <Route path="/editUser/" element={<UserEditAdmin />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};
