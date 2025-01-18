import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

export default function Header() {
  const currentUser = useSelector(state=>state.user.currentUser)
  
  
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex">
            <span className="text-green-400">Akash</span>
            <span className="text-blue-500">Estates</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search...."
          />
          <FaSearch />
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
          {currentUser ? <img className="rounded-full w-10 h-10" src={currentUser.photo}/> : <li className="sm:inline hover:underline hover:cursor-pointer">
              Sign In
            </li> }
          
            
          </Link>
        </ul>
      </div>
    </header>
  );
}
