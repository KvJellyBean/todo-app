import DOM from "./dom";
import todoLogic from "./todoLogic";

const EventHandler = (() => {
    const _BUTTONS = {
        // At Home nav
        ALL_TASK: '.all-tasks',
        TODAY: '.today',
        THIS_WEEK: '.this-week',
        PRIORITY: '.priority',
        COMPLETED: '.completed',

        // At Project nav
        ADD_PROJECT: '.add-project',
        CANCEL_ADD_PROJECT: '.cancel-add-project',
        EDIT_PROJECT: '.edit-project',
        CANCEL_EDIT_PROJECT: '.cancel-edit-project',
        DELETE_PROJECT: '.delete-project',
        PROJECT_LISTS: '.project-link',

        // At Main Page
        ADD_TODO: '.add-todo',
        CANCEL_ADD_TODO: '.cancel-add-todo',
        EDIT_TODO: '.edit',
        CANCEL_EDIT_TODO: '.cancel-edit-todo',
        DELETE_TODO: '.delete',
        INFO_TODO: '.info',
        CONFIRM_INFO_TODO: '.confirm',
        CHECKLIST_TODO: '.checklist input',
        TODO_LIST: '.todo-title',
    }

    // ========================= SIDEBAR EVENT HANDLER ========================= //
    function homeSidebar() {
        document.addEventListener('DOMContentLoaded', () => {
            _createButtonFunctionality(_BUTTONS.ALL_TASK, DOM.showAllTodoList);
            _createButtonFunctionality(_BUTTONS.TODAY, DOM.showTodayTodoList);
            _createButtonFunctionality(_BUTTONS.THIS_WEEK, DOM.showThisWeekTodoList);
            _createButtonFunctionality(_BUTTONS.PRIORITY, DOM.showPriorityTodoList);
            _createButtonFunctionality(_BUTTONS.COMPLETED, DOM.showCompletedTodoList);
        });
    }

    function projectSidebar() {
        document.addEventListener('DOMContentLoaded', () => {
            _addProjectButton();
            _editProjectButton();
            _deleteProjectButton();
            _projectListButton();
            _createButtonFunctionality(_BUTTONS.CANCEL_ADD_PROJECT, DOM.closeAddProjectDialog);
            _createButtonFunctionality(_BUTTONS.CANCEL_EDIT_PROJECT, DOM.closeEditProjectDialog);
        });
    }

    // ========================= MAIN PAGE EVENT HANDLER ========================= //
    function mainPage() {
        document.addEventListener('DOMContentLoaded', () => {
            _checklistButton();
            _todoListButton();
            _addTodoButton();
            _editTodoButton();
            _deleteTodoButton();
            _infoTodoButton();
            _createButtonFunctionality(_BUTTONS.CANCEL_ADD_TODO, DOM.closeAddTodoDialog);
            _createButtonFunctionality(_BUTTONS.CANCEL_EDIT_TODO, DOM.closeEditTodoDialog);
            _createButtonFunctionality(_BUTTONS.CONFIRM_INFO_TODO, DOM.closeInfoTodoDialog);
        });
    }

    // ========================= FUNCTIONS ========================= //
    // Functionality shortcut adder for buttons/elements
    function _createButtonFunctionality(button, buttonFunction) {
        const btn = document.querySelector(button);
        btn.addEventListener('click', buttonFunction)
    }

    // Event handler for 'Add Project'
    function _addProjectButton() {
        const addProjectButton = document.querySelector(_BUTTONS.ADD_PROJECT);
        const projectForm = document.querySelector('#project-dialog-add form');
        projectForm.removeEventListener('submit', DOM.addAndShowProject);

        addProjectButton.addEventListener('click', () => {
            DOM.showAddProjectDialog();
            projectForm.addEventListener('submit', DOM.addAndShowProject);
        });
    }

    // Event handler for 'Edit Project'
    function _editProjectButton() {
        const projectList = document.querySelector('#project-list');
        const projectForm = document.querySelector('#project-dialog-edit form');
        let oldName;

        function handleSubmit(e) {
            DOM.editAndShowProject(e, oldName);
        }

        projectList.addEventListener('click', (e) => {
            projectForm.removeEventListener('submit', handleSubmit);

            if (e.target.matches(_BUTTONS.EDIT_PROJECT)) {
                oldName = e.target.closest('li').dataset.projectName;
                DOM.showEditProjectDialog(oldName);
                projectForm.addEventListener('submit', handleSubmit);
            }
        });
    }

    // Event handler for 'Delete Project'
    function _deleteProjectButton() {
        const projectList = document.querySelector('#project-list');

        projectList.addEventListener('click', (e) => {
            if (e.target.matches(_BUTTONS.DELETE_PROJECT)) {
                const projectName = e.target.closest('li').dataset.projectName;
                DOM.deleteAndShowProject(projectName)
            }
        })
    }

    // Event handler for All Project Lists
    function _projectListButton() {
        const projectList = document.querySelector('#project-list');

        projectList.addEventListener('click', (e) => {
            if (e.target.matches(_BUTTONS.PROJECT_LISTS)) {
                const projectName = e.target.closest('li').dataset.projectName;
                DOM.showProjectTodoList(projectName);
            }
        });
    }

    // Event handler(s) for Checklist button todo, to toggle the todo's status
    function _checklistButton() {
        const checklists = document.querySelectorAll(_BUTTONS.CHECKLIST_TODO);

        checklists.forEach(checklist => {
            checklist.addEventListener('change', DOM.toggleStatus);
        })
    }

    function _todoListButton() {
        const todoWrapper = document.querySelector('.todo-wrapper');

        todoWrapper.addEventListener('click', (e) => {
            if (e.target.matches(_BUTTONS.TODO_LIST)) {
                const checklist = e.target.closest('.todo-item').querySelector(_BUTTONS.CHECKLIST_TODO);
                checklist.checked = checklist.checked === false ? true : false;
                DOM.toggleStatus(e);
            }
        });
    }

    // Fvent handler for Add To Do Button
    function _addTodoButton() {
        const addTodoButton = document.querySelector(_BUTTONS.ADD_TODO);
        const todoForm = document.querySelector('#todo-dialog-add form');
        todoForm.removeEventListener('submit', DOM.addAndShowTodo);

        addTodoButton.addEventListener('click', () => {
            DOM.showAddTodoDialog();
            todoForm.addEventListener('submit', DOM.addAndShowTodo);
        });
    }

    // Fvent handler for Edit To Do
    function _editTodoButton() {
        const todoWrapper = document.querySelector('.todo-wrapper');
        const todoForm = document.querySelector('#todo-dialog-edit form');
        let projectName, todoId;

        function handleSubmit(e) {
            DOM.editAndShowTodo(e, projectName, todoId);
        }

        todoWrapper.addEventListener('click', (e) => {
            todoForm.removeEventListener('submit', handleSubmit);

            if (e.target.matches(_BUTTONS.EDIT_TODO)) {
                projectName = e.target.closest('.todo-item').dataset.todoProject;
                todoId = e.target.closest('.todo-item').dataset.todoId;
                DOM.showEditTodoDialog(projectName, todoId);
                todoForm.addEventListener('submit', handleSubmit);
            }
        });
    }

    // Fvent handler for Delete To Do
    function _deleteTodoButton() {
        const todoWrapper = document.querySelector('.todo-wrapper');

        todoWrapper.addEventListener('click', (e) => {
            if (e.target.matches(_BUTTONS.DELETE_TODO)) {
                const projectName = e.target.closest('.todo-item').dataset.todoProject;
                const todoId = e.target.closest('.todo-item').dataset.todoId;
                DOM.deleteAndShowTodo(projectName, todoId);
            }
        });
    }

    // Fvent handler to show detail of the to do list
    function _infoTodoButton() {
        const todoWrapper = document.querySelector('.todo-wrapper');

        todoWrapper.addEventListener('click', (e) => {
            if (e.target.matches(_BUTTONS.INFO_TODO)) {
                const projectName = e.target.closest('.todo-item').dataset.todoProject;
                const todoId = e.target.closest('.todo-item').dataset.todoId;
                DOM.showInfoTodoDialog(projectName, todoId);
            }
        });
    }

    return {
        homeSidebar,
        projectSidebar,
        mainPage,
    }
})();

export default EventHandler;