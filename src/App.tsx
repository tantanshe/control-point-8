import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './containers/Home/Home';
import AddQuote from './containers/AddQuote/AddQuote';
import CategoriesList from './components/CategoriesList/CategoriesList';

const App = () => {
  const location = useLocation();
  const HomePage = location.pathname === '/';
  const CategoryPage = location.pathname.startsWith('/quotes/') && !location.pathname.endsWith('/edit');;
  const EditPage = location.pathname.startsWith('/quotes/') && location.pathname.endsWith('/edit');
  const shouldDisplayFlex = HomePage || CategoryPage;

  return (
    <div>
      <NavBar/>
      <div className={HomePage || CategoryPage ? 'd-flex' : ''}>
        {(HomePage || (CategoryPage && !EditPage)) && <CategoriesList/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addQuote" element={<AddQuote/>}/>
          <Route path="/quotes/:id" element={<Home/>}/>
          <Route path="/quotes/:id/edit" element={<AddQuote/>}/>
          <Route path="*" element={<h2>Not found</h2>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
