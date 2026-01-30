import { Request, Response } from "express";
import { todServices } from "./todosServices";

const todosCreate = async(req:Request, res:Response)=>{
   

    try {
        const result = await todServices.todosCreate(req.body);

        res.status(201).json({
            success: true,
            message: "Todo created",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getTodos = async(req:Request , res: Response)=> {
    try {
        
        const result = await todServices.getTodos();

        res.status(200).json({
            success: true,
            message: 'All todos retrieved',
            data: result.rows
        })
        

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getSpecificTodo = async (req:Request , res:Response)=>{
    const userId = req.params.id;

    try {
        
        const result = await todServices.getSpecificTodo(userId as string)

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: 'user not fond',
                details: `User not found with the given id : ${userId}`
            })
        }else{
            res.status(200).json({
                success: true,
                message: `user founded with the given id: ${userId}`,
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const updateTodos = async(req:Request , res:Response)=>{
    const userId = req.params.id;
    const {title , description} = req.body;

    try {
        
        const result = await todServices.updateTodos(title , description , userId!);

        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: "No todos found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: 'Todos Updated successfully',
                updatedData: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'there is a problem when completing this request',
            details: err.message
        })
    }
}


const deleteUser = async (req:Request , res: Response)=> {
    const userId = req.params.id;

    try {
        
        const result = await todServices.deleteTodo(userId!) ;

        if(result.rowCount === 0){
            res.status(404).json({
            success: false,
            message: "todos not found"
        })
        }else{
            res.status(200).json({
                success: true,
                message: "todos task Deleted Successfully",
                data: null
            })
        }

    } catch (err: any) {
         res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}


export const todControllers = {
    todosCreate,
    getTodos,
    getSpecificTodo,
    updateTodos,
    deleteUser,
}