import Project from "./project";
import Todo from "./todo";
import { format } from 'date-fns';

const projectLogic = (() => {
    let projectList = [{
        projectIndex: 0,
        name: 'First Project',
        todos: [
            {
                title: 'Title 1',
                description: 'To Do Description 1',
                due: '2024-01-15',
                priority: 'Medium',
                project: 'First Project',
                status: true,
                id: 123,
            },
            {
                title: 'Title 2',
                description: 'To Do Description 2',
                due: '2024-01-15',
                priority: 'High',
                project: 'First Project',
                status: false,
                id: 124,
            },
            {
                title: 'Title 3',
                description: 'To Do Description 3',
                due: '2024-01-21',
                priority: 'Low',
                project: 'First Project',
                status: false,
                id: 125,
            },
        ]
    }, {
        projectIndex: 1,
        name: 'Second Project',
        todos: [
            {
                title: '2 Title 1',
                description: 'To Do Description 1',
                due: '2024-01-20',
                priority: 'Low',
                project: 'Second Project',
                status: true,
                id: 126,
            },
            {
                title: '2 Title 2',
                description: 'To Do Description 2',
                due: '2024-01-20',
                priority: 'Medium',
                project: 'Second Project',
                status: false,
                id: 127,
            },
            {
                title: '2 Title 3',
                description: 'To Do Description 3',
                due: '2024-01-21',
                priority: 'High',
                project: 'Second Project',
                status: false,
                id: 128,
            },
        ]
    }
    ];
    let numOfProject = projectList.length;

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
            todos = Todo('My New Activity', 'Activity description', format(Date.now(), 'yyyy-MM-dd'), 'Low', projectName, false);
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

    return {
        getProjectList, getNumOfProject,
        setNumOfProject,
        getProjectByName, getProjectIndex, getProjectTodos, getTodo,
        addProject,
        editProject,
        deleteProject
    }
})();

export default projectLogic;