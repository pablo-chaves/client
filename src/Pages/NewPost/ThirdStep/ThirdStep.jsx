import useCreatePost from '../hooks/useCreatePost';
import FormMap from '../../../Components/GoogleMaps/FormMap'
import '../step.css';

const ThirdStep = () => {
  const { current, steps, setCurrent } = useCreatePost();

  return (
    <div className='ctn'>
      <h1>Ubicación del inmueble</h1>
      <FormMap />
        {current < steps.length - 1 && (
          <button onClick={() => setCurrent(current + 1)}>Siguiente</button>
        )}
    </div>
  );
};

export default ThirdStep;
