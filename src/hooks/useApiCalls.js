import axios from "axios"
import { url } from "../urls/BackendUrls"
import { useState } from "react"
export const usePostRequest = (endpoint,formData) => {
    

    const [error, setError] = useState('')
    const postRequest = async () => {
        try {

            const response =await  axios.post(`${url}${endpoint}`, formData);
            return response.data;

        } catch (error) {
             setError(error)
        }
       

    }
    return [postRequest,error];




}
export const useGetRequest = (endpoint,formData) => {
    

    const [error, setError] = useState('')
    const getRequest = async () => {
        try {

            const response =await  axios.get(`${url}${endpoint}`);
            return response.data;

        } catch (error) {
             setError(error)
        }
       

    }
    return [getRequest,error];




}