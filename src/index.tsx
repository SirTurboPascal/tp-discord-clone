import ReactDOM from 'react-dom';

import { CssBaseline } from './components/CssBaseline';

const App = () => {
	return (
		<>
			<CssBaseline />

			<h1>Discord Clone</h1>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
