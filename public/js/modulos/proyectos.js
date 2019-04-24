import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
     
     btnEliminar.addEventListener('click', e => {
          const urlProyecto = e.target.dataset.proyectoUrl;
          // console.log('diste click en eliminar');
          Swal.fire({
               title: 'Está seguro de eliminar?',
               text: "Una vez eliminado, no se puede revertir!",
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Sí, estoy seguro!',
               cancelButtonText: 'No estoy seguro, cancelar'
          }).then((result) => {
               if (result.value) {
                    // enviar peticion a axios
                    const url = `${location.origin}/proyectos/${urlProyecto}`;

                    axios.delete(url, { params: { urlProyecto } })
                         .then(function (respuesta) {
                              //console.log(respuesta)
                              Swal.fire(
                                   'Proyecto eliminado!',
                                   respuesta.data,
                                   'success'
                              );
                         
                              // redireccionar al inicio
                              setTimeout(() => {
                                   window.location.href = '/'
                              }, 4000);
                         })
                         .catch(() => {
                              Swal.fire({
                                   type: 'error',
                                   title: 'Hubo un error',
                                   text: 'No se pudo eliminar el proyecto'
                              })
                         })
               }
          })
     })
}

export default btnEliminar;