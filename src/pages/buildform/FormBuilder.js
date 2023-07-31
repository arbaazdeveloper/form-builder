import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Lightbutton from '../../components/Lightbutton'
import { CloseIcon } from '../../assets/Icons'
import Comprehension from '../../components/FormbuilderElements/Comprehension'


const FormBuilder = ({ form, setForm, onSave, lightBtnText, onLightBtn, image, setImage, builderType }) => {

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
    const insertImage = (e) => {
        setImage(e.target.files[0])

    }
    const inputType = {
        TEXT: 'text',
        SELECT: 'select',
        RADIO: 'radio',
        COMPREHENSION: 'comprehension'
    }

    return (
        <div>

            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 flex items-start gap-[10px]'>

                {
                    builderType === 'edit' ? (<>
                        <img
                            src={form.image}
                            alt="Selected"
                            className='h-[100px] w-[100px] rounded-full'
                        />

                    </>) :
                        image ? (
                            <img
                                src={image === 'not allowed' ? '' : URL.createObjectURL(image)}
                                alt="Selected"
                                className='h-[100px] w-[100px] rounded-full'
                            />
                        ) : (
                            <>

                                <label htmlFor="imageUpload" className="rounded-full cursor-pointer border border-[#fff] border-[2px] h-[100px] w-[100px] relative box-border overflow-hidden">

                                    <div className="absolute bottom-0 right-0 bg-[#000] w-full h-[50%] flex justify-center items-center bg-opacity-70">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 16 16"
                                            className="text-gray-400 text-xl group-hover:text-[#9a6afd] opacity-70"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                                        </svg>
                                    </div>
                                    <img
                                        src={form.image}
                                        alt="Selected"
                                        className="h-[100px] w-[100px] rounded-full"
                                    />
                                </label>

                                {image === 'not allowed' && <img
                                    src={form.image}
                                    alt="Selected"
                                    className='h-[100px] w-[100px] rounded-full'
                                />}
                            </>
                        )}
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={insertImage}
                    style={{ display: 'none' }}
                />
                <div>

                    <h1 className='text-[30px]'>{form.title}</h1>
                    <p>{form.description}</p>
                </div>
            </div>

            {form.elements.map((item, index) => {
                return <div key={item._id} className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
                    <Input label='Question' value={item.label} onChange={(e) => handleLabelChange(e, index)} />

                    {item.type === inputType.TEXT && <>




                    </>}
                    {item.type === inputType.RADIO && <>

                        <div className='flex flex-col gap-[5px] mt-1'>
                            {item.options.map((option, optionIndex) => <> <div lassName='flex gap-[2px] items-center justify-center h-[50px]'>
                                <input className='p-2' onChange={(e) => handleOptionValueChange(e, index, optionIndex)} value={option}></input>
                                <button className='mx-2 mt-2' onClick={() => handleDeleteOption(index, optionIndex)}><CloseIcon /></button>
                            </div></>)}
                            <button className='w-[120px] bg-white p-2' onClick={() => handleAddOption(index)} >Add Options +</button>
                        </div>

                    </>}
                    {item.type === inputType.SELECT && <>
                        <div className='flex flex-col gap-[5px] mt-1'>
                            {item.options.map((option, optionIndex) => <> <div className='flex gap-[2px]'>
                                <input className='p-2' onChange={(e) => handleOptionValueChange(e, index, optionIndex)} value={option}></input>
                                <button className='mx-2 mt-2' onClick={() => handleDeleteOption(index, optionIndex)}><CloseIcon /></button>
                            </div></>)}
                            <button className='w-[120px] bg-white p-2' onClick={() => handleAddOption(index)} >Add Options +</button>
                        </div>
                    </>}
                    {
                        item.type === inputType.COMPREHENSION && <>
                            <Comprehension />

                        </>
                    }

                    <div>
                        <select className='p-4 rounded mt-4' defaultValue={item.type} onChange={(e) => handleTypeChange(index, e.target.value)}>
                            <option value={'text'}>Text</option>
                            <option value={'radio'}>Radio Group</option>
                            <option value={'select'}>Select</option>
                            <option value={'comprehension'}>Comprehension</option>
                        </select>
                    </div>

                </div>
            })}
            <div className='flex justify-center'>

                <button onClick={handleAddQuestion} className='mt-4 text-[25px] text-themeColor'>+ Question</button>
            </div>
            <Button onClick={onSave} text='Save'></Button>
            <Lightbutton text={lightBtnText} onClick={onLightBtn}></Lightbutton>
        </div>
    )
}

export default FormBuilder