import React from 'react';
import './App.css';
import HomePage from './pages/homePage';
import CreateRule from './pages/createRule';
import ListRule from './pages/listrule';
import {BrowserRouter, Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path ="createrule" element ={<CreateRule />} />
          <Route path ="listrule" element ={<ListRule />} />
          
        </Route>
       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
