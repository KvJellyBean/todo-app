import header from './components/header.js';
import sidebar from './components/sidebar.js';
import main from './components/mainPage.js';
import footer from './components/footer.js';
import './style.css';
import EventHandler from './components/eventHandler.js';
import DOM from './components/dom.js';

function initApp() {
    const content = document.querySelector('#content');
    const headerTag = document.createElement('header');
    const sidebarTag = document.createElement('nav');
    const mainTag = document.createElement('main');
    const footerTag = document.createElement('footer');
    content.append(headerTag, sidebarTag, mainTag, footerTag);
}

// Load main page (first come);
const loadDisplay = (() => {
    initApp();
    header.initHeader();
    sidebar.initSidebar();
    main.initMain();
    footer.initFooter();
    DOM.showAllTodoList();
})();