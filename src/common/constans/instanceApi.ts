import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://back-samurai.vercel.app/'
})

instance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
  return config;
});

/*
instance.interceptors.response.use(config => {
 return config
},  async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    try {
      const res = await axios.post<{"accessToken": string}>('https://back-samurai.vercel.app/api/auth/refresh-token')
      localStorage.setItem('accessToken', res.data.accessToken)
      return instance.request(originalRequest)
    } catch (e) {
      console.log(e)
    }

  }
});*/
