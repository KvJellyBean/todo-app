import DOM from "./dom";

const EventHandler = (() => {
    const _BUTTONS = {
        // At Home nav
        ALL_TASK: '.all-tasks',
        TODAY: '.today',
        UPCOMING: '.upcoming',
        PRIORITY: '.priority',
        COMPLETED: '.completed',

        // At Project nav
        ADD_PROJECT: '.add-project',
        EDIT_PROJECT: '.edit-project',
        DELETE_PROJECT: '.delete-project',
        PROJECT_LISTS: '.project-link',

        // At Main Page
        ADD_TODO: '.add-todo',
        EDIT_TODO: '.edit',
        DELETE_TODO: '.delete',
        INFO_TODO: '.info',
        CANCEL_ADD_PROJECT: '.cancel-add-project',
        CANCEL_EDIT_PROJECT: '.cancel-edit-project',
    }

    // ========================= SIDEBAR EVENT HANDLER ========================= //
    function homeSidebar() {
        document.addEventListener('DOMContentLoaded', () => {
            _createButtonFunctionality(_BUTTONS.ALL_TASK, DOM.showAllTodoList);
            _createButtonFunctionality(_BUTTONS.TODAY, DOM.showTodayTodoList);
            _createButtonFunctionality(_BUTTONS.UPCOMING, DOM.showUpcomingTodoList);
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
        });
    }

    // ========================= MAIN PAGE EVENT HANDLER ========================= //
    function mainPage() {
        document.addEventListener('DOMContentLoaded', () => {
            _createButtonFunctionality(_BUTTONS.ADD_TODO, function () { alert('Add To Do') });
            _createButtonFunctionality(_BUTTONS.CANCEL_ADD_PROJECT, DOM.closeAddProjectDialog);
            _createButtonFunctionality(_BUTTONS.CANCEL_EDIT_PROJECT, DOM.closeEditProjectDialog);
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
        const projectForm = document.querySelector('#project-dialog form');
        projectForm.removeEventListener('submit', DOM.addAndShowProject);

        addProjectButton.addEventListener('click', () => {
            DOM.showAddProjectDialog();
            projectForm.addEventListener('submit', DOM.addAndShowProject);
        });
    }

    // Event handler for 'Edit Project'
    function _editProjectButton() {
        const projectList = document.querySelector('#project-list');
        let oldName;

        function handleSubmit(e) {
            DOM.editAndShowProject(e, oldName);
        }

        projectList.addEventListener('click', (e) => {
            oldName = e.target.closest('li').dataset.projectName;
            document.querySelector('#project-dialog-edit form').removeEventListener('submit', handleSubmit);

            if (e.target.matches(_BUTTONS.EDIT_PROJECT)) {
                DOM.showEditProjectDialog();
                document.querySelector('#project-dialog-edit form').addEventListener('submit', handleSubmit);
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


    return {
        homeSidebar,
        projectSidebar,
        mainPage,
    }
})();

export default EventHandler;