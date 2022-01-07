import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import Profile, { Profile_DB } from '../models/Profile';
import ShoppingList from '../models/ShoppingList';
import { FirebaseInit } from './FirebaseInit';

export enum DBOutcome {
  OK,
  NOT_FOUND,
  ERROR,
}

interface DBResult<T> {
  dbOutcome: DBOutcome;
  value: T | string | null;
}

enum Collections {
  SHOPPING_LISTS = 'shoppingLists',
  PROFILES = 'profiles',
}

class DB {
  static db = FirebaseInit.getFirestore();

  static addShoppingList = async (newShoppingList: ShoppingList, profile: Profile): Promise<DBResult<ShoppingList>> => {
    try {
      const shoppingListRef = await addDoc(collection(this.db, Collections.SHOPPING_LISTS), {
        name: newShoppingList.name,
        profiles: newShoppingList.profiles.map((profile) => profile.id),
        itemsToBuy: [],
      });

      newShoppingList.id = shoppingListRef.id;

      const profileShoppingListsRef = doc(this.db, Collections.PROFILES, profile.id);

      await updateDoc(profileShoppingListsRef, {
        shoppingLists: arrayUnion(newShoppingList.id),
      });

      console.log('DB: shopping list written with ID ', shoppingListRef.id);
      return { dbOutcome: DBOutcome.OK, value: newShoppingList };
    } catch (e) {
      console.error('DB: error adding new shopping list ', e);
      return { dbOutcome: DBOutcome.ERROR, value: e as string };
    }
  };

  static deleteShoppingList = async (shoppingList: ShoppingList, profile: Profile): Promise<DBResult<ShoppingList>> => {
    try {
      if (shoppingList.id === undefined) throw 'Shopping list "' + shoppingList.name + '" has nod ID!';
      const profileShoppingListsRef = doc(this.db, Collections.PROFILES, profile.id);
      await updateDoc(profileShoppingListsRef, {
        shoppingLists: arrayRemove(shoppingList.id),
      });
      console.log('DB: shopping list "' + shoppingList.name + '" removed from profile "' + profile.name + '"');
      if (shoppingList.profiles.length < 2) {
        await deleteDoc(doc(this.db, Collections.SHOPPING_LISTS, shoppingList.id));
        console.log(
          'DB: deleted shopping list "' +
            shoppingList.name +
            '" with ID ' +
            shoppingList.id +
            ' because was not associated with any profile.'
        );
      } else {
        const shoppingListProfilesRef = doc(this.db, Collections.SHOPPING_LISTS, shoppingList.id);
        await updateDoc(shoppingListProfilesRef, { profiles: arrayRemove(profile.id) });
        console.log('DB: Removed profile "' + profile.name + '" from shopping list "' + shoppingList.name + '"');
      }
      return { dbOutcome: DBOutcome.OK, value: shoppingList };
    } catch (e) {
      console.error('DB: error deleteing shopping list ', e);
      return { dbOutcome: DBOutcome.ERROR, value: e as string };
    }
  };

  static getShoppingLists = async (ids: string[]): Promise<DBResult<ShoppingList[]>> => {
    console.log('DB: getShoppingLists');
    console.log(ids);
    try {
      const shoppingListsDocs = await Promise.all(
        ids.map((id) => {
          return getDoc(doc(this.db, Collections.SHOPPING_LISTS, id));
        })
      );
      const shoppingLists = shoppingListsDocs.map((doc) => {
        return doc.data() as ShoppingList;
      });
      console.log(
        'DB: got shopping lists with ids ' +
          ids.map((id) => {
            return '"' + id + '", ';
          })
      );
      return { dbOutcome: DBOutcome.OK, value: shoppingLists };
    } catch (error) {
      console.log('DB: Error retrieving shopping lists.');
      console.log(error);
      return { dbOutcome: DBOutcome.ERROR, value: error as string };
    }
  };

  static addProfile = async (newProfile: Profile): Promise<DBResult<Profile>> => {
    try {
      await setDoc(doc(this.db, Collections.PROFILES, newProfile.id), {
        name: newProfile.name,
        email: newProfile.email,
        shoppingLists: newProfile.shoppingLists,
      });
      console.log('DB: profile written with ID ', newProfile.id);
      return { dbOutcome: DBOutcome.OK, value: newProfile };
    } catch (e) {
      console.error('DB: error adding new profile ', e);
      return { dbOutcome: DBOutcome.ERROR, value: e as string };
    }
  };

  static getProfile = async (uid: string): Promise<DBResult<Profile>> => {
    const profileRef = doc(this.db, Collections.PROFILES, uid);
    try {
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        const profileResult = profileSnap.data() as Profile_DB;

        const shoppingListsOutcome = await this.getShoppingLists(profileResult.shoppingLists);

        let shoppingLists: ShoppingList[];
        switch (shoppingListsOutcome.dbOutcome) {
          case DBOutcome.OK:
            shoppingLists = shoppingListsOutcome.value as ShoppingList[];
            console.log('DB: set shopping lists for profile');
            break;
          default:
            shoppingLists = [];
            console.log('DB: error setting shopping lists for profile');
            break;
        }

        const profile: Profile = {
          id: profileSnap.id,
          email: profileResult.email,
          name: profileResult.name,
          shoppingLists: shoppingLists,
        };

        console.log('DB: got profile with ID ', uid);
        console.log(profile);
        return { dbOutcome: DBOutcome.OK, value: profile };
      } else {
        console.log('DB: profile not found with ID ', uid);
        return { dbOutcome: DBOutcome.NOT_FOUND, value: 'Profile not found' };
      }
    } catch (e) {
      console.log('DB: error getting profile:', e);
      return { dbOutcome: DBOutcome.ERROR, value: e as string };
    }
  };

  static getProfiles = async (ids: string[]): Promise<DBResult<Profile[]>> => {
    try {
      const profilesDocs = await Promise.all(
        ids.map((id) => {
          return getDoc(doc(this.db, Collections.PROFILES, id));
        })
      );
      const profiles = profilesDocs.map((doc) => {
        return doc.data() as Profile;
      });
      console.log(
        'DB: Retrieved profiles ' +
          profiles.map((profile) => {
            return '"' + profile.name + '", ';
          })
      );
      return { dbOutcome: DBOutcome.OK, value: profiles };
    } catch (error) {
      console.log('DB: Error retrieving profiles.');
      return { dbOutcome: DBOutcome.ERROR, value: error as string };
    }
  };
}

export default DB;
