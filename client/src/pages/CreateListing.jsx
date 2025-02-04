import React from "react";

export default function () {
  return (
    <div className="p-5 ">
      <h1 className="text-3xl font-bold text-center my-5">Create Listing</h1>
      <div className="max-w-lg gap-5 m-auto  lg:flex lg:bg-orange-500 lg:max-w-none ">
        <div className="m-auto flex flex-col  gap-5  p-3 ">
          <input
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Name"
            required
            maxLength={62}
            minLength={3}
          />
          <textarea
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Description"
          />
          <input
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Address"
          />
          <div className="flex gap-3 flex-wrap items-center ">
            <div className="flex items-center">
              <input className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Sell
              </label>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Rent
              </label>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Parking Spot
              </label>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Furnished
              </label>
            </div>

            <div className="flex items-center">
              <input className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Offer
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="number" className="border-2 h-14 w-14 rounded-lg p-2" />
            <label htmlFor="">Beds</label>
            <input type="number" className="border-2 h-14 w-14 rounded-lg p-2" />
            <label htmlFor="">Baths</label>
          </div>
          <div className="flex gap-3 items-center">
            <input type="number" className="border-2 h-6 w-32 rounded-lg p-5" />
            <label htmlFor="">Regular Price</label>
            <span className="text-sm" > ($/month) </span>
          </div>
          <div  className=" flex gap-3 items-center">
            <input type="number" className="border-2 h-6 w-32 rounded-lg p-5" />
            <label htmlFor="">Discounted Price</label>
            <span className="text-sm" >($/month)</span>
          </div>
        </div>
        <div className="m-auto p-3 flex flex-col gap-5  ">
          <div className="flex items-center">
            <span className="font-bold mr-2">Images:</span>
            <span>The first image will be the cover (max 6)</span>
          </div>
          <div className="border-2 p-5 rounded-lg">
            <input type="file" accept="image/*" multiple />
            <button className="text-green-500 font-semibold border-2 p-3 rounded-lg uppercase  hover:shadow-md" >Upload</button>
          </div>
          <button className="bg-slate-600 rounded-lg text-white p-3 uppercase hover:opacity-85 disabled:opacity-70">
            Create Listing
          </button>
        </div>
      </div>
    </div>
  );
}
