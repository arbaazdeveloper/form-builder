
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormBuilderRoutes from './routes/FormBuilderRoutes';
import FormViewRoutes from './routes/FormViewRoutes';
import { Toaster } from 'react-hot-toast';
import Thankspage from './pages/Thankspage';


function App() {

  return (
    <div className='font-body'>
      <BrowserRouter>
        <Routes>

          <Route path='/*' element={<FormBuilderRoutes />}>

          </Route>

          <Route path='/view-form/:id' element={<FormViewRoutes />}>

          </Route>
          <Route path='/thanks/:id' element={<Thankspage />}>

          </Route>


        </Routes>
        <Toaster />

      </BrowserRouter>

    </div>
  );
}

export default App;
