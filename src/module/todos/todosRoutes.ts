import express from "express";
import { todControllers } from "./todosController";


const router = express.Router();

router.post("/" , todControllers.todosCreate)


router.get("/all-todos", todControllers.getTodos)


router.get("/user/:id" , todControllers.getSpecificTodo)


router.put("/user/:id" , todControllers.updateTodos)


router.delete("/delete/:id" , todControllers.deleteUser)


export const todosRoutes = router;