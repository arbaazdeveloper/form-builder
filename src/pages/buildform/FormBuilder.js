import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { usePostRequest } from '../../hooks/useApiCalls'
import { toast } from 'react-hot-toast'

const FormBuilder = ({ form, setForm }) => {
    const [postRequest, error] = usePostRequest('/create-form', form);
    const handleTypeChange = (index, type) => {
        const updatedElements = [...form.elements];

        updatedElements[index].type = type;

        setForm((prevForm) => ({
            ...prevForm,
            elements: updatedElements,
        }));

    }
    const handleLabelChange = (e, index) => {
        const updatedElements = [...form.elements];

        updatedElements[index].label = e.target.value;

        setForm((prevForm) => ({
            ...prevForm,
            elements: updatedElements,
        }));


    }
    const handleAddQuestion = () => {
        const plainElement = { type: 'text', label: '', options: ['option 1', 'option 2', 'option 3'] };
        const updatedElements = [...form.elements, plainElement];

        setForm({ ...form, elements: updatedElements })
    }
    const handleAddOption = (index) => {
        const prev = [...form.elements]
        prev[index].options.push('new option')
        setForm({ ...form, elements: prev })


    }
    const handleDeleteOption = (elementIndex, optionIndex) => {
        const deletedOptions = [...form.elements];
        deletedOptions[elementIndex].options.splice(optionIndex, 1);
        setForm({ ...form, elements: deletedOptions })

    }
    const handleOptionValueChange = (e, elementIndex, optionIndex) => {
        const previous = [...form.elements];
        previous[elementIndex].options[optionIndex] = e.target.value;
        setForm({ ...form, elements: previous })

    }

    const handleSave = async () => {

        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].label === '') {
                toast.error('Question Cannot be empty !')
                return
            }
        }
       
        toast('Saving...')
        const response = await postRequest();


        if (error) {
            console.log(error)
            return toast.error('Something Went Wrong !')
        }




        if (response.message === 'form created') {
            toast.success('form created sucessfully !')
        }

    }
    return (
        <div>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 '>
                <h1 className='text-[30px]'>{form.title}</h1>
                <p>{form.description}</p>
            </div>

            {form.elements.map((item, index) => {
                return <div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
                    <Input label='Question' value={item.label} onChange={(e) => handleLabelChange(e, index)} />

                    {item.type === 'text' && <>



                    </>}
                    {item.type === 'radio' && <>

                        <div className='flex flex-col gap-[5px] mt-1'>
                            {item.options.map((option, optionIndex) => <div className='flex gap-[2px]'>
                                <input className='p-2' onChange={(e) => handleOptionValueChange(e, index, optionIndex)} value={option}></input>
                                <button onClick={() => handleDeleteOption(index, optionIndex)}>X</button>
                            </div>)}
                            <button className='w-[120px] bg-white p-2' onClick={() => handleAddOption(index)} >Add Options +</button>
                        </div>

                    </>}
                    {item.type === 'select' && <>
                        iam radio
                    </>}

                    <div>
                        <select className='p-4 rounded mt-4' onChange={(e) => handleTypeChange(index, e.target.value)}>
                            <option value={'text'}>Text</option>
                            <option value={'radio'}>Radio Group</option>
                            <option value={'select'}>Select</option>
                        </select>
                    </div>

                </div>
            })}
            <div className='flex justify-center'>

                <button onClick={handleAddQuestion} className='mt-4 text-[20px] text-themeColor'>+ Question</button>
            </div>
            <Button onClick={handleSave} text='Save'></Button>
        </div>
    )
}

export default FormBuilder