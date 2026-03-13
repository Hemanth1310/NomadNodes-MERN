import { useNavigate } from "react-router-dom";
import { ImageUp, MapPinned, Settings } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="group w-22 hover:w-52 p-3 min-h-screen left-0 top-0 border-r border-r-mist-300 bg-mist-50 flex flex-col items-start gap-10 z-10 fixed transition-[width] duration-150 ease-in-out">
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <MapPinned
          className="shrink-0"
          size={40}
          color="#ff6a00"
          onClick={() => navigate("/")}
        />
        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          NomadNodes
        </p>
      </span>
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <ImageUp
          className="shrink-0"
          size={40}
          color="#353131"
          onClick={() => navigate("/")}
        />
        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Upload
        </p>
      </span>
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <Settings
          className="shrink-0"
          size={40}
          color="#353131"
          onClick={() => navigate("/")}
        />
        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Settings
        </p>
      </span>
    </div>
  );
};

export default Sidebar;
