import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { url } from '../../urls/BackendUrls';
import Textresponse from '../../components/FormresponseElements/Textresponse';
import Categorize from '../../components/FormbuilderElements/Categorize';
import Categorizeresponse from '../../components/FormresponseElements/Categorizeresponse';
import Comprehensionresponse from '../../components/FormresponseElements/Comprehensionresponse';
import Clozeresponse from '../../components/FormresponseElements/Clozeresponse';
import Radioresponse from '../../components/FormresponseElements/Radioresponse';
import Selectresponse from '../../components/FormresponseElements/Selectresponse';

const FullResponse = () => {
    const [formResponse, setFormResponse] = useState([{ response: [{ key: '', value: '' }] }]);
    const formId = useParams();
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState(true)
    const handlePageChange=(type)=>{
       
        if(type==='back'){
            if(page===1){
                return toast('No further responses')
            }
            setPage(page-1)
        }
        if(type==='next'){
            if(page+1>formResponse.length){
                return toast('No further responses')
            }
            setPage(page+1)
        }
        window.scroll(0,0)
    }
 



    useEffect(() => {
        const getResponse = async () => {
            try {
                const res = await fetch(`${url}/get-response/${formId.id}`)
                const data = await res.json();
                if (data.message === 'No Response Found For This Form') {
                    toast.message('No Response')
                    return
                }
                setFormResponse(data);
                setLoading(false)
            } catch (error) {
                toast.error('Something Went Wrong !')
            }


        }
        getResponse();
        
    }, [formId.id])

    const responseType={
        TEXT: 'text',
        SELECT: 'select',
        RADIO: 'radio',
        COMPREHENSION: 'comprehension',
        CATEGORIZE:'categorize',
        CLOZE:'cloze'
    }

    if(loading){
        return<h1>Loading...</h1>
    }
   
    else{
        
        return (
          <div className='w-full'>
            <h1 className='text-center text-[20px]'>Response no. {page}</h1>
              {formResponse[page-1].response.map((item,mainQuestionIndex)=>{
                  return<div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
                    <p>{item.key}</p>
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.TEXT && <Textresponse value={item.value}/> }
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.CATEGORIZE && <Categorizeresponse question={formResponse[page-1].formId.extras[mainQuestionIndex]} answer={formResponse[page-1].extrasResponse[mainQuestionIndex]}/>}
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.COMPREHENSION && <Comprehensionresponse question={formResponse[page-1].formId.extras[mainQuestionIndex]} answer={formResponse[page-1].extrasResponse[mainQuestionIndex]}/>}
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.CLOZE && <Clozeresponse question={formResponse[page-1].formId.extras[mainQuestionIndex]} answer={formResponse[page-1].extrasResponse[mainQuestionIndex]}/>}
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.RADIO && <Radioresponse answer={item.value}/>}
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.SELECT && <Selectresponse answer={item.value}/>}
                  </div>
              })}
      
      
              <div className='flex gap-[5px] justify-center items-center my-2'>
                  <button onClick={()=>handlePageChange('back')} className='border p-4'>{'<'}</button>
                  <div className='border p-4'>{page}</div>
                  <button onClick={()=>handlePageChange('next')} className='border p-4'>{'>'}</button>
              </div>
          </div>
        )
    }
}

export default FullResponse