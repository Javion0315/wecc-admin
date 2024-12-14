import axios from 'axios';

const weccBaseUrl = 'http://yang332904.synology.me:8080/api/'

axios.defaults.withCredentials = true
// axios.defaults.baseURL = null
// axios.defaults.timeout = 60 * 1000 //timeout 60秒


const weccApi = axios.create({
  baseURL: weccBaseUrl,
  withCredentials: true
});


export { weccApi }
