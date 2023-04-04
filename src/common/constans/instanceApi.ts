import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://back-samurai.vercel.app/'
})

export const headers = {
  authorization: `Basic YWRtaW46cXdlcnR5`,
}