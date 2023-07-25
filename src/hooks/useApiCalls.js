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
export const useGetRequest = (endpoint) => {
    

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
export const usePutRequest = (endpoint,formData) => {
    

    const [error, setError] = useState('')
    const putRequest = async () => {
        try {

            const response =await  axios.put(`${url}${endpoint}`, formData);
            return response.data;

        } catch (error) {
             setError(error)
        }
       

    }
    return [putRequest,error];




}