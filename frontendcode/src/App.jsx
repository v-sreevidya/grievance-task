
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import { FormProvider } from './FormContext/FormContext';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <FormProvider>
        <AppRoutes/>
      </FormProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
