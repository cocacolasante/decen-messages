import './App.css';
import Messagebar from './components/Messagebar';
import Home from './Routes/Home';
import Sent from './Routes/Sent';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Messagebar />} >
        <Route index element={ <Home />} />
        <Route path='/' element={<Sent />} />
      </Route>
     
    </Routes>
  );
}

export default App;
