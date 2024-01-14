import logo from '../images/todoLogo.svg';

const Header = (() => {
    function initHeader() {
        const header = document.querySelector('header');
        // Create the sidebar button(hamburger) and logo
        const hamburger = createHamburger();
        const logo = createLogo();

        header.append(hamburger, logo);
    }

    function createHamburger() {
        const container = document.createElement('label');
        container.classList.add('hamburger');
        container.innerHTML = `
            <input type="checkbox" />
        `;
        return container;
    }

    function createLogo() {
        const container = document.createElement('div');
        container.id = 'logo-container';
        container.innerHTML = `
            <img src="${logo}" alt="Jellist Logo"/>
            <h1>Jellist</h1>
        `;
        return container;
    }

    return {
        initHeader
    }
})();

export default Header;