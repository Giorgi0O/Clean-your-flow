import './App.scss';
import './config.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import FlowSession from './pages/FlowSession';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="FlowSession" element={<FlowSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App