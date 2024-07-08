import Joi from "joi";

/**
 * This is Create User validation Schema - validates the following fields :
 * - fullName (String) : minimum 2 chars, maximum 30 chars       ---------------------> required
 * - phone (String) : length 13 numbers   ----------------------------------------> required
 * - password (String) : minimum 5 chars, maximum 30 chars        ----------------> required
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains        ---> required
 */
export const createUserSchema = Joi.object({
    fullName:Joi.string().min(2).max(30).required(),
    phone:Joi.string().length(13).pattern(/^\+\d{1}\d{11}$/).required().messages({
        'string.pattern.base': 'Phone number must start with +, followed by a digit and 11 more digits.'
      }),
    password:Joi.string().min(5).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})
/**
 * This is Update User validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 * - fullName (String) : minimum 2 chars, maximum 30 chars   
 * - phone (String) : length 11 numbers 
 * - password (String) : minimum 5 chars, maximum 30 chars       
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains       
 */
export const updateUserSchema = Joi.object({
    id: Joi.string().hex().length(24).required()  ,
    fullName:Joi.string().min(2).max(30).optional(),
    phone:Joi.string().length(13).pattern(/^\+\d{1}\d{11}$/).optional().messages({
        'string.pattern.base': 'Phone number must start with +, followed by a digit and 11 more digits.'
      }),
    password:Joi.string().min(5).max(30).optional(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
})
/**
 * This is Delete User validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 * 
 */
export const deleteUserSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})
/**
 * This is Get User by id validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 * 
 */
export const getUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()   
})