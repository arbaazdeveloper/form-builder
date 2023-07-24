import React, { useState } from 'react'
import BuildForm from '../pages/buildform/BuildForm'
import Navbar from '../components/Navbar'


const FormBuilderRoutes = () => {
    const [component,setComponent]=useState(<BuildForm/>);
    const handleSetComponent=(comp)=>{
        setComponent(comp)

    }
    return (
       <>
       <Navbar setComponent={handleSetComponent}/>

       {component}
       </>
    )
}

export default FormBuilderRoutes