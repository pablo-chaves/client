/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faEye,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import style from './ButtonOptions.module.css';
import Swal from 'sweetalert2';

function ButtonOptions({
  id, buttonPath, deleteAction, msg, userId
}) {
  let diccionario = {
    posts:'publicación',
    bookings:'reserva'
 }
  return (
    <div className={style.ctn}>
      <input type="checkbox" id={id} className={style.checkbox} />
      <label htmlFor={id} className={style.button}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </label>
      <nav className={style.nav}>
        <NavLink to={`/panel/detail/${buttonPath}/${id}`} className={style.NavLink}>
          <FontAwesomeIcon icon={faEye} />
          {' Ver'}
        </NavLink>
        <NavLink to={`/panel/${buttonPath}/${id}/edit`} className={style.NavLink}>
          <FontAwesomeIcon icon={faEdit} />
          {' Editar'}
        </NavLink>
        <span className={style.NavLink} onClick={() => {
          // const resp = window.confirm(`¿Quieres eliminar ${buttonPath} con id ${id}?`)
          // if (resp) deleteAction(id, userId);
          console.log('Location: ', window.location.pathname.split('/').slice(-1)[0]);
          Swal.fire({
            title: 'Estas seguro?', // 'Are you sure?',
            text: 'No podras revertir esto!', //"You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',//'Yes, delete it!'
            cancelButtonText: 'Cancelar',//'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('eliminando...');
              deleteAction(id, userId);
              Swal.fire(
                'Eliminado!',
                `Su ${diccionario[window.location.pathname.split('/').slice(-1)[0]]} ha sido eliminada`,//'Your file has been deleted.',
                'success'
              )
            }
          })

        }}>

          <FontAwesomeIcon icon={faTrashAlt} />
          {' Eliminar'}
        </span>
      </nav>
    </div>
  );
}
const mapStateToProps = (state) => ({
  msg: state.message,
});

export default connect(mapStateToProps)(ButtonOptions);
