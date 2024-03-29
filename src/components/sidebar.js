import DOM from './dom.js';
import EventHandler from './eventHandler.js';
import allTasks from '../images/allTask.svg';
import today from '../images/today.svg';
import upcoming from '../images/upcoming.svg';
import priority from '../images/priority.svg';
import completed from '../images/completed.svg';
import addProject from '../images/addProject.svg';

const Sidebar = (() => {
    function initSidebar() {
        const sidebar = document.querySelector('nav');

        // Create home & project menu
        const home = _createHomeContainer();
        const project = _createProjectContainer();

        sidebar.append(home, project);

        // DOM & Event Handler
        DOM.showProject();
        EventHandler.homeSidebar();
        EventHandler.projectSidebar();

        return sidebar;
    }

    function _createHomeContainer() {
        const container = document.createElement('div');
        container.id = 'home-nav';
        container.classList.add('sidebar');
        container.innerHTML = `
            <hr>    
            <h2>Home</h2>
            <hr>    
            <ul id="home-categories">
                <li data-section><a href="#" class="all-tasks"><img data-section class="all-tasks" src="${allTasks}" alt="All Tasks Icon" /> All Tasks</a></li>
    
                <li data-section><a href="#" class="today"><img data-section class="today" src="${today}" alt="Today Icon" />Today</a></li>
    
                <li data-section><a href="#" class="this-week"><img data-section class="this-week" src="${upcoming}" alt="This Week Icon" /> This Week</a></li>
    
                <li data-section><a href="#" class="priority"><img data-section class="priority" src="${priority}" alt="Priority Icon" /> Priority</a></li>
    
                <li data-section><a href="#" class="completed"><img data-section class="completed" src="${completed}" alt="Completed Icon" /> Completed</a></li>
            </ul>
            <hr>
        `;
        return container;
    }

    function _createProjectContainer() {
        const container = document.createElement('div');
        container.id = 'project-nav';
        container.classList.add('sidebar');
        container.innerHTML = `
            <hr>
            <div class="project-container">
                <h2>Project</h2>
                <img class="add-project" src="${addProject}" alt="Add Project" />
            </div>
            <hr>
                <ul id="project-list">

                </ul>
            <hr>
        `;
        return container;
    }

    return {
        initSidebar
    }
})();

export default Sidebar;