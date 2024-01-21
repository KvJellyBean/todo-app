import Project from "./project";
import Todo from "./todo";
import { format } from 'date-fns';

const projectLogic = (() => {
    let projectList = [];
    let numOfProject;
    const STORAGE_KEY = 'Jellist_projectList';

    if (isStorageAvailable()) {
        loadProjectList();
        numOfProject = projectList.length;
    }

    // ========================= GETTER & SETTER ========================= //
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
        return getProjectTodos(getProjectIndex(projectName)).find(todo => todo.id == id);
    }

    // ========================= PROJECT LOGIC FUNCTIONS ========================= //
    /**
     * Add a new project with the todo(optional).
     * @param {string} projectName - The name of the project.
     * @param {object | array objects} todos - The todos object to be added.
     */
    function addProject(projectName, todos = '') {
        const project = getProjectByName(projectName);
        if (todos === '') {
            todos = Todo('My New Activity', 'Activity description', format(Date.now(), 'yyyy-MM-dd\'T\'HH:mm'), 'Low', projectName, false);
        }

        if (project === undefined) {
            todos.project = projectName;
            const newProject = Project(getNumOfProject(), projectName, [todos]);
            getProjectList().push(newProject);
            setNumOfProject(getProjectList().length);
        }
        else {
            console.log('Project already exists.');
            project.todos.push(todos);
        }
        saveData();
    }

    /**
     * Edit a project name.
     * @param {string} oldName - The old name of the project.
     * @param {string} oldName - The new name of the project.
     */
    function editProject(oldName, newName) {
        const oldProject = getProjectByName(oldName);
        const newProject = getProjectByName(newName);
        if (oldProject && !newProject) {
            oldProject.name = newName;
            oldProject.todos.forEach(todo => {
                todo.project = newName;
            });
        } else if (oldProject && newProject) {
            console.log('Fail to edit, other Project was found.');
        }
        saveData();
    }

    /**
     * Delete a project from the projectList.
     * @param {string} projectName - The name of the project.
     */
    function deleteProject(projectName) {
        const projectIndex = getProjectIndex(projectName);
        if (projectIndex > -1) {
            getProjectList().splice(projectIndex, 1);
            _reorderProjects();
            setNumOfProject(getProjectList().length);
        } else {
            console.log('Project Not Found.');
        }
        saveData();
    }

    /**
     * Reorder the project index -> used after removing project
     */
    function _reorderProjects() {
        const projects = getProjectList();
        for (let i = 0; i < projects.length; i++) {
            projects[i].projectIndex = i;
        }
    }

    // Local Storage Implementation
    function isStorageAvailable() {
        if (typeof (localStorage) === undefined) {
            console.log("Local Storage Not Supported.");
            return false;
        }
        return true;
    }

    function saveData() {
        if (isStorageAvailable()) {
            const parsedData = JSON.stringify(getProjectList());
            localStorage.setItem(STORAGE_KEY, parsedData);
        }
    }

    function loadProjectList() {
        const data = localStorage.getItem(STORAGE_KEY);
        const parsedData = JSON.parse(data);

        if (parsedData !== null && parsedData.length !== 0) {
            projectList = parsedData;
        } else {
            const todo = Todo('My New Activity', 'Activity description', format(Date.now(), 'yyyy-MM-dd\'T\'HH:mm'), 'Low', 'Inbox', false);
            projectList = [Project(0, 'Inbox', [todo])];
            saveData();
        }
    }

    return {
        getProjectList, getNumOfProject,
        setNumOfProject,
        getProjectByName, getProjectIndex, getProjectTodos, getTodo,
        addProject,
        editProject,
        deleteProject,
        isStorageAvailable, saveData,
    }
})();

export default projectLogic;