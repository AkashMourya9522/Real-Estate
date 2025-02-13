import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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
        <div>
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-[550px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}}>  </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
