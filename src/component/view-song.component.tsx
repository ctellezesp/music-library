import React, { FC, useContext, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import {
	Grid,
	Stack,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Slide,
	TextField,
	Button,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format, fromUnixTime } from 'date-fns';
import { useSnackbar } from 'notistack';

import { LibraryContext } from '../context/library.context';
import { ISong } from '../models/song.model';
import { deleteLibraryItem } from '../services/library.service';

const boxStyles = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	gap: '10px',
};

const modalBoxStyles = {
	display: 'grid',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '5px',
	width: '100%',
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const ViewComponent: FC = (): JSX.Element => {
	const fakeSong: ISong = {
		id: '',
		title: '',
		content: '',
		files: [],
		date: 0,
	};

	const { id }: { id: string } = useParams();
	const { getSong, deleteSong } = useContext(LibraryContext);
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();

	const [songInfo, setSongInfo] = useState<ISong>(fakeSong);
	const [imageModal, setImageModal] = useState({
		open: false,
		image: '',
	});

	useEffect(() => {
		const song = getSong(id);
		if (song) {
			setSongInfo(song);
		} else {
			history.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleClickImage = (image: string) => {
		setImageModal({
			open: true,
			image,
		});
	};

	const handleClose = () => {
		setImageModal({
			open: false,
			image: '',
		});
	};

	const handleDelete = async () => {
		const response = await deleteLibraryItem(id);
		if (response) {
			deleteSong(id);
			enqueueSnackbar(`Canción eliminada`, {
				variant: 'success',
				resumeHideDuration: 3000,
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
			});
			history.push('/');
		} else {
			enqueueSnackbar(
				`Esta canción no puede ser eliminada, intente más tarde`,
				{
					variant: 'error',
					resumeHideDuration: 6000,
					anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
				}
			);
		}
	};

	return (
		<Grid container justifyContent="center">
			<Grid item xs={12} md={10} lg={8}>
				<Stack direction="row" justifyContent="flex-end" spacing={2}>
					<Button
						variant="outlined"
						startIcon={<EditIcon />}
						onClick={() => history.push(`/edit/${id}`)}
					>
						Editar
					</Button>
					<Button
						variant="outlined"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
					>
						Eliminar
					</Button>
				</Stack>
				<Stack spacing={2}>
					<Typography variant="h4" align="center">
						{songInfo.title}
					</Typography>
					<Typography variant="body1" align="center">
						{`Creado el ${format(fromUnixTime(songInfo.date), 'dd/MM/yyyy')}`}
					</Typography>
				</Stack>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="lyrics"
						id="lyrics-header"
					>
						<Typography>Letra</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{songInfo.content ? (
							<TextField
								fullWidth
								multiline
								value={songInfo.content}
								disabled
							/>
						) : (
							<Typography variant="body1" align="center">
								Letra no agregada
							</Typography>
						)}
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="images"
						id="images-header"
					>
						<Typography>Imágenes</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={boxStyles}>
							{songInfo.files &&
								songInfo.files.length > 0 &&
								songInfo.files.map((image: string) => (
									<div onClick={() => handleClickImage(image)}>
										<img src={image} alt={image} width="100%" />
									</div>
								))}
							{!songInfo.files?.length && (
								<Typography variant="body1" align="center">
									No se encontraron imágenes
								</Typography>
							)}
						</Box>
					</AccordionDetails>
				</Accordion>
			</Grid>
			<Dialog
				fullScreen
				open={imageModal.open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Box sx={modalBoxStyles}>
					<img src={imageModal.image} alt={imageModal.image} width="inherit" />
				</Box>
			</Dialog>
		</Grid>
	);
};
