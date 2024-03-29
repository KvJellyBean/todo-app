import addTodo from '../images/addList.svg'
import DOM from './dom';
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
        const addTodoDialog = _createAddTodoDialog();
        const editTodoDialog = _createEditTodoDialog();
        const infoTodoDialog = _createInfoTodoDialog();

        container.append(title, addButton, todoWrapper);
        main.append(container, addProjectDialog, editProjectDialog, addTodoDialog, editTodoDialog, infoTodoDialog);

        // DOM & Event Handler
        EventHandler.mainPage();
        DOM.renderSelectProject();
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
        dialog.id = 'project-dialog-add';
        dialog.innerHTML = `
            <form>
                <legend>Add New Project</legend>

                <div class="input-group">
                    <label for="project-name">Project Name: </label>
                    <input type="text" name="project-name" id="project-name" required placeholder="My Project">
                </div>
                
                <div class="button-group">
                    <button type="submit" class="submit-btn">Create</button>
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
                    <button type="submit" class="submit-btn">Apply</button>
                    <button type="button" class="cancel cancel-edit-project">Cancel</button>
                </div>
            </form>
        `;
        return dialog;
    }

    function _createAddTodoDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'todo-dialog-add';
        dialog.innerHTML = `
                <form>
                    <legend>Add To Do List</legend>
                    <div class="form-wrapper">
                        <div class="input-group">
                            <label for="todo-title">To Do: </label>
                            <input type="text" name="todo-title" id="todo-title" required placeholder="My Activity">
                        </div>
                        <div class="input-group">
                            <label for="todo-description">Description: </label>
                            <textarea name="todo-description" id="todo-description" required placeholder="Detail information of My Activity"></textarea>
                        </div>
                        <div class="input-group">
                            <label for="todo-due">Due Date: </label>
                            <input type="datetime-local" name="todo-due" id="todo-due" required>
                        </div>
                        <div class="input-group">
                            <label for="todo-priority">Priority: </label>
                            <select name="todo-priority" id="todo-priority" required">
                                <option value="High" selected>High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="todo-project">Project: </label>
                            <select name="todo-project" id="todo-project" class="todo-project" required>
                                
                            </select>
                        </div>
                    </div>
                    
                    <div class="button-group">
                        <button type="submit" class="submit-btn">Create</button>
                        <button type="button" class="cancel cancel-add-todo">Cancel</button>
                    </div>
                </form>
        `;
        return dialog;
    }

    function _createEditTodoDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'todo-dialog-edit';
        dialog.innerHTML = `
            <div class="form-wrapper">
                <form>
                    <legend>Edit To Do List</legend>

                    <div class="form-wrapper">
                        <div class="input-group">
                            <label for="todo-title-edit">To Do: </label>
                            <input type="text" name="todo-title-edit" id="todo-title-edit" required placeholder="My Activity">
                        </div>
                        <div class="input-group">
                            <label for="todo-description-edit">Description: </label>
                            <textarea name="todo-description-edit" id="todo-description-edit" required placeholder="Detail information of My Activity"></textarea>
                        </div>
                        <div class="input-group">
                            <label for="todo-due-edit">Due Date: </label>
                            <input type="datetime-local" name="todo-due-edit" id="todo-due-edit" required>
                        </div>
                        <div class="input-group">
                            <label for="todo-priority-edit">Priority: </label>
                            <select name="todo-priority-edit" id="todo-priority-edit" required">
                                <option value="High" selected>High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="todo-project-edit">Project: </label>
                            <select name="todo-project-edit" id="todo-project-edit" class="todo-project" required>
                                
                            </select>
                        </div>
                    </div>
                        
                    <div class="button-group">
                        <button type="submit" class="submit-btn">Apply</button>
                        <button type="button" class="cancel cancel-edit-todo">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        return dialog;
    }

    function _createInfoTodoDialog() {
        const dialog = document.createElement('dialog');
        dialog.id = 'todo-dialog-info';
        dialog.innerHTML = `
            <div class="info-container">
                <h4>Detail</h4>
                <div class="info-group" id="todo-title-info">
                    <h5>To Do:</h5>
                    <p></p>
                </div>

                <div class="info-group" id="todo-description-info">
                    <h5>Description:</h5>
                    <p></p>
                </div>

                <div class="info-group" id="todo-due-info">
                    <h5>Due Date:</h5>
                    <p></p>
                </div>

                <div class="info-group" id="todo-priority-info">
                    <h5>Priority Level:</h5>
                    <p></p>
                </div>

                <div class="info-group" id="todo-project-info">
                    <h5>Project:</h5>
                    <p></p>
                </div>

                <div class="info-group" id="todo-status-info">
                    <h5>Status:</h5>
                    <p></p>
                </div>
                <hr>

                <div class="button-group">
                    <button type="button" class="confirm">Confirm</button>
                </div>
            </div>
        `;
        return dialog;
    }
    return {
        initMain
    }
})();

export default Main;