import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSubmitSearchTerm(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex">
            <span className="text-green-400">Akash</span>
            <span className="text-blue-500">Estates</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmitSearchTerm}
          className="bg-slate-100 p-3 rounded-lg flex items-center "
        >
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search...."
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <ul className="flex gap-5 items-center">
          <Link to="/">
            <li className="hidden sm:inline hover:underline hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline hover:cursor-pointer">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img className="rounded-full w-10 h-10" src={currentUser.photo} />
            ) : (
              <li className="sm:inline hover:underline hover:cursor-pointer">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
