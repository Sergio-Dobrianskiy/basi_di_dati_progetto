class Header extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const page = this.getAttribute("page");

        var testo = `
            <header>
                <nav>
                    <h4 id="salutoUtente">Ciao</h4>
                    <ul>`
        if (page != "" ) {
            testo += `<li id="button_back"><a  href="/` + page + `">Back</a></li>`
        } else {
            testo += `<li><a href="/user_profile">Profilo</a></li>`
        }
        testo +=`
                    <li onclick="logout()"><a href="/home">Logout</a></li>
                    </ul>
                </nav>
            </header>
            `;
            this.innerHTML = testo;
    }

    convertToTitleCase(str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }
}

customElements.define("header-component-user", Header);
