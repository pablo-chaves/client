import axios from 'axios';

const { REACT_APP_API_BASE_ENDPOINT } = process.env;

// EDITAR UNA RESERVA
export async function addViewsService(idPost, body) {
    const endpoint = `http://localhost:3001/views/${idPost}`;
    return await axios.put(endpoint, body);
}