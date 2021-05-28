import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import image from '../../images/pago.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  addPostService,
  sendPaymentEmail,
} from '../../Services/properties.service';
import style from './Successful.module.css';

const Successful = ({ match }) => {
  const { REACT_APP_API_BASE_ENDPOINT } = process.env;
  const { planId, planTitle } = match.params;
  const search = useLocation().search;
  const { user } = useAuth0();
  const { session } = useSelector((store) => store);
  const [plans, setPlans] = useState([]);
  const [order, setOrder] = useState(false);
  function query(url) {
    const obj = {};
    const array = url.replace('?', '').split('&');
    for (let i = 0; i < array.length; i++) {
      let arr = array[i].split('=');
      obj[arr[0]] = arr[1];
    }
    return obj;
  }
  const {
    status, // se usa para crear la order (approved)
    payment_id, // se usa para crear la order
    external_reference, // va a ser el id de la orden en la db
  } = query(search);
  // const post = {
  //   name: user.name,
  //   email: user.email,
  //   title: postDetails.post_name,
  //   image: postDetails.images ? postDetails.images[0] : null,
  //   price: postDetails.price,
  //   plan: postDetails.premium ? 'Premium' : 'Basic',
  //   date: expirationDate,
  // };
  useEffect(() => {
    axios.get(`${REACT_APP_API_BASE_ENDPOINT}/mercadopago/plans`)
    .then((r) => {
      setPlans(r.data.filter((e) => e.id === planId));
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const obj = {
      userId: session.id,
      servicePlanId: planId,
      status: 'active',
      paymentStatus: status,
      paymentId: payment_id,
      id: external_reference,
    };
    axios
      //.post(`http://localhost:3001/mercadopago/order`, obj)
      .post(`${REACT_APP_API_BASE_ENDPOINT}/mercadopago/order`, obj)
      .then((r) => {
        setOrder(r.data.filter((e) => e.id === external_reference));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.ctn}>
      {!order ? <h1>Cargando...</h1>
        :<div className={style.success}>
        <img src={image} alt='img' className={style.img}/>
        <div className={style.divCheck}><h1 className={style.check}><FontAwesomeIcon icon={faCheck} /></h1></div>
        <h1>{`Tu pago del plan ${planTitle} fue exitoso`}</h1>
        <h2>{`$ ${plans[0]?.price}`}</h2>
        <div className={style.divInfo}>
        <h1>Plublicación creada con exito</h1>
        <span>{`Recuerda que tu publicación tendra una ${plans[0]?.description.toLowerCase()} apartir de la fecha`}</span>
        <Link to='/home'>
          <button>Salir</button>
        </Link>
        </div>
      </div>}
    </div>
  );
};

export default Successful;
