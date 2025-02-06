import React, { useState } from "react";
import axios from "axios";

export default function () {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 100,
    discountPrice: 50,
    bathrooms: 1,
    furnished: true,
    parking: true,
    type: "rent",
    offer: true,
    beds: 1,
    imageURLs: [],
  });
  console.log(files);
  console.log(formData);

  async function handleImageUpload() {
    if (files.length > 0 && files.length < 7) {
      setLoading(true);
      const promises = [...files].map(async (file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "Real_Estate");
        imageData.append("cloud_name", "drjsiga6e");
        return axios
          .post(
            "https://api.cloudinary.com/v1_1/drjsiga6e/image/upload",
            imageData
          )
          .then((res) => res.data.secure_url);
      });

      const allURLs = await Promise.all(promises);
      setLoading(false);
      setFormData((prev) => ({
        ...prev,
        imageURLs: [...prev.imageURLs, ...allURLs],
      }));
    } else {
      setLoading(false);
      return;
    }
  }

  function handleImageDelete(indexToDelete) {
    setFormData((prev) => ({
      ...prev,
      imageURLs: prev.imageURLs.filter((_, i) => i != indexToDelete),
    }));
  }

  function handleSellRent(e){
    console.log(e.target.id);
    
    setFormData((prev)=>({...prev,type:e.target.id}))
  }

  return (
    <div className="p-5 ">
      <h1 className="text-3xl font-bold text-center my-5">Create Listing</h1>
      <div className=" flex flex-col  gap-5 m-auto lg:flex-row   ">
        <div className="m-auto flex flex-col  gap-5  p-3 ">
          <input
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Name"
            required
            maxLength={62}
            minLength={3}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
            }}
            value={formData.name}
          />
          <textarea
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
            }}
            value={formData.description}
          />
          <input
            className="p-3 border-2 rounded-lg"
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, address: e.target.value }));
            }}
            value={formData.address}
          />
          <div className="flex gap-3 flex-wrap items-center ">
            <div className="flex items-center">
              <input id="sell" checked={formData.type ==='sell'} onChange={(e)=>{handleSellRent(e)}}  className="w-4 h-4" type="checkbox" />
              <label  className="ml-2" htmlFor="">
                Sell
              </label>
            </div>

            <div className="flex items-center">
              <input id="rent" checked={formData.type === 'rent'} onChange={(e)=>{handleSellRent(e)}}  className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Rent
              </label>
            </div>

            <div className="flex items-center">
              <input onChange={(e)=>{setFormData((prev)=>({...prev,parking:!prev.parking}))}} checked={formData.parking} className="w-4 h-4" type="checkbox" />
              <label  className="ml-2" htmlFor="">
                Parking Spot
              </label>
            </div>

            <div className="flex items-center">
              <input onChange={(e)=>{setFormData((prev)=>({...prev,furnished:!prev.furnished}))}} checked={formData.furnished} className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Furnished
              </label>
            </div>

            <div className="flex items-center">
              <input onChange={(e)=>{setFormData((prev)=>({...prev,offer:!prev.offer}))}} checked={formData.offer} className="w-4 h-4" type="checkbox" />
              <label className="ml-2" htmlFor="">
                Offer
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, beds: e.target.value }));
              }}
              value={formData.beds}
              type="number"
              className="border-2 h-14 w-14 rounded-lg p-2"
            />
            <label htmlFor="">Beds</label>
            <input
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, bathrooms: e.target.value }));
              }}
              value={formData.bathrooms}
              type="number"
              className="border-2 h-14 w-14 rounded-lg p-2"
            />
            <label htmlFor="">Baths</label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              value={formData.regularPrice}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  regularPrice: e.target.value,
                }));
              }}
              type="number"
              className="border-2 h-6 w-32 rounded-lg p-5"
              min={100}
            />
            <label htmlFor="">Regular Price</label>
            <span className="text-sm"> ($/month) </span>
          </div>
          <div className=" flex gap-3 items-center">
            <input
              value={formData.discountPrice}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  discountPrice: e.target.value,
                }));
              }}
              type="number"
              className="border-2 h-6 w-32 rounded-lg p-5"
              min={50}
            />
            <label htmlFor="">Discounted Price</label>
            <span className="text-sm">($/month)</span>
          </div>
        </div>
        <div className="m-auto p-3 flex flex-col gap-5  ">
          <div className="flex items-center">
            <span className="font-bold mr-2">Images:</span>
            <span>The first image will be the cover (max 6)</span>
          </div>
          <div className="border-2 p-5 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              multiple
            />
            <button
              onClick={handleImageUpload}
              className="text-green-500 font-semibold border-2 p-3 rounded-lg uppercase  hover:shadow-md"
            >
              {" "}
              {loading ? "Uploading....." : "Upload"}{" "}
            </button>
          </div>
          <button className="bg-slate-600 rounded-lg text-white p-3 uppercase hover:opacity-85 disabled:opacity-70">
            Create Listing
          </button>
          <div>
            {formData.imageURLs.map((imageURL, i) => (
              <div id={i} className="flex justify-between">
                <img
                  id={i}
                  className="w-20 h-20 rounded-lg object-contain"
                  key={Math.random()}
                  src={imageURL}
                />
                <button
                  onClick={() => {
                    handleImageDelete(i);
                  }}
                  className="text-red-600"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
