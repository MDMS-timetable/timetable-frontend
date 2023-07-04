import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'; // Update with your API server URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] =
  'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.headers.common['Access-Control-Allow-Methods'] =
  'GET, POST, PUT, DELETE, OPTIONS';

export default axios;
