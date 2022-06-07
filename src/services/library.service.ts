import { db } from '../client/index';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { ISong } from '../models/song.model';
import { showError } from '../utils/errot-util';

const libraryCollection = collection(db, 'library');

export const getLibraryItems = async () => {
  try {
    const libraryItemsSnapshot = (await getDocs(libraryCollection)).docs;
    const libraryItems = libraryItemsSnapshot.map(item => ({ id: item.ref.id, ...item.data() }));
    return libraryItems;
  } catch (err) {
    showError(err);
    return null;
  }
}

export const addLibraryItem = async (item: ISong) => {
  try {
    const { id } = await addDoc(libraryCollection, item);
    const itemAdded: ISong = { id, ...item};
    return itemAdded;
  } catch (err) {
    showError(err);
    return null;
  }
}

export const updateLibraryItem = async (itemID: string, item: any) => {
  try {
    const itemRef = doc(db, 'library', itemID);
    await updateDoc(itemRef, item);
    return { ...item, id: itemID };
  } catch (err) {
    showError(err);
    return null;
  }
}

export const deleteLibraryItem = async (itemId: string) => {
  try {
    const itemRef = doc(db, 'library', itemId);
    await deleteDoc(itemRef);
    return itemId;
  } catch (err) {
    showError(err);
    return null;
  }
}