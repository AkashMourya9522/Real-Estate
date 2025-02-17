import React from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

export default function Listing({ listItem }) {
  return (
    <div className="hover:shadow-lg transition-shadow duration-500 overflow-hidden bg-white sm:w-[330px] w-full rounded-lg">
      <Link to={`/listing/${listItem._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full  rounded-lg object-cover hover:scale-105 transition-scale duration-300 "
          src={listItem.imageURLs[0]}
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <h1 className="truncate text-xl font-semibold "> {listItem.name} </h1>

          <div className="flex items-center gap-1 whitespace-nowrap">
            <IoLocationSharp className="text-green-500" />
            <span className="truncate">{listItem.address}</span>
          </div>

          <p className="truncate"> {listItem.description} </p>

          <span className="text-slate-700 font-bold text-lg">
            {listItem.type == "rent" ? (
              <p> ${listItem.regularPrice.toLocaleString("en-US")} /month </p>
            ) : (
              <p> ${listItem.regularPrice.toLocaleString("en-US")} Sale </p>
            )}
          </span>

          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <div> {listItem.beds} Bed/s </div>
            <div> {listItem.bathrooms} Bathroom/s </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
