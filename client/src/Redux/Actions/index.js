/* eslint-disable no-console */
/* eslint-disable func-names */
import axios from 'axios';
import { getFilteredPropiertiesService, getAllPostsService, getNextOrPreviousPageService } from '../../Services/properties.service';
// actipon types
import {
  PROPERTIES,
  GET_FILTERED_PROPERTIES,
  GET_SEARCHED_POST,
  GET_NEXT_OR_PREVIOUS_PAGE,
  GET_COORDINATES,
} from './types';

// Actions
export const getAllPost = () => async function (dispatch) {
  return getAllPostsService()
    .then((res) => {
      dispatch(
        {
          type: PROPERTIES,
          payload: res.data,
        },
      );
    })
    .catch((e) => console.log('Error getAllPost: ', e));
};

export function getFilteredPropierties(queryBlock) {
  return async function (dispatch) {
    return getFilteredPropiertiesService(queryBlock)
      .then((res) => {
        dispatch(
          {
            type: GET_FILTERED_PROPERTIES,
            payload: res.data,
          },
        );
      })
      .catch((e) => console.log('Error getFilteredPropiertiesService: ', e));
  };
}

export function searchedPost(payload) {
  return function (dispatch) {
    dispatch(
      {
        type: GET_SEARCHED_POST,
        payload,
      },
    );
  };
}

export function getNextOrPreviousPage(link) {
  return async function (dispatch) {
    return getNextOrPreviousPageService(link)
      .then((res) => {
        dispatch(
          {
            type: GET_NEXT_OR_PREVIOUS_PAGE,
            payload: res.data,
          },
        );
      })
      .catch((e) => console.log('Pagina, error del pedido: ', e));
  };
}

export function getCoordinates(adress) {
  return function (dispatch) {
    return axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${adress}`)
      .then((r) => {
        const coordinates = {
          longitude: r.data.items[1].position.lng,
          latitude: r.data.items[1].position.lat,
        };
        dispatch({
          type: GET_COORDINATES,
          payload: coordinates,
        });
      })
      .catch((e) => console.error("Couldn't fetch data", e));
  };
}
