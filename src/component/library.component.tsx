import { ChangeEvent, FC, useContext, useState, useEffect } from 'react';

import {
	Grid,
	TextField,
	Paper,
	Typography,
	Button,
	Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

import { LibraryContext } from '../context/library.context';
import { ISong } from '../models/song.model';
import { getLibraryItems } from '../services/library.service';
import { cutString } from '../utils/cut-string.util';
import { Spinner } from './spinner.component';
import { orderByUtil } from '../utils/order-by.util';

export const LibraryComponent: FC = (): JSX.Element => {
	const { songs, fetchSongs } = useContext(LibraryContext);
	const history = useHistory();

	const [state, setState] = useState<ISong[]>(songs);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getSongs = async () => {
			const songItems: ISong[] = (await getLibraryItems()) as ISong[];
			setState(songItems);
			fetchSongs(songItems);
			setLoading(false);
		};
		getSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.currentTarget;
		setState(
			value.length
				? state.filter((item: ISong) =>
						item.title.toLowerCase().includes(value.toLowerCase())
				  )
				: songs
		);
	};

	const redirectTo = (path: string) => {
		history.push(path);
	};

	return loading ? (
		<Spinner />
	) : (
		<>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{ marginTop: '15px' }}
			>
				<Grid item xs={12} md={8} lg={6}>
					<TextField
						fullWidth
						variant="outlined"
						label="Buscar canción..."
						name="songName"
						onChange={handleChange}
					/>
				</Grid>
				<Grid xs={12} md={10} lg={8}>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						sx={{
							margin: '10px 0',
						}}
						onClick={() => redirectTo('/create')}
					>
						Añadir Canción
					</Button>
					{!state.length && (
						<Typography
							variant="body1"
							align="center"
							sx={{ margin: '10px 0' }}
						>
							No se encontraron elementos
						</Typography>
					)}
					<Grid container spacing={2}>
						{state.length > 0 &&
							orderByUtil(state, 'title', 'asc').map((item: ISong) => (
								<Grid item xs={12} md={4}>
									<Paper elevation={1} sx={{ padding: '10px' }}>
										<Typography variant="h5">{item.title}</Typography>
										<Typography variant="body2" align="justify">
											{cutString(item.content)}
										</Typography>
										<Stack direction="row-reverse">
											<Button
												variant="text"
												onClick={() => redirectTo(`/song/${item.id}`)}
											>
												Ver contenido
											</Button>
										</Stack>
									</Paper>
								</Grid>
							))}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
