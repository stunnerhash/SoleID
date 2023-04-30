import {LandingPage,UserLogin,UserRegister,UserMain,OrganizationLogin,OrganizationMain,OrganizationTransactions,SetPassword} from './pages';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
		<Routes>
			<Route path="" element={<LandingPage/>}/>
			<Route path="user">
				<Route path="" element={<UserMain/>}/>
				<Route path="login" element={<UserLogin />}/>
				<Route path="register" element={<UserRegister/>} />
				<Route path="setPassword" element={<SetPassword/>} />
			</Route>
			<Route path = "organization">
				<Route path="" element={<OrganizationMain/>} />
				<Route path="login" element={<OrganizationLogin/>}/>
				<Route path="transactions" element={<OrganizationTransactions/>} />
			</Route>
		</Routes>
    </div>
  );
}
export default App;
