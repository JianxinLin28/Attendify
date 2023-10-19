import { Link } from "react-router-dom";
import AttendifyHeader from "../constants/AttendifyHeader.png";

const Header = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="w-max-width h-auto"
          src={AttendifyHeader}
          style={{ maxWidth: "250px" }}
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
