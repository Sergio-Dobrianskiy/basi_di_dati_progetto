class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const page = this.getAttribute("page");

        this.innerHTML = `
            <header>
                <nav>
                    <h4>CITYCARD ` + page + `</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

customElements.define("header-component-home", Header);
