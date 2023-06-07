const express = require('express');
const router = require('./routers/user.routers');
const app = express();
const port = 3000;
const localhost='localhost';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(port, () => {
    console.log(`Serveur démarrer sur le port: http://${localhost}:${port}`);
});

