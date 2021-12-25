import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import { CssBaseline } from './components/CssBaseline';

const App = () => {
	return (
		<>
			<CssBaseline />

			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</>
	);
};

const AppWrapper = () => {
	return (
		<>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</>
	);
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
