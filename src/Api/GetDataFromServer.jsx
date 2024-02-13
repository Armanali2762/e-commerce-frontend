import axios from 'axios';
import Base_URL from './Base_URL';
export const GetDataFromServer = (ids) => {
    return axios.get(`${Base_URL}/clothes/${ids}`).then((response)=> response.data);
}