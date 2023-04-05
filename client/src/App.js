import './App.css';
import { Main,Login } from './Pages';
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <Routes>
          <Route path="soleid">
            <Route path="home" element={<Main />}/>
            <Route path="login" element={<Login />}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
