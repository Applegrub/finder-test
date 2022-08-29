import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import InfoList from './pages/InfoList';
import PersonalInfo from './pages/PersonalInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<InfoList />} />
          <Route path='/:category/:id' element={<PersonalInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
