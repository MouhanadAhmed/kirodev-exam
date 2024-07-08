import AppError from './utils/services/AppError.js'
import { globalError } from "./utils/middleware/globalErrorHandle.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";

export default function init(app){
    app.get('/health', (req, res) => {
        const healthCheck = {
          uptime: process.uptime(),
          message: 'OK',
          timestamp: Date.now()
        };
        try {
          res.send(healthCheck);
        } catch (error) {
          healthCheck.message = error;
          res.status(503).send();
        }
      });
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/auth', authRouter);
   
    
    app.all('*',(req,res,next)=>{
    next(new AppError(`can't find this route: ${req.originalUrl}`, 404))
})
app.use(globalError)
}

