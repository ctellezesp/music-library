import { FC } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LibraryComponent } from './component/library.component';

export const App: FC = (): JSX.Element => {
	return (
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<Switch>
					<Route path="/" exact component={LibraryComponent} />
				</Switch>
			</SnackbarProvider>
		</BrowserRouter>
	);
};
