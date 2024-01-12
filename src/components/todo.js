// To do object
const Todo = (title, description, due, priority, project, status) => {
    const id = Date.now();

    return {
        title, description, due, priority, project, status, id
    }
};

export default Todo;