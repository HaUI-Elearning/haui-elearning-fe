
import axios from 'axios';
import { LocalStorage } from '../constants/localStorage.constant';
import { useNavigate } from 'react-router-dom'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_SERVER}`,
    headers: {
        "Content-Type": 'Application/json'
    }
});

api.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem(LocalStorage.auth))?.token;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config
}, Promise.reject);

api.interceptors.response.use(
    (value) => value.data,
    (error) => {
        if (error.code === 401) {
            const navigate = useNavigate();
            const currentUser = JSON.parse(localStorage.getItem(localStorage.auth));
            if(!currentUser){
                localStorage.removeItem(LocalStorage.auth);
                navigate('/login')
            }     
        }
        return Promise.reject(error);
    }
)

export async function loginUser(login){
    try {
        const response = await api.post('/user', login)
        if (response.status >= 200 && response.status < 300) {
          return response.data
        } else {
          return null
        }
      } catch (error) {
        console.error(error)
        return null
      }
}

const apiDefault = axios.create({
    baseURL: `${import.meta.env.VITE_API_SERVER}`,
    headers: {
        "Content-Type": 'Application/json'
    }
});

export {
    apiDefault,
    api
}
