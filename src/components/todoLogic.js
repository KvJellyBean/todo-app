import projectLogic from "./projectLogic.js";

const todoLogic = (() => {
    // === TODO FUNCTIONS LOGIC === //
    /**
    * Add a new todo to the specified project.
    * @param {object} todo - The todo object to be added.
    */
    function addTodo(todo) {
        projectLogic.addProject(todo.project, todo);
    }

    /**
     * Edit an existing todo.
     * @param {string} projectName - The name of the project.
     * @param {number} todoId - The ID of the todo to be edited.
     * @param {object} newTodo - The updated todo data.
     */
    function editTodo(projectName, todoId, newTodo) {
        const todo = projectLogic.getTodo(projectName, todoId);

        if (todo === undefined) {
            console.log('There is no item with the input ID.');
            return;
        }

        Object.assign(todo, newTodo);
        todo.id = todoId;

        // Check if projectname is different than before, than move it to those project
        if (newTodo.project !== projectName) {
            const oldProject = projectLogic.getProjectByName(projectName);
            const newProject = projectLogic.getProjectByName(newTodo.project);

            if (oldProject && newProject) {
                // Remove todo from old project
                const todoIndex = oldProject.todos.findIndex(todo => todo.id === todoId);
                if (todoIndex !== -1) {
                    oldProject.todos.splice(todoIndex, 1);
                }
            }
            newProject.todos.push(todo);
        }
    }

    /**
     * Remove a todo from the specified project.
     * @param {string} projectName - The name of the project.
     * @param {number} todoId - The ID of the todo to be removed.
     */
    function removeTodo(projectName, todoId) {
        // Take the project todos
        const projectTodos = projectLogic.getProjectTodos(projectLogic.getProjectIndex(projectName));
        // Take the index of the todo that want to be removed
        const todoIndex = projectTodos.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            console.log('There is no item with the input ID.');
            return;
        }

        projectTodos.splice(todoIndex, 1);
    }

    /**
     * toggle the completion status of a todo.
     * @param {string} projectName - The name of the project.
     * @param {number} todoId - The ID of the todo to be removed.
     */
    function toggleTodoComplete(projectName, todoId) {
        const projectTodos = projectLogic.getProjectTodos(projectLogic.getProjectIndex(projectName));
        const todoIndex = projectTodos.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            console.log('There is no todo with the input ID.');
            return;
        }

        projectTodos[todoIndex].status = !projectTodos[todoIndex].status;
    }

    return {
        addTodo,
        editTodo,
        removeTodo,
        toggleTodoComplete
    }
})();

export default todoLogic;