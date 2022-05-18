import { createContext, useState, FC, ReactElement } from 'react';
import { ISong } from '../models/song.model';

interface ILibraryContext {
	songs: ISong[];
	fetchSongs: (items: ISong[]) => void;
	addSong: (song: ISong) => void;
	editSong: (song: ISong) => void;
	deleteSong: (songId: string) => void;
}

export const LibraryContext = createContext<ILibraryContext>({
	songs: [],
	fetchSongs: (items: ISong[]) => null,
	addSong: (song: ISong) => null,
	editSong: (song: ISong) => null,
	deleteSong: (songId: string) => null,
});

type ComponentType = {
	children: ReactElement;
};

export const LibraryContextProvider: FC<ComponentType> = ({ children }) => {
	const [songs, setSongs] = useState<ISong[]>([]);

	const fetchSongs = (songs: ISong[]): void => {
		setSongs(songs);
	};

	const addSong = (song: ISong): void => {
		setSongs([...songs, song]);
	};

	const editSong = (song: ISong): void => {
		setSongs(
			songs.map((currentSong: ISong) =>
				currentSong.id === song.id ? song : currentSong
			)
		);
	};

	const deleteSong = (songId: string): void => {
		setSongs(songs.filter((song: ISong) => song.id === songId));
	};

	return (
		<LibraryContext.Provider
			value={{ songs, fetchSongs, addSong, editSong, deleteSong }}
		>
			{children}
		</LibraryContext.Provider>
	);
};
