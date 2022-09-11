import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/currency" element={<App />} />
      <Route path="/" element={<Navigate replace to="/currency" />} />
    </Routes>
  </BrowserRouter>
);
