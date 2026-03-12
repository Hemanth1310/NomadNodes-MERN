import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageUp, MapPinned, Settings } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:w-24  p-3 md:pt-10 h-24 md:min-h-screen absolute left-0 top-0 bg-gray-200 flex md:flex-col items-center gap-10 z-10 ">
      <MapPinned className="p-3 rounded-2xl hover:bg-mist-100" size={58} color="#ff6a00" onClick={() => navigate("/")} />
      <ImageUp className="p-3 rounded-2xl hover:bg-mist-100" size={58} color="#353131" onClick={() => navigate("/upload")} />
      <Settings className="p-3 rounded-2xl hover:bg-mist-100" size={58} color="#353131" onClick={() => navigate("/settings")}/>
    </div>
  );
};

export default Sidebar;
