import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Listing from "../components/Listing";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [listings,setListings] = useState("")
  const [loading,setLoading] = useState(false)
  const [showMore,setShowMore] = useState(false)

  console.log(listings);
  
  

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')
    const typeFromUrl = urlParams.get('type')
    
    if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebardata({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        });
      }

      const getListings = async()=>{
        const URLparams = new URLSearchParams(location.search)
        setLoading(true)
        const listingsData = await axios.get(`http://localhost:3000/api/listing/getListings?${URLparams.toString()}`)
        if(listingsData.data.length>8){
          setShowMore(true)
        }
        setListings(listingsData.data);
        setLoading(false)
      }
      getListings()

  },[window.location.search])

  console.log(sidebardata);

  function handleSubmit(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  async function handleShowMore(){
    const listingLength = listings.length
    const startIndex = listingLength;
    const params = new URLSearchParams(location.search)
    params.set("startIndex",startIndex)
    const searchQuery = params.toString()
    const restListings = await axios.get("http://localhost:3000/api/listing/getListings?"+searchQuery)
    if(restListings.data.length < 9){
      setShowMore(false)
    }
    setListings([...listings,...restListings.data])
  }

  

  return (
    <div className=" flex flex-col md:flex-row bg-stone-100">
      <div className="p-5 border-b-2 sm:min-w-[400px] md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full" action="">
          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold text-lg">
              Search Term :
            </label>
            <input
              id="searchTerm"
              placeholder="Search"
              type="text"
              className="p-3 border-2 rounded-lg w-full"
              value={sidebardata.searchTerm}
              onChange={(e) =>
                setSidebardata((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-lg">Type:</label>
            <div className="flex gap- flex-wrap gap-8">
              <div className="flex gap-2 ">
                <input
                  onChange={(e) =>
                    setSidebardata((prev) => ({ ...prev, type: "all" }))
                  }
                  checked={sidebardata.type === "all"}
                  type="checkbox"
                  id="all"
                  className="w-5"
                />
                <label className="font-semibold" htmlFor="">
                  Rent & Sale
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={(e) =>
                    setSidebardata((prev) => ({ ...prev, type: "rent" }))
                  }
                  checked={sidebardata.type === "rent"}
                  type="checkbox"
                  className="w-5"
                />
                <label className="font-semibold" htmlFor="">
                  Rent
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  onChange={(e) =>
                    setSidebardata((prev) => ({ ...prev, type: "sale" }))
                  }
                  checked={sidebardata.type === "sale"}
                  type="checkbox"
                  className="w-5"
                />
                <label className="font-semibold" htmlFor="">
                  Sale
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  onChange={(e) =>
                    setSidebardata((prev) => ({ ...prev, offer: !prev.offer }))
                  }
                  checked={sidebardata.offer }
                  type="checkbox"
                  className="w-5"
                />
                <label className="font-semibold" htmlFor="">
                  Offer
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-lg" htmlFor="">
              Amenities:
            </label>
            <div className="flex gap- flex-wrap gap-8">
              <div className="flex gap-2 ">
                <input
                  onChange={() =>
                    setSidebardata((prev) => ({
                      ...prev,
                      parking: !prev.parking,
                    }))
                  }
                  checked={sidebardata.parking===true ? true : false}
                  type="checkbox"
                  id="parking"
                  className="w-5"
                />
                <label className="font-semibold" htmlFor="">
                  Parking
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={() =>
                    setSidebardata((prev) => ({
                      ...prev,
                      furnished: !(prev.furnished),
                    }))
                  }
                  type="checkbox"
                  className="w-5"
                  checked={sidebardata.furnished}
                />
                <label className="font-semibold" htmlFor="">
                  Furnished
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-lg font-semibold">Sort:</label>
            <select
              onChange={(e) =>
                setSidebardata((prev) => ({
                  ...prev,
                  sort: e.target.value.split("_")[0] || "createdAt",
                  order: e.target.value.split("_")[1] || "desc",
                }))
              }
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border-2 rounded-lg p-2"
            >
              <option value="regularPrice_desc">Price: High to low</option>
              <option value="regularPrice_asc">Price: Low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-90"
          >
            Search
          </button>
        </form>
      </div>
      <div className=" p-5 w-full">
        <h1 className="text-3xl font-semibold text-center p-3  my-5 border-b-2">
          Listing Results
        </h1>
        <div className="flex flex-wrap gap-5  p-5" >
          {!loading && listings.length === 0 && (
            <p className="text-lg text-center" >No Listings Found</p>
          ) }

          {
            loading && (
              <h1 className="text-center " >Wait Until We fetch Your Data!!</h1>
            )
          }

          {
            !loading && listings && (listings.map((listItem)=> <Listing key={listItem._id} listItem={listItem} /> ))
          }

          {
            showMore && (
              <button onClick={handleShowMore} className="text-green-500 w-full" >Show More</button>
            )
          }
        </div>
      </div>
    </div>
  );
}
