import { Link } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {!isLoggedIn ? (
            <Link
              to="/sign-in"
              className="flex bg-white items-center border-2 rounded text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign in
            </Link>
          ) : (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-white border-2 rounded px-3 font-bold hover:bg-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center text-white border-2 rounded px-3 font-bold hover:bg-blue-600"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
