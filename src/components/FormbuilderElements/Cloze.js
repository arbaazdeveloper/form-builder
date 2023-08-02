import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GridIcon } from '../../assets/Icons';
import Drag from '../Drag';
import { Draggable } from 'react-beautiful-dnd';

const Cloze = ({ form, setForm, elementIndex ,type}) => {
    const clozeShema = { sentence: '', selectedWords: [] };
    const [state, setState] = useState(clozeShema);
    const [field, setField] = useState({ __html: '' });
    const [previewText, setPreviewText] = useState('');

    const handleSentenceChange = (e) => {
        setState({ ...state, sentence: e.target.innerText });
        setPreviewText(e.target.innerText)

    };

    const setWordsUnderline = () => {
        let copiedSentence = state.sentence.split(' ');
        for (let i = 0; i < copiedSentence.length; i++) {
            if (state.selectedWords.includes(copiedSentence[i])) {
                copiedSentence[i] = `<u>${copiedSentence[i]}</u>`;
            }
        }
        setField({ __html: copiedSentence.join(' ') });
    };

    const handleUnderLine = () => {
        const word = window.getSelection();
        if (!word.getRangeAt(0).toString().trim()) {
            return toast.error('Nothing is selected')
        }
        if (word.rangeCount > 0) {
            const range = word.getRangeAt(0);
            const selectedText = range.toString().trim();
            setState({ ...state, selectedWords: [...state.selectedWords, selectedText] });
            let prevText = previewText
            prevText = prevText.replace(selectedText, '_ _ _ _')
            setPreviewText(prevText);

            setWordsUnderline();
        }
    };


    useEffect(() => {
        setWordsUnderline();

    }, [state.selectedWords]);// eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=>{
          let previous=[...form.extras]
          previous[elementIndex]=state
          setForm({...form,extras:previous})
    },[state])
    
    useEffect(()=>{
        if(type==='edit'){
            setState(form.extras[elementIndex])
        }
    },[])


    return (
        <div>
            <div>
                <p>Preview</p>
                <div className='border p-4 w-full rounded bg-white'>{previewText}</div>
            </div>
            <div>
                <p>Sentence</p>
                <button className='p-2 bg-white border' onClick={handleUnderLine}><i><u>U</u></i></button>
                <div
                    className='border p-2 w-full rounded bg-white'
                    contentEditable
                    onInput={handleSentenceChange}
                    dangerouslySetInnerHTML={field}
                ></div>

            </div>
            <div>
                <Drag>

                    {state.selectedWords.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                            {(provided) => (

                                <div className='flex items-center m-4' key={index}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <GridIcon />
                                    <div className='border border-grey-500 w-[200px] p-4 bg-white'>
                                        {item}
                                    </div>
                                </div>
                            )}

                        </Draggable>
                    ))}
                </Drag>
            </div>
        </div>
    );
};

export default Cloze;
