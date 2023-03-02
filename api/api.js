import axios from 'axios';
import { backendurl } from './backendurl';
import { shuffle } from '../utils/shuffle';

export const getDataOfPosts = async (type) => {
  return axios
    .get(backendurl + '/' + type, {
      // to increase result limit from 100 to 500
      params: {
        _limit: 500,
      },
    })
    .then((response) => {
      let data = response.data;
      if (type === 'publications') {
        shuffle(data);
      }
      return data;
    })
    .catch((error) => console.log(error));
};

export const getIdsOfPosts = async (type) => {
  const data = await axios
    .get(backendurl + '/' + type, {
      // to increase result limit from 100 to 500
      params: {
        _limit: 500,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return data.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
};

export const getSlugsOfPosts = async (type) => {
  const data = await axios
    .get(backendurl + '/' + type, {
      // to increase result limit from 100 to 500
      params: {
        _limit: 500,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return data.map(({ slug }) => {
    return {
      params: {
        id: slug,
      },
    };
  });
};
