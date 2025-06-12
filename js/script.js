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
                    <button onclick="AbrirModalEditar('${integrante.id}', '${integrante.nombre}', '${integrante.apellido}', '${integrante.correo}')">Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
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
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},//Tipo de dato enviado
        body: JSON.stringify({nombre, apellido, correo})//Datos enviadors
    });

    // verificar si la API responde que los datos fueron enviados correctamente
    if(respuesta.ok){
        alert("El resgistro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargamos la tabla
        ObtenerIntegrantes();
    }
    else{
        //En caso de que la API devuelva un codigo diferente a 200-299
        alert("El registro no pudo ser agregado")
    }
});


//Funcion para borrar registros
//se le pone el async para que el await de abajo no nos de error, para q no sea tan tardado
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    //Validamos si el usuario si escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //Recargar tabla despues de eliminar a alguien
        ObtenerIntegrantes();
    }
}



/*  Proceso para EDITAR un registro */

const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar")

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerramos el modal de Editar
});

function AbrirModalEditar(id, nombre, apellido, correo) {
    //Se agregan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;
 // Abrimos el modal despues de pasar
 modalEditar.showModal();
 
}