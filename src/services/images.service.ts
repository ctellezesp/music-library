import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { showError } from '../utils/errot-util';

export const uploadImage = async (image: File): Promise<any> => {
  try {
    const data = new FormData();
    data.append('image', image);
    const response: AxiosResponse = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: { 
        'Authorization': 'Client-ID 81ad3d2ef0d123d'
      },
      data
    });
    return response.data.data.link;
  } catch (err) {
    showError(err);
    return null;
  }
}