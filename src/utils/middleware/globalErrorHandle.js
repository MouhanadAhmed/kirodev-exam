/**
 * This is Global Error handler MiddleWare
 * ```
 * - Display Error Stack in development mode only (Controlled by `process.env.MODE`)
 * - Destructs Error message and the Error code (if no error code, 500 will be displayed)
 * ```
* @param {*} err The error from any controller or route
*/


export const globalError = (err,req,res,next)=>{
    let error =err.message;
    let code = err.statusCode || 500;
    process.env.MODE === 'dev' ? res.status(code).json({error, stack:err.stack}): res.status(code).json({error});
}