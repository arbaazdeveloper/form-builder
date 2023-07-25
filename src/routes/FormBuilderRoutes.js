import React, { useState } from 'react'
import BuildForm from '../pages/buildform/BuildForm'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom';
import CreateForm from '../pages/buildform/createForm';
import EditForm from '../pages/EditForm/EditForm';
import Editor from '../pages/EditForm/Editor';


const FormBuilderRoutes = () => {
    const [component,setComponent]=useState(<BuildForm/>);
    const handleSetComponent=(comp)=>{
        setComponent(comp)

    }
    return (
       <>
       <Navbar setComponent={handleSetComponent}/>
       <div className='flex  w-[60%] m-auto'>

       <Routes>
       <Route path='/' element={<BuildForm/>}>
       </Route>
        <Route path='/create-form' element={<CreateForm/>}>
        </Route>
        <Route path='/edit-form' element={<EditForm/>}>


        </Route>
        <Route path='/edit-form/:id' element={<Editor/>}>
            

        </Route>
       </Routes>
       
       </div>

       {/* {component} */}
       </>
    )
}

export default FormBuilderRoutes