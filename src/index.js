import React from 'react';
import ReactDOM from 'react-dom/client';
import '@template/css/bootstrap.min.css';
import '@template/css/style.css';
import '@template/lib/owlcarousel/assets/owl.carousel.min.css';
import '@template/lib/lightbox/css/lightbox.min.css';


import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
);

reportWebVitals();
