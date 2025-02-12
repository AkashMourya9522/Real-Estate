import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    console.log(listing);

    return res.status(200).json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing) {
      if (listing.userRef != req.userId) {
        return next(
          errorHandler(
            "Error in deleting(You can delete Your own listings)",
            404
          )
        );
      }
      const dbRes = await Listing.findByIdAndDelete(listing._id);
      res
        .status(200)
        .json({ success: true, message: "Listing Has Been Deleted" });
    } else {
      return next(errorHandler("Error ", 404));
    }
  } catch (err) {
    return next(err);
  }
};

export const editListing = async (req, res, next) => {
  let listingId = req.params.id;
  try {
    let listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler("Listing Missing", 404));
    }
    if (listing.userRef != req.userId) {
      return next(errorHandler("Invalid Access", 404));
    }
    let updatedListing = await Listing.findByIdAndUpdate(listingId, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req,res,next)=>{
  try {
    if(req.params.id){
      const listingData = await Listing.findById(req.params.id)
      res.status(200).json(listingData)
    }
    else{
      return next(errorHandler("This listing doesn't exist",404))
    }
  } catch (error) {
    return next(error)
  }
}
