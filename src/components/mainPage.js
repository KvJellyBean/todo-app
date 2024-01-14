const Main = (() => {
    function initMain() {
        const main = document.querySelector('main');
        // Create container for main content
        const container = createContainer();
        container.classList.add('container')

        // Create title and add button for to do list
        const title = createTitle();
        const addButton = createAddButton();
        const todoWrapper = createContainer();
        todoWrapper.classList.add('todo-wrapper');

        container.append(title, addButton, todoWrapper);
        main.append(container);
    }

    function createTitle() {
        const title = document.createElement('h3');
        title.classList.add('project-title');
        // title.innerText = `All Tasks`;
        return title
    }

    function createAddButton() {
        const button = document.createElement('button');
        button.classList.add('add-button');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        `;
        return button;
    }

    function createContainer() {
        const container = document.createElement('div');
        return container;
    }

    function createList() {
        const container = createContainer();
        container.classList.add('todo-item');
        container.innerHTML = `
            <div class="checklist">
                <input type="checkbox" />
            </div>
                
            <h4 class="todo-title">
            
            </h4>
            
            <div class="menu">
                    <svg class="edit" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>

                    <svg class="delete" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>

                    <svg class="detail" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            </div>
        `
        return container;
    }

    return {
        initMain
    }
})();

export default Main;