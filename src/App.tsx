import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Configurator from './components/Configurator';
import Table from './components/Table';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: 24 }}>
          <Link to="/">Produktkonfigurator</Link>
          <Link to="/tabelle">Tabelle</Link>
          <Link to="/buchen">Buchungsformular</Link>
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
