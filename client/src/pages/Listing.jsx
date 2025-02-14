import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaLocationDot, FaSquareParking } from "react-icons/fa6";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getListingData() {
      const listingId = params.listingId;
      try {
        setLoading(true);
        const listingData = await axios.get(
          `http://localhost:3000/api/listing/getListing/${listingId}`
        );
        console.log(listingData.data);
        setLoading(false);
        setError(false);
        setListing(listingData.data);
        if (listingData.success == false) {
          setLoading(false);
          setError(listingData.data.errorMessage);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    getListingData();
  }, [params.listingId]);

  return (
    <main>
      {loading ? (
        <p className="text-2xl font-semibold my-7 text-center">Loading...</p>
      ) : (
        ""
      )}
      {error ? (
        <p className="text-2xl font-semibold my-7 text-center">
          Something Went Wrong
        </p>
      ) : (
        ""
      )}
      {listing && !error && !loading ? (
        <div className="p-5 bg-neutral-200">
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]  mx-auto rounded-lg my-2"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  {" "}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="  mx-auto mt-5 sm:max-w-2xl sm:mx-auto" >
            <div className="flex gap-1 items-center text-lg my-3">
              <FaLocationDot className="text-green-600 " />
              <span className="font-semibold">{listing.address}</span>
            </div>

            <div>
              {listing.type == "rent" && listing.offer ? (
                <div className="bg-red-700 text-white p-3 rounded-lg font-semibold max-w-lg my-3">
                  Rent per month is $
                  {+listing.regularPrice -
                    +listing.discountPrice -
                    (+listing.discountPrice - +listing.discountPrice)}{" "}
                  (For Rent) (After Added Discounts)
                </div>
              ) : (
                <div className="bg-green-700 text-white p-3 rounded-lg font-semibold max-w-lg my-3">
                  Cost ${listing.regularPrice} (For Sale) (After Added
                  Discounts)
                </div>
              )}
            </div>
            <div className="p-3 font-semibold text-lg">
              {" "}
              <p className="mb-2">Description -</p>{" "}
              <p className="text-slate-700"> {listing.description} </p>{" "}
            </div>
            <ul className="p-3 flex flex-col gap-5 text-green-900">
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaBed className="text-3xl" />
                Bedroom/s : {listing.beds}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaBath className="text-3xl" />
                Bathroom/s : {listing.bathrooms}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaSquareParking className="text-3xl" />
                Parking : {listing.parking ? "Available" : "Not available"}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaChair className="text-3xl" />
                Furnished : {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
