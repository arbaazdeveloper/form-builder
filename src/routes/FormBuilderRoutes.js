import React from 'react'
import BuildForm from '../pages/buildform/BuildForm'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom';
import CreateForm from '../pages/buildform/createForm';
import EditForm from '../pages/EditForm/EditForm';
import Editor from '../pages/EditForm/Editor';
import FormResponsesList from '../pages/formResponses/FormResponsesList';
import ViewResponse from '../pages/formResponses/ViewResponse';
import Header from '../pages/Header';


const FormBuilderRoutes = () => {
    
    return (
        <>
        <Header/>
            <Navbar/>
            <div className='flex  w-[60%] m-auto'>

                <Routes>
                    <Route path='/' element={<BuildForm />}>
                    </Route>
                    <Route path='/create-form' element={<CreateForm />}>
                    </Route>
                    <Route path='/edit-form' element={<EditForm />}>


                    </Route>
                    <Route exact path='/edit-form/:id' element={<Editor />}>


                    </Route>
                    <Route path='/responses' element={<FormResponsesList />}>

                    </Route>
                    <Route path='/responses/:id' element={<ViewResponse />}>


                    </Route>
                </Routes>

            </div>

            {/* {component} */}
        </>
    )
}

export default FormBuilderRoutes