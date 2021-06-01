import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import style from '../ButtonsBar.module.css';
import Swal from 'sweetalert2';

function DetailButtonBar({ rol, id, path, userId, deleteAction }) {
  let diccionario = {
    posts: 'publicación',
    bookings: 'reserva'
  }
  return (
    <div className={style.ctn}>
      <div className={style.elementsCtn}>
        <Link to={`/panel/${rol}`} onClick={() => {
          // !window.confirm(`¿Quieres descartar los cambios de ${element} con id ${id}?`) && console.log('no hagas nada');
        }}
        >
          <label>
            <FontAwesomeIcon icon={faArrowLeft} />
            {' Panel'}
          </label>
        </Link>
        <div className={style.btnCtn}>
          {id !== userId &&
            <button type="button" className={style.btnBar} onClick={() => {
              // const resp = window.confirm(`¿Quieres eliminar ${path} con id ${id}?`)
              // if (resp) deleteAction(id, userId);
              Swal.fire({
                title: 'Estas seguro?',
                text: 'No podras revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log('eliminando...');
                  deleteAction(id, userId);
                  Swal.fire(
                    'Eliminado!',
                    `Su ${diccionario[window.location.pathname.split('/').slice(-2)[0]]} ha sido eliminada`,//'Your file has been deleted.',
                    'success'
                  )}});
            }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              {'  Eliminar'}
            </button>
          }
          <Link to={`/panel/${path}/${id}/edit`} className={style.btnBar}>
            <FontAwesomeIcon icon={faEdit} />
            {' Editar'}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailButtonBar;
