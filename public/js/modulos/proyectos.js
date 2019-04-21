import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
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
               Swal.fire(
                    'Proyecto eliminado!',
                    'Su proyecto ha sido eliminado correctamente.',
                    'success'
               );

               // redireccionar al inicio
               setTimeout(() => {
                    window.location.href='/'
               }, 4000);
          }
        })
})