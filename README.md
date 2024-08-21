# basi_di_dati_progetto
Progetto e relazione per l'esame di basi di dati

# template webapp
- [YouTube](https://www.youtube.com/watch?v=vrj9AohVhPA)
- https://github.com/npatel023/ExpressMySQL/tree/master

# Template index/login/registration
- [LogRocket](https://blog.logrocket.com/building-simple-login-form-node-js/)
- https://github.com/KingsleyUbah/Nodejs-form/blob/main/views/login.hbs

# Installazione su windows
- Scaricare e installare: [Link](https://nodejs.org/en/download/prebuilt-installer)
- spostarsi in /basi_di_dati_progetto/webapp/server
- `node install`
- npm install -g nodemon


# avvio app
- posizionarsi in /basi_di_dati_progetto/webapp/
- `npm start` oppure `nodemon src/app`
- andare a http://localhost:5000/

# dump
- da dentro la cartella `\web_app` lanciare il comando `mysqldump -uroot -p1234  web_app > dump.sql`
- non vanno gli spazi dopo i primi due flag

# restore
- dalla cartella `web_app` lanciare il comando:
    - su windows: `Get-Content dump.sql | mysql -uroot -p1234 web_app`
    - su unix: `mysql -uroot -p1234 < dump.sql`
