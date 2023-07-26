import React, { useState } from 'react'
import Input from '../../components/Input'
import Description from '../../components/Description'
import Button from '../../components/Button'
import FormBuilder from './FormBuilder'

import { toast } from 'react-hot-toast'
import { usePostRequest } from '../../hooks/useApiCalls'
import Modal from '../../components/Modal'
import Lightbutton from '../../components/Lightbutton'
import { frontEnd } from '../../urls/BackendUrls'
import { imageUpload } from '../../hooks/uploadImage'

const CreateForm = () => {

    const schema = { title: '', image: 'https://res.cloudinary.com/dxknbk2hd/image/upload/v1690386765/Screenshot_2023-07-26_211534_1_njq0cq.png', description: '', elements: [{ type: 'text', label: '', options: [] }] }
    const [created, setcreated] = useState(false);
    const [form, setFrom] = useState(schema);
    const [postRequest, error] = usePostRequest('/create-form');
    const [isOpen, setIsOpen] = useState(false);
    const [formlink, setFormLink] = useState('');
    const [image, setImage] = useState('');
    


    const handleTitleChange = (e) => {
        setFrom({ ...form, title: e.target.value })

    }
    const handleDescriptionChange = (e) => {
        setFrom({ ...form, description: e.target.value })
    }
    const handleCreateForm = () => {
        if (form.title === '') {
            toast.error('Name cannot be empty !');
            return
        }
        setcreated(true)
    }
    const handleSave = async () => {

        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].label === '') {
                toast.error('Question Cannot be empty !')
                return
            }
        }

        toast('Saving...')
        if (image) {
            const upload = await imageUpload(image)
            if (upload.status === 200) {
                await setFrom({ ...form, image: upload.data.url })
                const updatedForm = { ...form, image: upload.data.url }
                const response = await postRequest(updatedForm);
                if (error) {

                    return toast.error('Something Went Wrong !')
                }




                if (response.message === 'form created') {
                    toast.success('form created sucessfully !')
                    setFormLink(`${frontEnd}/view-form/${response.form._id}`)
                }

            } else {
                toast.error('something went wrong')
            }
        } else {
            const response = await postRequest(form);
            if (error) {

                return toast.error('Something Went Wrong !')
            }
            if (response.message === 'form created') {
                toast.success('form created sucessfully !')
                setFormLink(`${frontEnd}/view-form/${response.form._id}`)
            }
        }





    }
    const handleModal = () => {
        if (!formlink) {
            toast.error('Please Save Form First !')
            return
        }
        if (isOpen) {

            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(formlink)
        toast.success('Copied to clipboard !')

    }
    return (
        <div className='w-full'>
            {created ? <>
                <FormBuilder form={form} setForm={setFrom} onSave={handleSave} lightBtnText={'Share'} onLightBtn={handleModal} image={image} setImage={setImage} builderType={'create'} />

            </>
                : <>
                    <Input value={form.title} onChange={handleTitleChange} />
                    <Description value={form.description} onChange={handleDescriptionChange} />
                    <Button onClick={handleCreateForm} text={'Create Form'} />
                </>}
            <Modal isOpen={isOpen} onClose={handleModal}>
                <div className='w-[400px] border-b border-t flex flex-col py-2 my-4'>
                    <input type='text' className='p-2 border rounded m-2' readOnly value={formlink} />

                    <div className='flex gap-[5px] '>
                        <button onClick={handleCopy} type="button" className="px-5 mb-2 py- text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Copy</button>
                        <Lightbutton text={'Cancel'} onClick={handleModal}></Lightbutton>
                    </div>
                </div>

            </Modal>
          
        </div>
    )
}

export default CreateForm