import Listing from "../models/listing.model.js"

export const createListing = async(req,res,next)=>{
    console.log(req.body);
    
    try {
        const listing = await Listing.create(req.body);
        console.log(listing);
        
        return res.status(200).json({success:true,data:listing})
    } catch (error) {
        next(error)
    }
}