import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageUp, MapPinned, Settings } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 min-h-screen absolute left-0 top-0 bg-gray-200 flex flex-col items-center gap-10">
      <MapPinned size={36} color="#ff6a00" onClick={() => navigate("/")} />
      <ImageUp size={36} color="#353131" onClick={() => navigate("/upload")} />
      <Settings size={116} color="#ffffff" />
    </div>
  );
};

export default Sidebar;
