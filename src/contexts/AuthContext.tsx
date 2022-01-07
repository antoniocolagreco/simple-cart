import { FirebaseError } from '@firebase/util';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DB, { DBOutcome } from '../api/DB';
import { FirebaseInit } from '../api/FirebaseInit';
import { Views } from '../App';
import Profile from '../models/Profile';

export enum LoginOutcome {
  OK,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  UNKNOWN_ERROR,
}

export enum SignupOutcome {
  OK,
  EMAIL_ALREADY_IN_USE,
  UNKNOWN_ERROR,
}

const context: AuthContextInterface = {
  isLoadingUser: true,
  user: null,
  profile: null,
  setProfile: () => {},
  isLoggedIn: () => false,
  login: (email: string, password: string): Promise<LoginOutcome> => {
    return new Promise((resolve, reject) => {
      resolve(LoginOutcome.OK);
    });
  },
  logout: (): void => {},
  signup: (email: string, password: string, name: string): Promise<SignupOutcome> => {
    return new Promise((resolve, reject) => {
      resolve(SignupOutcome.OK);
    });
  },
};

const AuthContext = React.createContext(context);

export default AuthContext;

export const AuthContextProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const auth = getAuth(FirebaseInit.getFirebaseApp());
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser !== null) {
        const getProfileResult = await DB.getProfile(authUser.uid);
        switch (getProfileResult.dbOutcome) {
          case DBOutcome.OK:
            console.log('AUTH: Profile found.');
            setProfile(getProfileResult.value as Profile);
            break;
          case DBOutcome.NOT_FOUND:
            console.log('AUTH: Profile not found, trying to create a new one.');
            const newProfile: Profile = {
              id: authUser.uid,
              email: authUser.email!,
              name: authUser.displayName!,
              shoppingLists: [],
            };
            const addProfileResult = await DB.addProfile(newProfile);
            switch (addProfileResult.dbOutcome) {
              case DBOutcome.OK:
                console.log('AUTH: Created new Profile.');
                setProfile(addProfileResult.value as Profile);
                break;
              case DBOutcome.ERROR:
                console.log('AUTH: Error a new Profile.');
                break;
            }
            break;
          case DBOutcome.ERROR:
            console.log('AUTH: Error');
            break;
        }
      }
      console.log(profile);
      setUser(authUser);
      setIsLoadingUser(false);
      if (authUser) {
        nav(Views.SHOPPING_LISTS);
        console.log('AUTH: Loading user ' + authUser.displayName + ' ' + authUser.email);
      } else {
        nav(Views.LOGIN);
        console.log('AUTH: setting user to null');
      }
    });
    return unsubscribe;
  }, [auth]);

  //////////////////////// LOGIN /////////////////////////
  const loginHandler = async (email: string, password: string) => {
    let loginOutcome = LoginOutcome.OK;
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // setUser(userCredential.user);
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code;
          console.log(errorCode);
          switch (errorCode) {
            case 'auth/user-not-found':
              loginOutcome = LoginOutcome.USER_NOT_FOUND;
              break;
            case 'auth/wrong-password':
              loginOutcome = LoginOutcome.WRONG_PASSWORD;
              break;
            default:
              loginOutcome = LoginOutcome.UNKNOWN_ERROR;
          }
        });
    });

    return loginOutcome;
  };

  //////////////////////// LOGOUT /////////////////////////
  const logoutHandler = async () => {
    await signOut(auth)
      .then(() => {
        setProfile(null);
        setIsLoadingUser(false);
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  //////////////////////// SIGNUP /////////////////////////
  const signupHandler = async (email: string, password: string, name: string) => {
    let signupOutcome = SignupOutcome.OK;
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name,
          });
          // setUser(userCredential.user);
        })
        .catch((error: FirebaseError) => {
          const errorCode = error.code;
          console.log(errorCode);
          switch (errorCode) {
            case 'auth/email-already-in-use':
              signupOutcome = SignupOutcome.EMAIL_ALREADY_IN_USE;
              break;
            default:
              signupOutcome = SignupOutcome.UNKNOWN_ERROR;
          }
        });
    });

    return signupOutcome;
  };

  const isLoggedIn = (): boolean => {
    if (profile !== null && user !== null) return true;
    else return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoadingUser: isLoadingUser,
        user: user,
        profile: profile,
        setProfile: () => setProfile,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        signup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

interface AuthContextInterface {
  isLoadingUser: boolean;
  user: User | null;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  isLoggedIn(): boolean;
  login(email: string, password: string): Promise<LoginOutcome>;
  logout(): void;
  signup(email: string, password: string, name: string): Promise<SignupOutcome>;
}
