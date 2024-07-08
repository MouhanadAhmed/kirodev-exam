/**
 * This is AppError Class extended from ErrorConstructor
* @param {*} message The message to be displayed with the error.
* @param {*} statusCode The statusCode to be displayed with the error.
*/
export default class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.message=message
        this.statusCode=statusCode
    }
}