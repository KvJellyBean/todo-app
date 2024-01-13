import Project from "./project";

const projectLogic = (() => {
    let projectList = [];
    let numOfProject = projectList.length;
    let defaultTodo = {
        title: 'Default Title',
        description: 'To Do Description',
        due: '2024-01-01',
        priority: 'Low',
        project: '',
        status: false,
    }

    // Main Getter & Setter
    function getProjectList() {
        return projectList;
    }
    function getNumOfProject() {
        return numOfProject;
    }
    function setNumOfProject(number) {
        numOfProject = number;
    }

    /**
     * Additional Getter Setter.
     * @param {string} projectName - The name of the project.
     * @param {number} index - The index of the Project.
     * @param {number} id - The ID of the todo.
     */
    function getProjectByName(projectName) {
        return getProjectList().find(project => project.name === projectName);
    }
    function getProjectIndex(projectName) {
        return getProjectByName(projectName).projectIndex;
    }
    function getProjectTodos(index) {
        return getProjectList()[index].todos;
    }
    function getTodo(projectName, id) {
        return getProjectTodos(getProjectIndex(projectName)).find(todo => todo.id === id);
    }

    // === PROJECT FUNCTIONS LOGIC === //

    /**
     * Add a new project with the todo(optional).
     * @param {string} projectName - The name of the project.
     * @param {object | array objects} todos - The todos object to be added.
     */
    function addProject(projectName, todos = defaultTodo) {
        const project = getProjectByName(projectName);

        if (project === undefined) {
            todos.project = projectName;
            const newProject = Project(getNumOfProject(), projectName, [todos]);
            getProjectList().push(newProject);
            setNumOfProject(getProjectList().length);
        } else {
            console.log('Project already exists.');
            project.todos.push(todos);
        }
    }

    /**
     * Edit a project name.
     * @param {string} oldName - The old name of the project.
     * @param {string} oldName - The new name of the project.
     */
    function editProject(oldName, newName) {
        const project = getProjectByName(oldName);
        if (project) {
            project.name = newName;
        } else {
            console.log('Project Not Found.');
        }
    }

    /**
     * Remove a project from the projectList.
     * @param {string} projectName - The name of the project.
     */
    function removeProject(projectName) {
        const projectIndex = getProjectIndex(projectName);
        if (projectIndex > -1) {
            getProjectList().splice(projectIndex, 1);
            setNumOfProject(getProjectList().length);
        } else {
            console.log('Project Not Found.');
        }
    }

    return {
        getProjectList, getNumOfProject,
        setNumOfProject,
        getProjectByName, getProjectIndex, getProjectTodos, getTodo,
        addProject,
        editProject,
        removeProject
    }
})();

export default projectLogic;