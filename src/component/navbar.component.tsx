import { FC } from 'react';

import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const Navbar: FC = (): JSX.Element => {
	const history = useHistory();
	return (
		<Box sx={{ flexGrow: 1, marginBottom: '5px' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						onClick={() => history.push('/')}
					>
						Biblioteca Musical
					</Typography>
					<Button color="inherit" onClick={() => history.push('/')}>
						Inicio
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
