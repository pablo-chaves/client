import React, { useState, useEffect } from 'react';
import useCreatePost from './hooks/useCreatePost';
import { Steps, Button, message } from 'antd';
import axios from 'axios';

// import 'antd/dist/antd.css';
import './step.css';

const { Step } = Steps;

const ProgressBar = () => {
  const { postDetails, current, setCurrent, steps, infoPlan } = useCreatePost();

  const prev = () => {
    setCurrent(current - 1);
  };
  //====================Mercadopago=======================================================
  const { REACT_APP_API_BASE_ENDPOINT } = process.env;
  function createCheckoutButton(preference) {
    const script = document.createElement('script');
    const attrDataPreference = document.createAttribute('data-preference-id');
    attrDataPreference.value = preference.id;
    script.src =
      'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
    script.setAttributeNode(attrDataPreference);
    if (document.getElementById('buttonId')) {
      document.getElementById('buttonId').innerHTML = '';
      document.getElementById('buttonId').appendChild(script);
      return () => {
        document.getElementById('buttonId').removeChild(script);
      };
    }
  }

    useEffect(() => {
      if(current === 5) {
        localStorage.setItem('post', JSON.stringify(postDetails))
        // axios.post(`http://localhost:3001/mercadopago`, infoPlan)
        axios.post(`${REACT_APP_API_BASE_ENDPOINT}/mercadopago`, infoPlan)
          .then((r) => {
            createCheckoutButton(r.data);
          })
      }
    }, [current, infoPlan]);
    //====================Mercadopago=======================================================

  return (
    <div className='ctn'>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>{steps[current].content}</div>
      <div className='steps-action'>
        {current === steps.length - 1 && (
          <Button
            type='primary'
            id='buttonId'
            // onClick={handlerClick}
            // onClick={() => {
            //   const resp = window.confirm(
            //     `¿Quieres crear la publicación ${postDetails.post_name}?`
            //   );
            //   if (resp) {
            //     addPostService(postDetails);
            //     message.success(
            //       `Tu publicación '${postDetails.post_name}' creada correctamente `
            //     );
            //     sendPaymentEmail(post);
            //   }
            //}}
          >
            Publicar
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Volver
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
