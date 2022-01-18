import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'assets/css/main.css';
import Home from 'views/Home';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
