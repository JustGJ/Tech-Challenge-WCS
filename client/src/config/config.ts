export let API_URL = '';

if (process.env.NODE_ENV === 'production') {
    API_URL = '';
} else if (process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:8000';
}
