import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./userService";

const createUser = async (req: Request , res: Response)=>{

    try {
        const result = await userServices.createUser(req.body)

        res.status(201).json({
        success: true,
        message: 'data inserted',
        body: result.rows[0],
    })
       
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const getUser =  async(req: Request , res:Response)=> {

    try {
        const result = await userServices.getUser();

        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}


const getSpecificUser = async(req: Request , res: Response)=>{
    const userId:any = req.params.id;
    try {
        const result = await userServices.getSpecificUser(userId);

        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "User not found"
        })
        }else{
            res.status(200).json({
                success: true,
                message: "User Found Successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
         res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}


const updateUser = async (req: Request , res: Response)=>{
    const userId = req.params.id;
    const {name , email} = req.body;

    try {
        
        const result = await userServices.updateUser(name , email , userId as string) ;

        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "User not found"
        })
        }else{
            res.status(200).json({
                success: true,
                message: "User data updated Successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
         res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}


const deleteUser = async(req: Request , res: Response)=>{
    const userId = req.params.id;
    try {
        const result = await userServices.deleteUser(userId!);

        if(result.rowCount === 0){
            res.status(404).json({
            success: false,
            message: "User not found"
        })
        }else{
            res.status(200).json({
                success: true,
                message: "User Deleted Successfully",
                data: null
            })
        }
    } catch (error: any) {
         res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}



export const userControllers = {
    createUser,
    getUser,
    getSpecificUser,
    updateUser,
    deleteUser,
}