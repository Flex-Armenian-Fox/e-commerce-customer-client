import axios from 'axios';

const serverInstance = axios.create({
  baseURL: 'https://antonp-ecommerce-server.herokuapp.com/api',
});

export default serverInstance;
