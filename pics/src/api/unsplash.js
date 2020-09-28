import axios from 'axios';

export default axios.create( {
    baseURL: 'https://api.unsplash.com/',
    headers: {
    Authorization: 'Client-ID D2Qo_RVnfT-dfoBzq9UhVgV4jOz56cR7uCimxUlikUk'
    }   
}
);