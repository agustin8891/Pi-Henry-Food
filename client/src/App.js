import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import Detail from './components/Detail/Detail'



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
	      <Route path='/' element = {<LandingPage/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/recipes' element={<RecipeCreate/>} />
        <Route path="/home/:id" element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


