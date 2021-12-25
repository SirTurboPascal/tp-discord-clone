import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import HomePage from './pages/HomePage';
import { CssBaseline } from './components/CssBaseline';

import store from './store';

const App = () => {
	return (
		<>
			<CssBaseline />

			<HomePage />
		</>
	);
};

const AppWrapper = () => {
	return (
		<>
			<Provider store={store}>
				<App />
			</Provider>
		</>
	);
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
