//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/bQ8m9l/integrantes";

//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrantes() {
    //Respuesta del servidor
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); //Esto es un JSON 

    //Enviamos el JSON a la función que genera las filas en la tabla
    MostrarDatos(data);
}

//Función paa crear las filas de la tabla en base a un JSON
//"datos" representará al JSON donde viene la información
function MostrarDatos(datos){

    //Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody");
    
    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla 

    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();


// Proceso para agregar un nuevo integrante

const modal = document.getElementById("mdAgregar"); // cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); // Boton para agregar
const btnCerrar = document.getElementById("btnCerrar"); // Boton para cerrar el popup

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hacer clic en el boton
})

btnCerrar.addEventListener("click", ()=>{
    modal.close(); 
})

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Esto representa a "submit". Evita que el formulario se envie de un solo.

    //capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    // Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL);
});