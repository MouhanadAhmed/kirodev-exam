
import express from 'express';
import * as userControllers from './user.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { createUserSchema, deleteUserSchema, getUserByIdSchema, updateUserSchema } from './user.validator.js';
import { uploadSingleFile } from '../../utils/middleware/fileUploads.js';
const userRouter =  express.Router();

userRouter.route('/')
        .post(uploadSingleFile('id','idDocument'),validation(createUserSchema),userControllers.addUser)
        .get(userControllers.getAllUsers)


userRouter.route('/:id')
        .get(validation(getUserByIdSchema),userControllers.getUserById)
        .patch(validation(updateUserSchema),userControllers.updateUser)
        .delete(validation(deleteUserSchema),userControllers.deleteUser)
        


userRouter.route('/changePassword/:id').patch(userControllers.changePassword)
export default userRouter;