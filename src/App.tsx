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
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner.tsx";

function App() {
  const [coming, setComing] = useState(false);

  if (coming == true) {
    toast.success("Adminga muvaffaqqiyatli kirildi?");
  }
  return (
    <>
    {/* //asdf/asdfasdf. */}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "15px 18px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login setComing={setComing} />} />

        <Route path="/admin" element={<SiteBar />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/student" element={<Students />} />
          <Route path="/admin/teacher" element={<Teachers />} />
          <Route path="/admin/group" element={<Groups />} />
          <Route path="/admin/room" element={<Rooms />} />
          <Route path="/admin/manager" element={<Managers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
