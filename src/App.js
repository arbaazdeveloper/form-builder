
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormBuilderRoutes from './routes/FormBuilderRoutes';
import FormViewRoutes from './routes/FormViewRoutes';
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (
    <div className='font-body'>
      <BrowserRouter>
        <Routes>

        <Route path='/' element={<FormBuilderRoutes/>}>

        </Route>

        <Route path='/view-form/:id' element={<FormViewRoutes/>}>

        </Route>

        </Routes>
        <Toaster/>

      </BrowserRouter>

    </div>
  );
}

export default App;
