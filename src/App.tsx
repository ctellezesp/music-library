import { FC } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LibraryComponent } from './component/library.component';
import { CreateSongComponent } from './component/create-song.component';
import { ViewComponent } from './component/view-song.component';
import { EditSongComponent } from './component/edit-song.component';
import { Navbar } from './component/navbar.component';

export const App: FC = (): JSX.Element => {
	return (
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<Navbar />
				<Switch>
					<Route path="/" exact component={LibraryComponent} />
					<Route path="/create" component={CreateSongComponent} />
					<Route path="/edit/:id" component={EditSongComponent} />
					<Route path="/song/:id" component={ViewComponent} />
				</Switch>
			</SnackbarProvider>
		</BrowserRouter>
	);
};
