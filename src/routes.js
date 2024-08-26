import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AddReceita from './pages/AddReceita';

import Receita from './pages/Receita';

export default function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/AddReceita" element={<AddReceita/>}/>
        <Route path="/Receita/:id" element={<Receita/>}/>
      </Routes>
    </BrowserRouter>
  );
};