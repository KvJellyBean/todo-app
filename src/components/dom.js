import projectLogic from "./projectLogic.js";
import todoLogic from "./todoLogic.js";
import hash from "../images/hash.svg";
import edit from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import info from "../images/info.svg";
import { format, isToday, isThisWeek } from 'date-fns';

const DOM = (() => {
    // ========================= RENDER FUNCTION ========================= //
    function renderProject(projects) {
        const projectListContainer = document.querySelector('#project-list');
        projectListContainer.innerHTML = '';

        projects.forEach(project => {
            const list = document.createElement('li');
            list.dataset.projectName = project.name;
            list.innerHTML = `
                <a href="#"  class="project-link" >
                    <img src="${hash}" alt="Project Logo" class="project-link" /> ${project.name}
                </a>

                <div class="menu">
                    <img class="edit-project" src="${edit}" alt="Edit" />
                    <img class="delete-project" src="${deleteIcon}" alt="Delete" />
                </div>
            `;

            projectListContainer.append(list);
        })
    }

    function renderTodoList(todos) {
        const todosWrapper = document.querySelector('.todo-wrapper');
        todosWrapper.innerHTML = '';

        todos.forEach(todo => {
            const container = document.createElement('div');
            container.classList.add('todo-item');
            container.innerHTML = `
                <div class="checklist">
                    <input type="checkbox" />
                </div>
                    
                <h4 class="todo-title">
                    ${todo.title}
                </h4>
                
                <div class="menu">
                        <img class="edit" src=${edit} alt="Edit" />
                        <img class="delete" src=${deleteIcon} alt="Delete" />
                        <img class="info" src=${info} alt="Info" />
                </div>
            `;

            todosWrapper.append(container);
        });
    }

    function _renderTitle(title = '') {
        const titleContainer = document.querySelector('.project-title');
        titleContainer.innerText = title;
        return titleContainer;
    }

    // ========================= OTHER FUNCTION ========================= //
    // Function to show Project List (Title Of the projects)
    function showProject() {
        const projects = projectLogic.getProjectList();
        renderProject(projects);
    }

    // Function to show All To Do List (For: Home - All Tasks)
    function showAllTodoList() {
        _renderTitle('All Tasks');
        const projects = projectLogic.getProjectList();
        const todos = todoLogic.getAllTodos(projects);
        renderTodoList(todos);
    }

    // Function to show Today To Do List (For: Home - Today)
    function showTodayTodoList() {
        _renderTitle('Today');
        const projects = projectLogic.getProjectList();
        const todayTodos = todoLogic.getDateFilteredTodos(projects, isToday);
        renderTodoList(todayTodos);
    }

    // Function to show Upcoming To Do List (For: Home - Upcoming)
    function showUpcomingTodoList() {
        _renderTitle('Upcoming');
        const projects = projectLogic.getProjectList();
        const upcomingTodos = todoLogic.getDateFilteredTodos(projects, isThisWeek);
        renderTodoList(upcomingTodos);
    }

    // Function to show Priority[High to Low] To Do List (For: Home - Priority)
    function showPriorityTodoList() {
        _renderTitle('Priority');
        const projects = projectLogic.getProjectList();
        const pirorityTodos = todoLogic.getPriorityTodos(projects);
        renderTodoList(pirorityTodos);
    }

    // Function to show Completed To Do List (For: Home - Completed)
    function showCompletedTodoList() {
        _renderTitle('Completed Tasks');
        const projects = projectLogic.getProjectList();
        const completedTodos = todoLogic.getCompletedTodos(projects);
        renderTodoList(completedTodos);
    }

    // Function to show Project's To Do List/s
    function showProjectTodoList(projectName) {
        _renderTitle(projectName);
        const projectIndex = projectLogic.getProjectIndex(projectName);
        const projectTodos = projectLogic.getProjectTodos(projectIndex);
        renderTodoList(projectTodos);
    }

    // Function to show Add Project Dialog
    function showAddProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();
    }

    // Function to Close Add Project Dialog
    function closeAddProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog');
        dialog.close();
    }

    // Function to show Edit Project Dialog
    function showEditProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog-edit');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();
    }

    // Function to close Edit Project Dialog
    function closeEditProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog-edit');
        dialog.close();
    }

    // Function to add and show the new project
    function addAndShowProject(e) {
        e.preventDefault();
        const projectName = document.querySelector('#project-name').value;
        projectLogic.addProject(projectName);
        showProject();
        showProjectTodoList(projectName);
        closeAddProjectDialog();
    }

    // Function to edit and show the edited project
    function editAndShowProject(e, oldName) {
        e.preventDefault();
        const newName = document.querySelector('#project-name-edit').value;
        projectLogic.editProject(oldName, newName);
        showProject();
        showProjectTodoList(newName);
        closeEditProjectDialog();
    }

    // Function to edit and show the current all project
    function deleteAndShowProject(projectName) {
        projectLogic.deleteProject(projectName);
        DOM.showProject();
        DOM.showAllTodoList();
    }

    return {
        renderProject,
        renderTodoList,
        showProject,
        showAllTodoList,
        showTodayTodoList,
        showUpcomingTodoList,
        showPriorityTodoList,
        showCompletedTodoList,
        showProjectTodoList,
        showAddProjectDialog,
        closeAddProjectDialog,
        showEditProjectDialog,
        closeEditProjectDialog,
        addAndShowProject,
        editAndShowProject,
        deleteAndShowProject,
    }
})();

export default DOM;