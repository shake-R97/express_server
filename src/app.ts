import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv"
import path from "path"
import config from './config';
import initDb, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './module/user/userRoutes';
import { todosRoutes } from './module/todos/todosRoutes';
import { authRoutes } from './module/auth/authRoutes';

dotenv.config({path: path.join(process.cwd(), ".env")});

const app = express()


// parser
app.use(express.json());


// initializing db
initDb();



app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Kitty!')
})


// users CRUD
app.use("/users", userRoutes)



// todos CRUD

app.use("/todos" , todosRoutes)


// auth routes

app.use("/auth" , authRoutes)


app.use((req, res)=>{
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    })
})


export default app;