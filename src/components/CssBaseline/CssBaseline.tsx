import { createGlobalStyle } from 'styled-components';

import '@fontsource/source-sans-pro';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        padding: 0;
        margin: 0;

        box-sizing: border-box;
    }

    html {
        overflow: hidden;
    }

    body {
        -webkit-font-smoothing: antialiased;

        font-family: 'Source Sans Pro', sans-serif;
    }
`;

const CssBaseline = () => {
	return (
		<>
			<GlobalStyle />
		</>
	);
};

export default CssBaseline;
