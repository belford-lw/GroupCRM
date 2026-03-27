import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Groups,
  Login,
  Managers,
  Rooms,
  Students,
  Teachers,
} from "../index.ts";
import SiteBar from "./components/shared/SideBar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={<SiteBar />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/student" element={<Students />} />
        <Route path="/admin/teacher" element={<Teachers />} />
        <Route path="/admin/group" element={<Groups />} />
        <Route path="/admin/room" element={<Rooms />} />
        <Route path="/admin/manager" element={<Managers />} />
      </Route>
    </Routes>
  );
}

export default App;
 