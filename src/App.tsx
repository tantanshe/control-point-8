import './App.css';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './containers/Home/Home';
import AddQuote from './containers/AddQuote/AddQuote';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addQuote" element={<AddQuote/>}/>
        <Route path="/quotes/:id" element={<Home/>}/>
        <Route path="*" element={<h2>Not found</h2>}/>
        <Route path="/posts/:id/edit" element={<AddQuote/>}/>
      </Routes>
    </div>
  );
};

export default App;
