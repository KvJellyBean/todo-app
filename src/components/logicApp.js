const logicApp = (() => {
    // Variables
    let todos = [];
    let numOfTodo = 0;

    // Getter
    function getTodo() {
        return todos;
    }
    function getNumOfTodo() {
        return numOfTodo;
    }

    // Getter feature filter
    // Based on status
    function getCompletedTodo() {
        return getTodo().filter(todo => todo.status === true);
    }
    function getNotCompletedTodo() {
        return getTodo().filter(todo => todo.status === false);
    }

    // Based on priority
    function getHighPriorityTodo() {
        return getTodo().filter(todo => todo.priority === 'High');
    }
    function getMediumPriorityTodo() {
        return getTodo().filter(todo => todo.priority === 'Medium');
    }
    function getLowPriorityTodo() {
        return getTodo().filter(todo => todo.priority === 'Low');
    }

    // Based on Project Name
    function getTodoOfProject(projectName) {
        return getTodo().filter(todo => todo.project === projectName);
    }

    // Setter
    function setNumOfTodo(number) {
        numOfTodo = number;
    }
    function setTodoTitle(title, id) {
        findTodo(id).title = title;
    }
    function setTodoDescription(description, id) {
        findTodo(id).description = description;
    }
    function setTodoDue(due, id) {
        findTodo(id).due = due;
    }
    function setTodoPriority(priority, id) {
        findTodo(id).priority = priority;
    }
    function setTodoProject(project, id) {
        findTodo(id).project = project;
    }
    function setTodoStatus(status, id) {
        findTodo(id).status = status;
    }

    // Function to find todo by id & find index
    function findTodo(id) {
        return getTodo()[findToDoIndex(id)];
    }

    function findToDoIndex(id) {
        return getTodo().findIndex(todo => todo.id === id);
    }

    // Function to create/add todo
    function addTodo(todo) {
        const currentTodo = getTodo();
        currentTodo.push(todo);
        setNumOfTodo(currentTodo.length);
        console.log('To do Added.');
    }

    // Function to edit todo (when user decide to re-open form & resubmit it)
    function editTodo(id, newTitle, newDescription, newDue, newPriority, newProject, newStatus) {
        if (findToDoIndex(id) === -1) {
            console.log('There is no item with the input ID.');
            return;
        }
        setTodoTitle(newTitle, id);
        setTodoDescription(newDescription, id);
        setTodoDue(newDue, id);
        setTodoPriority(newPriority, id);
        setTodoProject(newProject, id);
        setTodoStatus(newStatus, id);
    }

    // Function to remove todo
    function removeTodo(id) {
        if (numOfTodo <= 0 || findToDoIndex(id) === -1) {
            console.log('Empty storage or item with the input ID is unavailable.');
            return;
        }
        setNumOfTodo(getNumOfTodo() - 1);
        getTodo().splice(findToDoIndex(id), 1);
    }

    // Function to mark todo as complete/not complete
    function markTodoAsCompleted(id) {
        console.log(id);
        if (findToDoIndex(id) === -1) {
            console.log('There is no todo with the input ID.');
            return;
        }
        setTodoStatus(true, id);
    }

    function markTodoAsNotCompleted(id) {
        if (findToDoIndex(id) === -1) {
            console.log('There is no todo with the input ID.');
            return;
        }
        setTodoStatus(false, id);
    }

    // Function to edit project name
    function editProjectName(oldName, newName) {
        const allTodo = getTodoOfProject(oldName);
        if (allTodo.length >= 0) {
            allTodo.forEach(todo => {
                todo.project = newName;
            });
            console.log('Project Name Edited.');
        }
    }

    // Function to remove project
    function removeProject(projectName) {
        const todosToRemove = getTodoOfProject(projectName);

        todosToRemove.forEach(todo => {
            removeTodo(todo.id);
        });
        console.log('Project Removed.');
    }

    return {
        getTodo, getNumOfTodo,
        getCompletedTodo, getNotCompletedTodo, getHighPriorityTodo, getMediumPriorityTodo, getLowPriorityTodo, getTodoOfProject,
        setNumOfTodo, setTodoTitle, setTodoDescription, setTodoDue, setTodoPriority, setTodoProject, setTodoStatus,
        findTodo,
        findToDoIndex,
        addTodo,
        removeTodo,
        editTodo,
        markTodoAsCompleted,
        markTodoAsNotCompleted,
        editProjectName,
        removeProject
    }
})();

export default logicApp;