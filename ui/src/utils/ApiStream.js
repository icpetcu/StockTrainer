import AuthService from './AuthService'
import cst from './constants'


export class ApiStream {
    static fetch(url, cb) {
        let source = new EventSource(cst.ApiURL + url + '?jwt=' + AuthService.getToken());
        source.addEventListener('message', (message) => cb(JSON.parse(message.data)));
    }
}

export default ApiStream;
