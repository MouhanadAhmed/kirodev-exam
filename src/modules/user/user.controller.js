import {userModel} from './user.model.js';
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.handler.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import AppError from '../../utils/services/AppError.js';
import bcrypt from 'bcrypt'

/**
 * This is Add User Controller

 */
export const addUser = addOne(userModel,"User");
/**
 * This is Get All Users Controller 

 */
export const getAllUsers = getAll(userModel,"Users");
/**
 * This is Update User Controller

 */
export const updateUser = updateOne(userModel,"User");
/**
 * This is Delete User Controller 

 */
export const deleteUser = deleteOne(userModel,"User");

/**
 * This is Get User by Id Controller 

 */
export const getUserById = getById(userModel, 'User');

/**
 * This is Update User Controller 

 */
export const changePassword = catchAsyncError(async (req,res,next) => {
    const {id}= req.params;
    req.body.changePasswordAt = Date.now();
    if(req.body.name) req.body.slug= slugify(req.body.name);
    req.body.password = await bcrypt.hash(req.body.password,7)
    let document = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    document && res.status(200).json({message:"Success", document});
    !document &&   next(new AppError(`Invalid user Id`,404))
});