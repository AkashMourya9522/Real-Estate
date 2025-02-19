import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Listing from "../components/Listing";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log(offerListings, saleListings, rentListings);

  useEffect(() => {
    async function getOfferListings() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/listing/getListings?offer=true&limit=4"
        );
        setOfferListings(response.data);
        getRentListings();
      } catch (error) {
        toast.error(error);
      }
    }

    async function getSaleListings() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/listing/getListings?type=sale&limit=4"
        );
        setSaleListings(response.data);
      } catch (error) {
        toast.error(error);
      }
    }

    async function getRentListings() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/listing/getListings?type=rent&limit=4"
        );
        setRentListings(res.data);
        getSaleListings();
      } catch (error) {
        toast.error(error);
      }
    }

    getOfferListings();
  }, []);

  return (
    <div>
      <div className="p-20 flex flex-col gap-6">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-500">
          Find Your Next <span className="text-slate-700">Perfect </span> Place
          With Ease
        </h1>
        <span className="text-lg font-semibold">
          Akash Estate Will Help You Find a Beautiful Home of Your Choice
        </span>
        <Link
          to={"/search"}
          className="text-blue-700 text-lg w-fit font-semibold"
        >
          Let's Start Now ....
        </Link>
      </div>
      <div>
        {offerListings && offerListings.length > 0 && (
          <Swiper navigation>
            {offerListings.map((listing, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[550px]  mx-auto rounded-lg my-2"
                  style={{
                    background: `url(${listing.imageURLs[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  {" "}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="p-10 sm:p-32">
        <h1 className="text-3xl font-semibold">Recent Offers</h1>
        <Link className="text-blue-700" to={"/search?offer=true"}>
          Show More Offers
        </Link>
        <br />
        <br />
        <div className="flex flex-col gap-14 sm:flex-row sm:flex-wrap sm:gap-16">
          {offerListings.map((listing) => (
            <Listing listItem={listing} key={listing._id} />
          ))}
        </div>
        <br />
        <br />
        <h1 className="text-3xl font-semibold">For Rent</h1>
        <Link className="text-blue-700" to={"/search?offer=true"}>
          Show More Properties For Rent
        </Link>
        <br />
        <br />
        <div className="flex flex-col gap-14   sm:flex-row sm:flex-wrap sm:gap-16">
          {rentListings.map((listing) => (
            <Listing listItem={listing} key={listing._id} />
          ))}
        </div>
        <br />
        <br />
        <h1 className="text-3xl font-semibold">Flats For Sale</h1>
        <Link className="text-blue-700" to={"/search?offer=true"}>
          Show More Flats For Sale
        </Link>
        <br />
        <br />
        <div className="flex flex-col gap-14 sm:flex-row sm:flex-wrap sm:gap-16">
          {saleListings.map((listing) => (
            <Listing listItem={listing} key={listing._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
