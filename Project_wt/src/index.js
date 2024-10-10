import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import History from './Pages/History';
import Detail from './Pages/DetailPage';
import Search from './Pages/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/history' element={<History />}/>
          <Route path='/product/search/:name' element={<Search />}/>
          <Route path='/product/detail/:id' element={<Detail />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
