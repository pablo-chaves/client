import img1 from '../../images/landing/1.jpg';
import img2 from '../../images/landing/2.jpg';
import img3 from '../../images/landing/3.jpg';
import img4 from '../../images/landing/4.jpg';
import img5 from '../../images/landing/5.jpg';
import img6 from '../../images/landing/6.jpg';
import img7 from '../../images/landing/7.jpg';
import React, {useRef, useEffect, useCallback} from 'react';
import style from './Landing.module.css';
import LandSearchBar from '../../Components/LandSearchBar/LandSearchBar';

const Landing = () => {
	const slideshow = useRef(null);

	const siguiente = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current){
			
			// Obtenemos el primer elemento del slideshow.
			const primerElemento = slideshow.current.children[0];
			
			// Establecemos la transicion para el slideshow.
			slideshow.current.style.transition = `1500ms ease-out all`;
			
			const tamañoSlide = slideshow.current.children[0].offsetWidth;
			
			// Movemos el slideshow
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;
			
			const transicion = () => {
				// Reiniciamos la posicion del Slideshow.
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;
				
				// Tomamos el primer elemento y lo mandamos al final.
				slideshow.current.appendChild(primerElemento);
				
				slideshow.current.removeEventListener('transitionend', transicion);
			}
			
			// Eventlistener para cuando termina la animacion.
			slideshow.current.addEventListener('transitionend', transicion);
			
		}
	});
	
	
	useEffect(() => {
        setInterval(() => {
			siguiente();
		}, 7500);		
	});

	return (
        <>
		<div className={style.ContenedorPrincipal}>
			<div className={style.ContenedorSlideshow} ref={slideshow}>
                <div className={style.Slide} >
                    <img src={img1} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img2} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img3} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img4} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img5} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img6} alt=""/>
                </div>
                <div className={style.Slide} >
                    <img src={img7} alt=""/>
                </div>             
            </div>
            </div>
            <div>
                <LandSearchBar />
            </div>
        </>
	);
}


export default Landing;
