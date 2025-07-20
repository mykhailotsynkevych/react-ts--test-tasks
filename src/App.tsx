import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Configurator from './components/Configurator';
import Table from './components/Table';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ display: 'flex', gap: 24, justifyContent: 'center', paddingTop: 24, paddingBottom: 24 }}>
          <Link to="/"><p>Produktkonfigurator</p> </Link>
          <Link to="/tabelle"><p>Tabelle</p></Link>
          <Link to="/buchen"><p>Buchungsformular</p></Link>
        </nav>
        <Routes>
          <Route path="/" element={<Configurator />} />
          <Route path="/tabelle" element={<Table />} />
          <Route path="/buchen" element={<BookingForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
