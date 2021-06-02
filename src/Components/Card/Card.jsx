import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faBed, faBath, faRulerCombined,
} from '@fortawesome/free-solid-svg-icons';
// import { FaRegHeart } from 'react-icons/fa';
import { RiVipCrownLine } from 'react-icons/ri';
import style from './Card.module.css';
import { addViewsService } from '../../Services/views.service';

export default function Card({
  image, postName, propType, neighborhood, description, price, rooms, bathrooms, m2, id, premium, views
}) {

  async function contarVisita() {
    try {
      await addViewsService(id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={style.ctn}>
      <div className={style.imgCtn} onClick={contarVisita}>
        <Link to={`/post/${id}`}>
          <img src={image} alt={`${propType} en ${neighborhood}`} className={style.img} loading='lazy'/>
        </Link>
      </div>
      <div className={style.texts}>
        <div className={style.propTitle}>
          <div className={style.title} onClick={contarVisita}>
            <Link to={`/post/${id}`}>
              <h3>{postName}</h3>
            </Link>
          </div>
          <div className={style.premium}>
            {premium &&
              <div className={style.crown}>
                <RiVipCrownLine size={20} />
              </div>
            }
          </div>
        </div>
        <div className={style.general}>
            <div className={style.price}>
              <h3>{`$${new Intl.NumberFormat('de-DE').format(price)}`}</h3>
            </div>
            <div className={style.details}>
              <div className={style.description}>
                {description ?
                  <p>{description.slice(0, 50)}...</p>
                : <p>{`${propType} en ${neighborhood}`}</p> 
                }
              </div>
              <div className={style.icons}>
                <p>
                  {rooms}
                  <span className={style.icon}>
                    <FontAwesomeIcon icon={faBed} />
                  </span>
                </p>
                <p>
                  {bathrooms}
                  <span className={style.icon}>
                    <FontAwesomeIcon icon={faBath} />
                  </span>
                </p>
                <p>
                  {m2}
                  <span className={style.icon}>
                    <FontAwesomeIcon icon={faRulerCombined} />
                  </span>
                </p>
              </div>
              <div>
                <sub>{views} visitas</sub>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
