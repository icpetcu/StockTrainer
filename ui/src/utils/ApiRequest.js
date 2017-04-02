import AuthService from './AuthService'
import cst from './constants'
import axios from 'axios'


export class ApiRequest {
    static get(url, cb) {
        axios.get(cst.ApiURL + url, {
            headers: {'Authorization': 'Bearer ' + AuthService.getToken()}
        }).then((response) => cb(response.data)).catch((error) => console.log(error));
    }

    static post(url, data, cb) {
        return axios.post(cst.ApiURL + url, data, {
            headers: {'Authorization': 'Bearer ' + AuthService.getToken()}
        }).then((response) => cb(response.data)).catch((error) => console.log(error));
    }
}


export default ApiRequest;
