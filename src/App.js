
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormBuilderRoutes from './routes/FormBuilderRoutes';
import FormViewRoutes from './routes/FormViewRoutes';
import { Toaster } from 'react-hot-toast';
import Thankspage from './pages/Thankspage';
import ErrorBoundary from './pages/Error/ErrorBoundary';
import NotFound from './pages/Error/NotFound';


function App() {

  return (
    <div className='font-body'>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>

            <Route path='/*' element={<FormBuilderRoutes />}>

            </Route>

            <Route path='/view-form/:id' element={<FormViewRoutes />}>

            </Route>
            <Route path='/thanks/:id' element={<Thankspage />}>

            </Route>
            <Route path='*' element={<NotFound />}>

            </Route>
            <Route path='/not-found' element={<NotFound />}>

            </Route>



          </Routes>
          <Toaster />

        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
