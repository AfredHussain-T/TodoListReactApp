export const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Fetching the todo items present in the array and returning the response to the useEffect in home file to display it.
export const getTodoItems = async ()=>{
    const response = await fetch(API_URL);
    let data = [];
    data = await response.json();
    try {
        return {
            data: data,
            message: 'Fetched all the items of todo',
            success: true
        }
    } catch (error) {
        return{
            message: 'error while fetching the todolist tasks',
            success: false
        }
    }   
};

// title and userId are passed from home file to make a POST api call to get the response.
export const addTodoTask = async (title, userId)=>{
    const response = await fetch(API_URL,{
        method: 'POST',
        body: JSON.stringify({
            title,
            userId,
            completed: false,
        }),
        headers: {
            "Content-type": "application/json",
        }
    });
    const data = await response.json();
    console.log(data, '0000000')
    try {
        return{
            data,
            success: true,
            message: 'Successfully Added The Task'
        }
    } catch (error) {
        return{
            message: error.message,
            success: false
        }
    }
};

// task is passed from home file to make a Delete api call to get the response.
export const deleteTodoTask = async (task)=>{
    const response = await fetch(API_URL+`${task.id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    try {
        return{
            data,
            success: true,
            message: 'Deleted Task Successfully'
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
};


// task is passed from home file to make a POST api call to get the update response.
export const saveTodoTask = async (task)=>{
    const response = await fetch(API_URL+`${task.id}`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            "Content-type":"application/json"
        }
    });
    const data = await response.json();
    data.task = task;
    console.log(data)
    try {
        return{
            data,
            success: true,
            message:'Updated Task Successfully'
        }
    } catch (error) {
        return{
            message: error.message,
            success: false
        }
    }
};