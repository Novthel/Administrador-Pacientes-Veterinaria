//variables y selectores
const formulario = document.querySelector('#nueva-cita');
const ContenedorCitas = document.querySelector('#citas');

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

let editando;

// objeto que almacenara los datos de entrada
const datosObj = {

    mascota : '',
    propietario : '',
    telefono : '',
    fecha : '',
    hora : '',
    sintomas : ''

};

//clases

class Administrador{
    constructor(){
        this.listaCitas = [];
    };

    /*
        El metodo agregarCita recibe 1 objeto como argumento, toma una copia del array  listaCitas = []
        y le agrega el nuevo objeto
    */
    agregarCita(datosObj){
        this.listaCitas = [...this.listaCitas, datosObj]
        //console.log(this.listaCitas) 
    };

    /*
        El metodo eliminarCita recibe 1 argumento, devuelve una lista nueva sin el objeto cuyo id fue recibido.
    */

    eliminarCita(id){
        this.listaCitas = this.listaCitas.filter( cita => cita.id !== id )
        //console.log(this.listaCitas)
    };

    editarCita(citaActualizada){

        this.listaCitas = this.listaCitas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);  
    };

};



class IU{

    /*
    El metodo aviso recibe 2 argumentos, el primero el mensaje q se va a mostrar en pantalla y el segundo 
    es el tipo, si el tipo es igual a error el mensaje se mostrara en color rojo de lo contrario sera color
    verde. La funcion mostrar el mensaje al usuario por un lapso de dos segundos. 
    */

    aviso(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert', 'text-center', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger'); 
        }else{
            divMensaje.classList.add('alert-success');  
        };

        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divMensaje.remove();
        },2000);

    };

    /*
        mostrarCitas: Se le pasa el array como argumento mostrarCitas( {listaCitas}) extrayendolo del objeto mediante desestructuracion. 
        
        Administrador {listaCitas: Array(1)}
                            listaCitas: Array(1)
                            0: {mascota: 'lulu', propietario: 'oscar novoa', telefono: '3244556666', fecha: '2022-03-05', hora: '07:14', …}
                            length: 1
                            [[Prototype]]: Array(0)
                            [[Prototype]]: Object
        la funcion procesa la informacion y se encarga de mostrar por pantalla la informacion consultada por el usuario.
    */

    mostrarCitas( {listaCitas}){
        limpiarHTML();

        listaCitas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder')
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class='font-weight-bolder'> Propietario: </span> ${ propietario }`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class='font-weight-bolder'> Telefono: </span> ${ telefono }`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class='font-weight-bolder'> Fecha: </span> ${ fecha }`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class='font-weight-bolder'> Hora: </span> ${ hora }`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class='font-weight-bolder'> Sintomas: </span> ${ sintomas }`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = ` Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;
            btnEliminar.onclick = ()=> eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-success', 'mr-2');
            btnEditar.innerHTML = ` Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg> `;
            btnEditar.onclick = ()=> editarCita(cita);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            ContenedorCitas.appendChild(divCita)

        });

    };
};


//instancias de clase

const interfaz = new IU();
const adminCita = new Administrador();


/*
    La funcion datoCita recibe el evento como argumento, su funcion es insertar en el objeto datosObj
    el valor seleccionado por el usuario en los selectores respectivos.
*/
function datoCita(e){
    datosObj[e.target.name] = e.target.value;
};

/*
    La funcion nuevaCita recibe el objeto datosObj y realiza la verificacion de los campos, si un acampo esta vacio invoca la funcion aviso con 
    argumento de tipo igua a error, de lo contrario verifica si editando === true, si es true invoca el metod editarCita sino invoca el metodo
    agregarCita
*/
function nuevaCita(e){
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas  } = datosObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        interfaz.aviso('Todos los campos son obligatorios', 'error');
        return;
    };

    if(editando){
         // se invoca el metodo editarCita y se le pasa como argumento una copia del objeto global {...datosObj}
        adminCita.editarCita({...datosObj});
        interfaz.aviso('Cambio exitoso');
        
        // el boton cambia de nombre de  guardar cambios a crear citas, al recibir click invoca la funcion nueva cita
        formulario.querySelector("button[type='submit']").textContent = 'Crear cita';
        editando = false;

    }else{
        // se agrega un id al objeto
        datosObj.id = Date.now()
        // se invoca el metodo agregarCita y se le pasa como argumento una copia del objeto global {...datosObj}
        adminCita.agregarCita({...datosObj})
    };
    // reinicio del objeto para validacion
    reiniciarObj();

    // Se pasa como argumento la instancia de clase completa
    interfaz.mostrarCitas(adminCita);
    
    // reinicio del formulario
    formulario.reset();
};

// reinicia el objeto datosObj
function reiniciarObj(){
    datosObj.mascota = '';
    datosObj.propietario = '';
    datosObj.telefono = '';
    datosObj.fecha = '';
    datosObj.hora = '';
    datosObj.sintomas = ''

};

// elimina la cita y renderiza nuevamente la pantalla
function eliminarCita(id){
    adminCita.eliminarCita(id);
    interfaz.mostrarCitas(adminCita);

};


/*
    La funcion editarCita recibe el objeto cita como argumento, llena el formulario y datosObj con los datos de la cita 
*/ 
function editarCita(cita){
    
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // llenar los input
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    datosObj.mascota = mascota;
    datosObj.propietario = propietario;
    datosObj.telefono = telefono;
    datosObj.fecha = fecha;
    datosObj.hora = hora;
    datosObj.sintomas = sintomas;
    datosObj.id = id;

    // el boton cambia de nombre de crear cita a guardar cambios, al recibir click invica la funcion nueva cita

    formulario.querySelector("button[type='submit']").textContent = 'Guardar Cambios';
    editando=true;

};

/*
    La funcion limpiarHTML es invocada para limpiar la seccion que muestra el resultado de la operacion.
*/
function limpiarHTML(){
    while(ContenedorCitas.firstChild){
        ContenedorCitas.removeChild(ContenedorCitas.firstChild);
    }
}


//EventListener

mascotaInput.addEventListener('input', datoCita);
propietarioInput.addEventListener('input', datoCita);
telefonoInput.addEventListener('input', datoCita);
fechaInput.addEventListener('input', datoCita);
horaInput.addEventListener('input', datoCita);
sintomasInput.addEventListener('input', datoCita);

formulario.addEventListener('submit', nuevaCita);