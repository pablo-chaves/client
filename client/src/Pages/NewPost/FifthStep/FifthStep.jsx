import useCreatePost from '../hooks/useCreatePost';
import Checkout from './Checkout';

const FifthStep = () => {
    const { setCurrentComponent } = useCreatePost();
  return (
      <div>
        <h1>Listo! Revisa los detalles antes de publicar </h1>
        <div>
            <Checkout />
{/*             <button
            onClick={() => {
                setCurrentComponent('Done');
            }}
            >
            Done!
            </button>
            <button
            onClick={() => {
                setCurrentComponent('ThirdStep');
            }}
            >
            Volver...
            </button> */}
        </div>
    </div>
  );
};

export default FifthStep;