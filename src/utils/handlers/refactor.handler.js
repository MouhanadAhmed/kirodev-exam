import  AppError  from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ApiFeatures from "../APIFeatures.js";
import { sendEmail } from "../../modules/email/sendEmail.js";
import jwt from 'jsonwebtoken';





export async function doesDocumentExist(model, uniqueKey) {
  const isFound                                         = await model.findOne(uniqueKey);
  return isFound !== null;
}


/**
 * This is Delete One document  handler
 * ```
 *  Accepts id from Req.params
* ``` 
*  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const deleteOne=(model,result)=>{
    return catchAsyncError(async (req,res,next) => {
        const {id}                                      = req.params;
        let document                                    = await model.findByIdAndUpdate(id,{deleted:true},{new:true});
        let response                                    = {}
        response[result]                                = document;
        document && res.status(200).json({message       : "Success", ...response});
        !document &&   next(new AppError("document not found",404))
    })
}
/**
 * This is Add One document  handler
 * ```
 * - Accepts id from Req.params
 * - Verify user token to addd product 
 * - Send Verification Email to the user
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const addOne=(model,results) =>{
    return catchAsyncError(async (req,res,next) => {
                if(req.file) {
                  req.body.idDocument                   = process.env.BASEURL + req.file.path
                }
                    let user                            = await model.findOne({email:req.body.email});
                    if(user) return next(new AppError("Email already exists",409));
                const document                          = new model(req.body);
                await document.save();
                let response                            = {}
                response[results]                       = document;
                
                  // Registeration verification using email and token
                    let verifyToken                     = jwt.sign({id:document._id },process.env.VERIFY_SECRET)
                    sendEmail({email                    : req.body.email,api:`${process.env.BASEURL}api/v1/auth/verify/${verifyToken}`,sub:"Verify Email",text:"Tap the button below to confirm your email address. If you didn't create an account with Paste, you can safely ignore this email",title:"Confirm Your Email Address",btn:"Verify Email"})
                res.status(201).json({message           : "Success", ...response});


    })
}
/**
 * This is Get all documents  handler
 * ```
 *API Features:
 * - Accepts id from Req.params for category 
 * - Pagination, Search, Sort, Fields & Filter 
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getAll = (model,result) =>{
    return catchAsyncError(async (req,res,next) => {
        let Pages                                       = await model.find();
        let totalCount                                  = Pages.length
        let numOfPages                                  = totalCount/10 > 1?Math.ceil( totalCount/10) : 1
        let apiFeature                                  = new ApiFeatures(model.find(), req.query).pagination().search().sort().fields().filter();
        // excute query
        let documents                                   = await apiFeature.mongooseQuery.sort("order");
        let response                                    = {}
        let count                                       = documents.length
        response[result]                                = documents;
        res.status(200).json({message                   : "Success",page:`${apiFeature.page} of ${numOfPages}`,PageCount:count,TotalCount:totalCount, data:documents});
    })
}
/**
 * This is Update One document  handler
 * ```
 * - Accepts id from Req.params  
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const updateOne = (model,result) => {
    return catchAsyncError(async (req,res,next) => {
        let {id}                                        = req.params;
        let document                                    = await model.findByIdAndUpdate(id,req.body,{new:true})
        let response                                    = {}
        response[result]                                = document;
        document && res.status(200).json({message       : "Success", ...response});
        !document &&   next(new AppError(`Invalid ${result} Id`,404))
    })
}
/**
 * This is Get One document by id handler
 * ```
 * - Accepts id from Req.params  
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getById = (model,result) => {
    return catchAsyncError(async (req,res,next) => {
            const {id}                                  = req.params;
            let document                                = await model.findById(id);
            let response                                = {}
            response[result]                            = document;
            document && res.status(200).json({message   : "Success",...response});
           !document &&   next(new AppError(`Invalid ${result} Id`,404))
        })
}
