import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, NavLink } from "react-router-dom";
import logo from "../../public/logo.svg";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-r from-[#FF7854] to-[#FF5079] px-5 py-7 md:px-12 lg:px-20 ">
      <div className="navbar p-0">
        <div className="flex gap-6 flex-1  lg:flex-none lg:justify-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost pl-0 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 font-semibold "
                    : "text-base font-medium"
                }
              >
                Home
              </NavLink>
              {user && (
                <NavLink
                  to="/addbooks"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-400 font-semibold text-base"
                      : "font-medium text-base"
                  }
                >
                  Add Books
                </NavLink>
              )}
              {user && (
                <NavLink
                  to="/allbooks"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-400 font-semibold text-base"
                      : "font-medium text-base"
                  }
                >
                  All Books
                </NavLink>
              )}
              {user && (
                <NavLink
                  to="/borrowed-books"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-400 font-semibold text-base"
                      : "font-medium text-base"
                  }
                >
                  Borrowed Books
                </NavLink>
              )}
            </ul>
          </div>
          <img src={logo} alt="logo" />
        </div>
        <div className=" hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
          <ul className="flex items-center justify-center flex-1 gap-4 text-base menu menu-horizontal px-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-base font-medium"
              }
            >
              Home
            </NavLink>
            {user && (
              <NavLink
                to="/addbooks"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold text-base"
                    : "font-medium text-base"
                }
              >
                Add Books
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/allbooks"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold text-base"
                    : "font-medium text-base"
                }
              >
                All Books
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/borrowed-books"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold text-base"
                    : "font-medium text-base"
                }
              >
                Borrowed Books
              </NavLink>
            )}
          </ul>
        </div>
        {user ? (
          <div className="hidden md:flex lg:flex gap-3 items-center">
            <div className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <p className="text-white">{user?.displayName}</p>
            <i
              onClick={logout}
              className="fa-solid fa-right-from-bracket text-2xl cursor-pointer"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
        ) : (
          <Link
            className='"btn bg-[#17a288] px-5 py-2 rounded-lg text-white font-semibold'
            to="/login"
          >
            Login
          </Link>
        )}
        <div className="dropdown dropdown-end md:hidden lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt=""
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
              {user?.displayName}
              </a>
            </li>
            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
