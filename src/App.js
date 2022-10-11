import './App.css';
import { Routes, Route } from 'react-router-dom';
import Messagebar from './components/Messagebar';
import Home from './Routes/Home';
import Sent from './Routes/Sent';

function App() {
  return (

    <Routes>
      <Route path='/' element={ <Messagebar />} >
        <Route index element={ <Home />} />
        <Route path='/sent' element={<Sent />} />
      </Route>
     
    </Routes>
  );
}

export default App;
