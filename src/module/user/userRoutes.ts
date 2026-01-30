import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./userController";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", userControllers.createUser)



router.get('/' ,logger, auth("admin"), userControllers.getUser)


router.get("/:id" , userControllers.getSpecificUser)


router.put('/:id' , userControllers.updateUser)


router.delete("/:id" , userControllers.deleteUser)


export const userRoutes = router;