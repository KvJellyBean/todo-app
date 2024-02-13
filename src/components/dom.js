import projectLogic from "./projectLogic.js";
import todoLogic from "./todoLogic.js";
import Todo from "./todo.js";
import hash from "../images/hash.svg";
import edit from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";
import info from "../images/info.svg";
import empty from "../images/empty.svg";
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
                <a href="#"  class="project-link" data-section>
                    <img src="${hash}" alt="Project Logo ${project.projectIndex}" class="project-link" data-section/> ${project.name}
                </a>

                <div class="menu">
                    <img class="edit-project" src="${edit}" alt="Edit Project ${project.projectIndex}" />
                    <img class="delete-project" src="${deleteIcon}" alt="Delete Project ${project.projectIndex}" />
                </div>
            `;

            projectListContainer.append(list);
        })
    }

    function renderTodoList(todos) {
        const todosWrapper = document.querySelector('.todo-wrapper');
        todosWrapper.innerHTML = '';

        if (todos.length === 0) {
            const emptyContainer = document.createElement('div');
            emptyContainer.classList.add('empty-container');
            emptyContainer.innerHTML = `
                <img src="${empty}" alt="Nothing to do" />
            `;
            todosWrapper.append(emptyContainer);
            return;
        }

        todos.forEach(todo => {
            const container = document.createElement('div');
            container.classList.add('todo-item', todo.priority.toLowerCase());
            container.dataset.todoProject = todo.project;
            container.dataset.todoId = todo.id;
            const formatedDate = format(todo.due, 'dd/MM/yyyy hh:mm a');
            container.innerHTML = `
                <div class="checklist">
                    <input id="${todo.id}" type="checkbox" ${todo.status === true ? 'checked' : ''} />
                    <label for="${todo.id}"></label>
                </div>
                    
                <div class="todo-title">
                <h4 class="todo-title">${todo.title}</h4>
                <p class="todo-title">Due date: ${formatedDate}</p>
                </div>
                
                <div class="menu">
                        <img class="edit" src=${edit} alt="Edit To Do ${todo.id}" />
                        <img class="delete" src=${deleteIcon} alt="Delete To Do ${todo.id}" />
                        <img class="info" src=${info} alt="To Do Information ${todo.id}" />
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

    function renderSelectProject() {
        const selects = document.querySelectorAll('.todo-project');
        const projects = projectLogic.getProjectList();

        selects.forEach(select => {
            select.innerHTML = '';
            projects.forEach(project => {
                select.innerHTML += `
                    <option value="${project.name}">${project.name}</option>
                `
            })
        })
    }

    // ========================= OTHER FUNCTION ========================= //
    // Function to show Project List (Title Of the projects)
    function showProject() {
        const projects = projectLogic.getProjectList();
        renderProject(projects);
        console.log(projects);
        renderSelectProject();
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

    // Function to show This Week To Do List (For: Home - This Week)
    function showThisWeekTodoList() {
        _renderTitle('This Week');
        const projects = projectLogic.getProjectList();
        const thisWeekTodos = todoLogic.getDateFilteredTodos(projects, isThisWeek);
        renderTodoList(thisWeekTodos);
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
        const dialog = document.querySelector('dialog#project-dialog-add');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();
    }

    // Function to Close Add Project Dialog
    function closeAddProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog-add');
        dialog.close();
    }

    // Function to show Edit Project Dialog
    function showEditProjectDialog(oldName) {
        const dialog = document.querySelector('dialog#project-dialog-edit');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();

        document.querySelector('#project-name-edit').value = oldName;
    }

    // Function to close Edit Project Dialog
    function closeEditProjectDialog() {
        const dialog = document.querySelector('dialog#project-dialog-edit');
        dialog.close();
    }

    // Function to show Add To Do List Dialog
    function showAddTodoDialog() {
        const dialog = document.querySelector('dialog#todo-dialog-add');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();
    }

    // Function to close Add To Do List Dialog
    function closeAddTodoDialog() {
        const dialog = document.querySelector('dialog#todo-dialog-add');
        dialog.close();
    }

    // Function to show Edit To Do List Dialog
    function showEditTodoDialog(projectName, todoId) {
        const dialog = document.querySelector('dialog#todo-dialog-edit');
        const form = dialog.querySelector('form');
        form.reset();
        dialog.showModal();

        const todo = projectLogic.getTodo(projectName, todoId);
        document.querySelector('#todo-title-edit').value = todo.title;
        document.querySelector('#todo-description-edit').value = todo.description;
        document.querySelector('#todo-due-edit').value = todo.due;
        document.querySelector('#todo-priority-edit').value = todo.priority;
        document.querySelector('#todo-project-edit').value = todo.project;
    }

    // Function to close Edit To Do List Dialog
    function closeEditTodoDialog() {
        const dialog = document.querySelector('dialog#todo-dialog-edit');
        dialog.close();
    }

    // Function to show Info To Do List Dialog
    function showInfoTodoDialog(projectName, todoId) {
        const dialog = document.querySelector('dialog#todo-dialog-info');
        const todo = projectLogic.getTodo(projectName, todoId);

        const todoTitle = document.querySelector('#todo-title-info p');
        const todoDescription = document.querySelector('#todo-description-info p');
        const todoDue = document.querySelector('#todo-due-info p');
        const todoPriority = document.querySelector('#todo-priority-info p');
        const todoProject = document.querySelector('#todo-project-info p');
        const todoStatus = document.querySelector('#todo-status-info p');

        todoTitle.innerText = todo.title;
        todoDescription.innerText = todo.description;
        todoDue.innerText = format(todo.due, 'dd/MM/yyyy hh:mm a');
        todoPriority.innerText = todo.priority;
        todoProject.innerText = todo.project;
        todoStatus.innerText = todo.status ? 'Completed' : 'Not Completed';

        dialog.showModal();
    }

    // Function to close Info To Do List Dialog
    function closeInfoTodoDialog() {
        const dialog = document.querySelector('dialog#todo-dialog-info');
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
        showProject();
        showAllTodoList();
    }

    // Function to add and show to do list
    function addAndShowTodo(e) {
        e.preventDefault();
        const todoTitle = document.querySelector('#todo-title').value;
        const todoDescription = document.querySelector('#todo-description').value;
        const todoDue = document.querySelector('#todo-due').value;
        const todoPriority = document.querySelector('#todo-priority').value;
        const todoProject = document.querySelector('#todo-project').value;
        const todoStatus = false;

        const todoObject = Todo(todoTitle, todoDescription, todoDue, todoPriority, todoProject, todoStatus);

        todoLogic.addTodo(todoObject);
        showProjectTodoList(todoObject.project);
        closeAddTodoDialog();
    }

    // Function to edit and show to do list 
    function editAndShowTodo(e, projectName, todoId) {
        e.preventDefault();
        const todoTitle = document.querySelector('#todo-title-edit').value;
        const todoDescription = document.querySelector('#todo-description-edit').value;
        const todoDue = document.querySelector('#todo-due-edit').value;
        const todoPriority = document.querySelector('#todo-priority-edit').value;
        const todoProject = document.querySelector('#todo-project-edit').value;
        const todoStatus = false;

        const todoObject = Todo(todoTitle, todoDescription, todoDue, todoPriority, todoProject, todoStatus);

        todoLogic.editTodo(projectName, todoId, todoObject);
        showProjectTodoList(todoObject.project);
        closeEditTodoDialog();
    }

    // Function to edit and show the current all project
    function deleteAndShowTodo(projectName, todoId) {
        todoLogic.deleteTodo(projectName, todoId);
        showProjectTodoList(projectName);
    }

    // DOM Change/toggle the todo's status
    function toggleStatus(e) {
        const projectName = e.target.closest('.todo-item').dataset.todoProject;
        const todoId = e.target.closest('.todo-item').dataset.todoId;
        todoLogic.toggleTodoStatus(projectName, todoId);
    }

    return {
        renderProject,
        renderTodoList,
        showProject,
        showAllTodoList,
        showTodayTodoList,
        showThisWeekTodoList,
        showPriorityTodoList,
        showCompletedTodoList,
        showProjectTodoList,
        showAddProjectDialog, closeAddProjectDialog,
        showEditProjectDialog, closeEditProjectDialog,
        showAddTodoDialog, closeAddTodoDialog,
        showEditTodoDialog, closeEditTodoDialog,
        showInfoTodoDialog, closeInfoTodoDialog,
        addAndShowProject, editAndShowProject, deleteAndShowProject,
        addAndShowTodo, editAndShowTodo, deleteAndShowTodo,
        toggleStatus,
        renderSelectProject
    }
})();

export default DOM;