export let API_URL = '';

const ON_PRODUCTION = true;

if (ON_PRODUCTION) {
    API_URL = '';
} else {
    API_URL = 'http://localhost:8000';
}
// if (process.env.NODE_ENV === 'production') {
//     API_URL = '';
// } else if (process.env.NODE_ENV === 'development') {
//     API_URL = 'http://localhost:8000';
// }
