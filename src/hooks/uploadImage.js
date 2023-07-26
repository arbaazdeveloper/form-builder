import axios from "axios";

export const imageUpload = async (image) => {
    //https://api.cloudinary.com/v1_1/dxknbk2hd/image/upload

    try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'form-builder');
        data.append('cloudname', 'dxknbk2hd');
        const upload = await axios.post('https://api.cloudinary.com/v1_1/dxknbk2hd/image/upload', data)
        console.log(upload)
        return upload;
    } catch (error) {
        return error

    }




}