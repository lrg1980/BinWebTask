// import tareas from "../modulos/tareas";
import Swal from "sweetalert2";
export const actualizarAvance = () => {
     // Seleccionar las tareas existentes
     const tareas = document.querySelectorAll('li.tarea');

     if (tareas.length) {
          // seleccionar las tareas completadas
          const tareasCompletas = document.querySelectorAll('i.completo');
          // calcular el avance
          const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
          //console.log(avance);
          // mostrar el avance
          const porcentaje = document.querySelector('#porcentaje');
          porcentaje.style.width = avance + '%';
          
          if (avance === 100) {
               Swal.fire(
                    'Buen trabajo, has finalizado el proyecto!',
                    'Haga click en Ok para continuar!',
                    'success'
                  )
          }
     }
}