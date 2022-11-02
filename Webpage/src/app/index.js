// Integracion Express.js
const app = require('../../expressApp.js');
// API
//TODO: Añadir este js con type="module"
//Importa los comandos para conectarse a FIrebase
/*TODO: 
    const querySnapshot = await listarTodoAlumno()
    querySnapshot.forEach(doc => {
        console.log(doc.data())
    })*/


/*
window.addEventListener('DOMContentLoaded', async () => {

});*/

app.listen(app.get('port'), () => {
    console.log("Port initialize on port " + String(app.get('port')));
});