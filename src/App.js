import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Routes>
    
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </PersistGate>
   </Provider>
 
  );
}

export default App;
