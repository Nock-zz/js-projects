import axios from 'axios';
const KEY = "AIzaSyCgYaHb-iKWilRXzkolcE4hNr7SL3bq1Rw";



export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY

    }
});
