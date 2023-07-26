import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Lightbutton from '../../components/Lightbutton'



const FormBuilder = ({ form, setForm, onSave, lightBtnText, onLightBtn, image, setImage }) => {

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

    return (
        <div>
            <div className='bg-lighColor border-t-[4px] border-themeColor p-4 flex items-start gap-[10px]'>

                {image ? (
                    <img
                        src={image==='not allowed'?'':URL.createObjectURL(image)}
                        alt="Selected"
                        className='h-[100px] w-[100px] rounded-full'
                    />
                ) : (
                    <>
                    
                    <label htmlFor="imageUpload" className="rounded ">
                    <img
                        src={form.image}
                        alt="Selected"
                        className='h-[100px] w-[100px] rounded-full'
                    />
                        <span>Select an Image</span>
                    </label>
                    {!image==='not allowed' &&  <img
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

                    {item.type === 'text' && <>



                    </>}
                    {item.type === 'radio' && <>

                        <div className='flex flex-col gap-[5px] mt-1'>
                            {item.options.map((option, optionIndex) => <> <div lassName='flex gap-[2px]'>
                                <input className='p-2' onChange={(e) => handleOptionValueChange(e, index, optionIndex)} value={option}></input>
                                <button onClick={() => handleDeleteOption(index, optionIndex)}>X</button>
                            </div></>)}
                            <button className='w-[120px] bg-white p-2' onClick={() => handleAddOption(index)} >Add Options +</button>
                        </div>

                    </>}
                    {item.type === 'select' && <>
                        <div className='flex flex-col gap-[5px] mt-1'>
                            {item.options.map((option, optionIndex) => <> <div className='flex gap-[2px]'>
                                <input className='p-2' onChange={(e) => handleOptionValueChange(e, index, optionIndex)} value={option}></input>
                                <button onClick={() => handleDeleteOption(index, optionIndex)}>X</button>
                            </div></>)}
                            <button className='w-[120px] bg-white p-2' onClick={() => handleAddOption(index)} >Add Options +</button>
                        </div>
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
            <Button onClick={onSave} text='Save'></Button>
            <Lightbutton text={lightBtnText} onClick={onLightBtn}></Lightbutton>
        </div>
    )
}

export default FormBuilder