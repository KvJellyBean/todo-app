import DOM from "./dom";
import projectLogic from "./projectLogic";

const EventHandler = (() => {
    // Functionality gather for some buttons/elements
    function _createButtonFunctionality(button, buttonFunction) {
        const btn = document.querySelector(`.${button}`);
        btn.addEventListener('click', () => {
            buttonFunction();
        });
    }

    // Sidebar
    // Home Sidebar Event Handler
    function homeSidebar() {
        _createButtonFunctionality('all-tasks', DOM.showAllTodoList);
        _createButtonFunctionality('today', DOM.showTodayTodoList);
        _createButtonFunctionality('upcoming', DOM.showUpcomingTodoList);
        _createButtonFunctionality('priority', DOM.showPriorityTodoList);
        _createButtonFunctionality('completed', DOM.showCompletedTodoList);
    }

    // Project Sidebar Event Handler
    function projectSidebar() {
        const nav = document.querySelector('#project-nav');
        nav.addEventListener('click', (e) => {

            if (e.target.className === 'add-project') {
                DOM.showProjectDialog();
                document.querySelector('legend').innerText = 'Add Project';
            }
            else if (e.target.className === 'edit-project') {
                DOM.showProjectDialog();
                document.querySelector('legend').innerText = 'Edit Project';
            }
            else if (e.target.className === 'delete-project') {
                const projectName = e.target.closest('li').dataset.projectName;
                projectLogic.removeProject(projectName);
                DOM.showProject();
            } else if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
                const projectName = e.target.closest('li').dataset.projectName;
                DOM.showProjectTodoList(projectName);
            }
        });
    }

    // Main Page Event Handler
    // (Soon for: Togge Completed Event, Edit To Do Event, Delete To Do Event, Detail To Do Event)
    function mainPage() {
        _createButtonFunctionality('add-button', function () { alert('Add To Do') });
        _createButtonFunctionality('cancel', DOM.closeProjectDialog);
    }

    return {
        homeSidebar,
        projectSidebar,
        mainPage,
    }
})();

export default EventHandler;