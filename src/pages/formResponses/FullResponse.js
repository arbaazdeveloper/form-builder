import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { url } from '../../urls/BackendUrls';
import Textresponse from '../../components/FormresponseElements/Textresponse';
import Categorize from '../../components/FormbuilderElements/Categorize';
import Categorizeresponse from '../../components/FormresponseElements/Categorizeresponse';

const FullResponse = () => {
    const [formResponse, setFormResponse] = useState([{ response: [{ key: '', value: '' }] }]);
    const formId = useParams();
    const [page,setPage]=useState(2)
    const [loading,setLoading]=useState(true)
 



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
        console.log(formResponse)

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
              {formResponse[page-1].response.map((item,mainQuestionIndex)=>{
                  return<div className='bg-lighColor border-t-[4px] border-themeColor p-4 mt-4'>
                    <p>{item.key}</p>
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.TEXT && <Textresponse value={item.value}/> }
                    {formResponse[page-1].formId.elements[mainQuestionIndex].type===responseType.CATEGORIZE && <Categorizeresponse question={formResponse[page-1].formId.extras[mainQuestionIndex]} answer={formResponse[page-1].extrasResponse[mainQuestionIndex]}/>}
                  </div>
              })}
      
      
              <div className='flex gap-[5px] justify-center items-center'>
                  <button className='border p-4'>{'<'}</button>
                  <div className='border p-4'>{page}</div>
                  <button className='border p-4'>{'>'}</button>
              </div>
          </div>
        )
    }
}

export default FullResponse