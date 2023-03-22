import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import AuthorsList from './views/AuthorsList';
import CreateAuthor from './views/CreateAuthor';
import UpdateAuthor from './views/UpdateAuthor';


function App() {
  return (
    <div>
      <h1> Authors</h1>
   
      <Routes>
        <Route path="/" element={<AuthorsList />} />
        <Route path="/authors/new" element={<CreateAuthor />} />
        <Route path="/authors/:id/edit" element={<UpdateAuthor />} />
      </Routes>

    </div>
  );
}

export default App;
