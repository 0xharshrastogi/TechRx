import { useState } from 'react';

export const App = (): JSX.Element => {
	const [count] = useState(0);
	return <h1>{count}</h1>;
};
