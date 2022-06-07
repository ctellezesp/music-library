import { ISong } from "./song.model";

export interface ILibraryContext {
	songs: ISong[];
	fetchSongs: (items: ISong[]) => void;
	addSong: (song: ISong) => void;
	editSong: (song: ISong) => void;
	deleteSong: (songId: string) => void;
	getSong: (songId: string) => ISong | null | undefined;
}