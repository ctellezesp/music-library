import { db } from '../client/index';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';

const libraryCollection = collection(db, 'library');

export const getLibraryItems = async () => {
  try {
    const libraryItemsSnapshot = (await getDocs(libraryCollection)).docs;
    const libraryItems = libraryItemsSnapshot.map(item => ({ id: item.ref.id, ...item.data() }));
    return libraryItems;
  } catch (err) {
    return err;
  }
}