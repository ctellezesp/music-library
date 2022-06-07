import {
	FC,
	useState,
	Fragment,
	ChangeEvent,
	useContext,
	useEffect,
} from 'react';

import { getUnixTime } from 'date-fns';
import {
	Stack,
	Grid,
	TextField,
	Paper,
	Button,
	Typography,
	Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';

import { ISong } from '../models/song.model';
import { uploadImage } from '../services/images.service';
import { updateLibraryItem } from '../services/library.service';
import { LibraryContext } from '../context/library.context';

const Input = styled('input')({
	display: 'none',
});

const boxStyles = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '10px',
};

export const EditSongComponent: FC = () => {
	const today: Date = new Date();
	const { id }: { id: string } = useParams();
	const { editSong, getSong } = useContext(LibraryContext);
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();

	const [state, setState] = useState<ISong>({
		title: '',
		content: '',
		date: getUnixTime(today),
		files: [],
	});

	const [uploadingImage, setUploadingImage] = useState<boolean>(false);

	useEffect(() => {
		const getInfo = () => {
			const songInfo: ISong = getSong(id) as ISong;
			setState(songInfo);
		};
		getInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImage = async (
		event: ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		const { files } = event.currentTarget;
		if (files) {
			setUploadingImage(true);
			const imageImgur: string = await uploadImage(files[0] as File);
			if (imageImgur) {
				setState((prevState) => ({
					...prevState,
					files: [...(prevState.files as string[]), imageImgur],
				}));
				setUploadingImage(false);
				enqueueSnackbar(`Imagen agregada`, {
					variant: 'success',
					resumeHideDuration: 3000,
					anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
				});
			}
		}
	};

	const save = async () => {
		if (!state.title) {
			enqueueSnackbar(`Error, verifica tu información`, {
				variant: 'error',
				resumeHideDuration: 5000,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
			});
			return;
		}
		const songEdited = await updateLibraryItem(id, state);
		if (songEdited) {
			editSong(songEdited);
			enqueueSnackbar(`${state.title} editado`, {
				variant: 'success',
				resumeHideDuration: 3000,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
			});
			history.push(`/song/${id}`);
		} else {
			enqueueSnackbar(`Error, verifica tu información`, {
				variant: 'error',
				resumeHideDuration: 5000,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
			});
		}
	};

	const handleDeleteImage = (url: string) => {
		setState((prevState) => ({
			...prevState,
			files: prevState?.files?.filter((file) => file !== url),
		}));
	};

	console.log({
		state,
	});

	return (
		<Fragment>
			<Grid container justifyContent="center" alignItems="center">
				<Grid item xs={12} md={10} lg={8}>
					<Paper elevation={2}>
						<Box sx={{ padding: '10px' }}>
							<Typography variant="h3" align="center">
								Editar canción
							</Typography>
							<Stack spacing={2}>
								<TextField
									fullWidth
									variant="outlined"
									name="title"
									label="Título de la canción"
									value={state.title}
									onChange={handleChange}
								/>
								<TextField
									fullWidth
									variant="outlined"
									name="content"
									label="Letra de la canción"
									multiline
									defaultValue={state.content}
									onChange={handleChange}
								/>
								<label htmlFor="contained-button-file">
									<Input
										accept="image/*"
										id="contained-button-file"
										type="file"
										onChange={handleImage}
									/>
									<LoadingButton
										loading={uploadingImage}
										variant="outlined"
										component="span"
									>
										Subir Imagen
									</LoadingButton>
								</label>
								<Box sx={boxStyles}>
									{state.files &&
										state.files.length > 0 &&
										state.files.map((image: string, index: number) => (
											<Box
												key={index}
												sx={{ display: 'flex', flexDirection: 'column' }}
											>
												<Typography variant="caption" align="center">
													Imagen {index + 1}
												</Typography>
												<Button
													variant="text"
													color="error"
													size="small"
													onClick={() => handleDeleteImage(image)}
												>
													Eliminar Imagen
												</Button>
												<img width="100%" src={image} alt={image} />
											</Box>
										))}
								</Box>
							</Stack>
							<Stack justifyContent="flex-end" alignItems="flex-end">
								<Button
									variant="contained"
									onClick={save}
									disabled={uploadingImage}
								>
									Editar
								</Button>
							</Stack>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Fragment>
	);
};
