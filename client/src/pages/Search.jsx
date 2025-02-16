import React from "react";

export default function Search() {
  return (
    <div className=" flex flex-col md:flex-row">
      <div className="p-5  border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" action="">
          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold text-lg">Search Term :</label>
            <input
              id="searchTerm"
              placeholder="Search"
              type="text"
              className="p-3 border-2 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-4" >
            <label className="font-semibold text-lg">Type:</label>
            <div className="flex gap- flex-wrap gap-8">
              <div  className="flex gap-2 ">
                <input type="checkbox" id="all" className="w-5" />
                <label className="font-semibold" htmlFor="">Rent & Sell</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label className="font-semibold" htmlFor="">Rent</label>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label className="font-semibold" htmlFor="">Sale</label>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label className="font-semibold" htmlFor="">Offer</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4" >
            <label className="font-semibold text-lg" htmlFor="">Amenities:</label>
            <div className="flex gap- flex-wrap gap-8">
              <div  className="flex gap-2 ">
                <input  type="checkbox" id="parking" className="w-5" />
                <label className="font-semibold" htmlFor="">Parking</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" />
                <label className="font-semibold" htmlFor="">Furnished</label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3" >
            <label className="text-lg font-semibold" >Sort:</label>
            <select name="" id="sort_order" className="border-2 rounded-lg p-2">
               <option value="">Price: High to low</option>
               <option value="">Price: Low to high</option>
               <option value="">Latest</option>
               <option value="">Oldest</option>
            </select>
          </div>
          <button type="submit" className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-90" >Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold text-center p-3  my-5 border-b-2" >Listing Results</h1>
      </div>
    </div>
  );
}
