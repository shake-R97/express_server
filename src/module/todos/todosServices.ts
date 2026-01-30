import { pool } from "../../config/db"


const todosCreate = async(payload: Record<string , unknown>)=>{

    const {user_id , title , description} = payload;

    const result = await pool.query(`INSERT INTO todos(user_id , title, description) VALUES($1, $2, $3) RETURNING *`,[user_id , title, description])

    return result;
}

const getTodos = async () => {

    const result = await pool.query(`SELECT * FROM todos`)

    return result;
}


const getSpecificTodo = async (userId: string) => {

    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`,[userId]);

    return result;
}


const updateTodos = async (title: string , description: string , userId: string) => {

    const result = await pool.query(`UPDATE todos SET title = $1 , description = $2 WHERE id = $3  RETURNING *`, [title , description, userId]);

    return result;
}


const deleteTodo = async (userId: string)=> {
    
    const result = await pool.query(`DELETE FROM todos 
        WHERE id = $1`,[userId])

        return result;
}

export const todServices = {
    todosCreate,
    getTodos,
    getSpecificTodo,
    updateTodos,
    deleteTodo
}