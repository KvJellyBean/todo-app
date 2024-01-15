import projectLogic from "./projectLogic.js";
import todoLogic from "./todoLogic.js";
import hash from "../images/hash.svg";
import edit from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import info from "../images/info.svg";
import { format, isToday, isThisWeek } from 'date-fns';

const DOM = (() => {
    // RENDER FUNCTION
    function renderProject(projects) {
        const projectListContainer = document.querySelector('#project-list');
        projectListContainer.innerHTML = '';

        projects.forEach(project => {
            const list = document.createElement('li');
            list.dataset.projectName = project.name
            list.innerHTML = `
                <a href="#">
                    <img src="${hash}" alt="Project Logo" /> ${project.name}
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

    function renderTitle(title) {
        const titleContainer = document.querySelector('.project-title');
        titleContainer.innerText = title;
        return titleContainer;
    }

    // FUNCTIONS TO SHOW DOM
    // Showing Project List (Title Of the projects)
    function showProject() {
        const projects = projectLogic.getProjectList();
        renderProject(projects);
    }

    // Showing All To Do List (For: Home - All Tasks)
    function showAllTodoList() {
        renderTitle('All Tasks');
        const projects = projectLogic.getProjectList();
        const todos = todoLogic.getAllTodos(projects);
        renderTodoList(todos);
    }

    // Showing Today To Do List (For: Home - Today)
    function showTodayTodoList() {
        renderTitle('Today');
        const projects = projectLogic.getProjectList();
        const todayTodos = todoLogic.getDateFilteredTodos(projects, isToday);
        renderTodoList(todayTodos);
    }

    // Showing Upcoming To Do List (For: Home - Upcoming)
    function showUpcomingTodoList() {
        renderTitle('Upcoming');
        const projects = projectLogic.getProjectList();
        const upcomingTodos = todoLogic.getDateFilteredTodos(projects, isThisWeek);
        renderTodoList(upcomingTodos);
    }

    // Showing Priority[High to Low] To Do List (For: Home - Priority)
    function showPriorityTodoList() {
        renderTitle('Priority');
        const projects = projectLogic.getProjectList();
        const pirorityTodos = todoLogic.getPriorityTodos(projects);
        renderTodoList(pirorityTodos);
    }

    // Showing Completed To Do List (For: Home - Completed)
    function showCompletedTodoList() {
        renderTitle('Completed Tasks');
        const projects = projectLogic.getProjectList();
        const completedTodos = todoLogic.getCompletedTodos(projects);
        renderTodoList(completedTodos);
    }

    // Showing Project's To Do List/s
    function showProjectTodoList(projectName) {
        renderTitle(projectName);
        const projectIndex = projectLogic.getProjectIndex(projectName);
        const projectTodos = projectLogic.getProjectTodos(projectIndex);
        renderTodoList(projectTodos);
    }

    // DIALOG
    function showProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();
    }

    function closeProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog');
        dialog.close();
    }

    return {
        renderProject,
        renderTodoList,
        showProject,
        showProjectDialog,
        closeProjectDialog,
        showAllTodoList,
        showTodayTodoList,
        showUpcomingTodoList,
        showPriorityTodoList,
        showCompletedTodoList,
        showProjectTodoList,
    }
})();

export default DOM;