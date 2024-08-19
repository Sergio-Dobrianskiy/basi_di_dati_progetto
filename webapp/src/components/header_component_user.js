class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const page = this.getAttribute("page");
        // const name = this.getAttribute("name");

        this.innerHTML = `
            <header>
                <nav>
                    <h4 id="salutoUtente">Ciao</h4>
                    <ul>
                    <li><a href="/` + page + `_home">Back</a></li>
                    <li><a href="/home">Logout</a></li>
                    </ul>
                </nav>
            </header>
            `;
    }

    convertToTitleCase(str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
}

customElements.define("header-component-user", Header);
