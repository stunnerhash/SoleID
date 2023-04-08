import './App.css';
import { Main,Login,OrgLogin,OrgMain,THistory} from './Pages';

import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <Routes>
          <Route path="soleid">
            <Route path="home" element={<Main />}/>
            <Route path="login" element={<Login />}/>
             <Route path="orgLogin" element={<OrgLogin/>}/>
             <Route path="orgMain" element={<OrgMain/>} />
             <Route path="tHistory" element={<THistory/>} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
