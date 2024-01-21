import projectLogic from "./projectLogic.js";
import { format, isToday, isThisWeek } from 'date-fns';

const todoLogic = (() => {
    // ========================= TODO LOGIC FUNCTIONS ========================= //
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
        const oldStatus = todo.status;

        if (todo === undefined) {
            console.log('There is no item with the input ID.');
            return;
        }

        Object.assign(todo, newTodo);
        todo.id = todoId;
        todo.status = oldStatus;

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
        projectLogic.saveData();
    }

    /**
     * Remove a todo from the specified project.
     * @param {string} projectName - The name of the project.
     * @param {number} todoId - The ID of the todo to be removed.
     */
    function deleteTodo(projectName, todoId) {
        // Take the project todos
        const projectTodos = projectLogic.getProjectTodos(projectLogic.getProjectIndex(projectName));
        // Take the index of the todo that want to be removed
        const todoIndex = projectTodos.findIndex(todo => todo.id == todoId);

        if (todoIndex === -1) {
            console.log('There is no item with the input ID.');
            return;
        }

        projectTodos.splice(todoIndex, 1);
        projectLogic.saveData();
    }

    /**
     * Toggle the status of a todo.
     * @param {string} projectName - The name of the project.
     * @param {number} todoId - The ID of the todo to be removed.
     */
    function toggleTodoStatus(projectName, todoId) {
        const projectTodos = projectLogic.getProjectTodos(projectLogic.getProjectIndex(projectName));
        const todoIndex = projectTodos.findIndex(todo => todo.id == todoId);

        if (todoIndex === -1) {
            console.log('There is no todo with the input ID.');
            return;
        }

        projectTodos[todoIndex].status = !projectTodos[todoIndex].status;
        projectLogic.saveData();
    }

    /**
     * Get all the todos from all projects.
     * @param {object} projects - The projects' object.
     */
    function getAllTodos(projects) {
        const allTodos = [];

        projects.forEach(project => {
            allTodos.push(project.todos)
        });
        return allTodos.flat();
    }

    /**
     * Get all the todos from all projects by date filter.
     * @param {object} projects - The projects' object.
     * @param {function} dateFilter - date-fns function.
     */
    function getDateFilteredTodos(projects, dateFilter) {
        const filteredTodos = []
        projects.forEach(project => {
            project.todos.forEach(todo => {
                if (dateFilter(todo.due, { weekStartsOn: 1 })) {
                    filteredTodos.push(todo);
                }
            })
        });
        return filteredTodos;
    }

    /**
     * Get all the todos based on priority High to Low.
     * @param {object} projects - The projects' object.
     */
    function getPriorityTodos(projects) {
        const sortedTodos = [];
        const priorityArray = ["High", "Medium", "Low"];
        const projectTodos = [];
        projects.forEach(project => {
            projectTodos.push(project.todos);
        });

        const todosSort = projectTodos.flat().slice().sort(function (a, b) {
            let firstPrio = priorityArray.indexOf(a.priority);
            let secPrio = priorityArray.indexOf(b.priority);
            return firstPrio - secPrio;
        });
        sortedTodos.push(todosSort);
        return sortedTodos.flat();
    }

    /**
     * Get all the completed todos from all projects.
     * @param {object} projects - The projects' object.
     */
    function getCompletedTodos(projects) {
        const completedTodos = [];

        projects.forEach(project => {
            const projectTodos = project.todos;
            projectTodos.forEach(todo => {
                if (todo.status) {
                    completedTodos.push(todo);
                }
            })
        });
        return completedTodos;
    }

    return {
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodoStatus,
        getAllTodos,
        getDateFilteredTodos,
        getPriorityTodos,
        getCompletedTodos,
    }
})();

export default todoLogic;