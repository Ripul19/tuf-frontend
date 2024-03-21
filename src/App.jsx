import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Form from "./components/Form";
import Table from './components/Table';
import Header from './components/Header';

function App() {
    return (
      <Router>
            <div>
                <Header />
            <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/table" element={<Table />} />
            </Routes>
        </div>
      </Router>
    );
}

export default App;