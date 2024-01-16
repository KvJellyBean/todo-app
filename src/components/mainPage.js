import addTodo from '../images/addList.svg'
import EventHandler from './eventHandler';

const Main = (() => {
    function initMain() {
        const main = document.querySelector('main');

        // Create container for main content
        const container = _createContainer();
        container.classList.add('container')

        // Create title, add button, and wrapper for to do list
        const title = _createTitle();
        const addButton = _createAddButton();
        const todoWrapper = _createContainer();
        todoWrapper.classList.add('todo-wrapper');

        // Create Dialogs
        const addProjectDialog = _createAddProjectDialog();
        const editProjectDialog = _createEditProjectDialog();
        const todoDialog = _createTodoDialog();

        container.append(title, addButton, todoWrapper);
        main.append(container, addProjectDialog, editProjectDialog, todoDialog);

        // Event Handler
        EventHandler.mainPage();
    }

    function _createTitle() {
        const title = document.createElement('h3');
        title.classList.add('project-title');
        return title;
    }

    function _createAddButton() {
        const button = document.createElement('button');
        button.classList.add('add-todo');
        button.innerHTML = `
            <img src=${addTodo} alt="Add To Do Button" />
        `;
        return button;
    }

    function _createContainer() {
        const container = document.createElement('div');
        return container;
    }

    function _createAddProjectDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'project-dialog';
        dialog.innerHTML = `
            <form>
                <legend>Add New Project</legend>

                <div class="input-group">
                    <label for="project-name">Project Name: </label>
                    <input type="text" name="project-name" id="project-name" required placeholder="My Project">
                </div>
                
                <div class="button-group">
                    <button type="submit" class="submit-btn create-project">Create</button>
                    <button type="button" class="cancel cancel-add-project">Cancel</button>
                </div>
            </form>
        `;
        return dialog;
    }

    function _createEditProjectDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'project-dialog-edit';
        dialog.innerHTML = `
            <form>
                <legend>Edit Project</legend>

                <div class="input-group">
                    <label for="project-name">Project Name: </label>
                    <input type="text" name="project-name" id="project-name-edit" required placeholder="My Project">
                </div>
                
                <div class="button-group">
                    <button type="submit" class="submit-btn edit-project">Create</button>
                    <button type="button" class="cancel cancel-edit-project">Cancel</button>
                </div>
            </form>
        `;
        return dialog;
    }

    function _createTodoDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'todo-dialog';
        dialog.innerHTML = `
        
        `;
        return dialog;
    }

    return {
        initMain
    }
})();

export default Main;