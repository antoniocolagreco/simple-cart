import React, { ReactNode, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { FirebaseInit } from '../api/FirebaseInit';

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
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const auth = getAuth(FirebaseInit.getFirebaseApp());
  console.log('Is loading user: ' + isLoadingUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoadingUser(false);
    });
    return unsubscribe;
  }, [auth]);

  //////////////////////// LOGIN /////////////////////////
  const loginHandler = async (email: string, password: string) => {
    let loginOutcome = LoginOutcome.OK;
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
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
        setIsLoadingUser(false);
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  //////////////////////// SIGNIN /////////////////////////
  const signupHandler = async (email: string, password: string, name: string) => {
    let signupOutcome = SignupOutcome.OK;
    await setPersistence(auth, browserLocalPersistence).then(async () => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name,
          });
          setUser(userCredential.user);
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
    if (user !== undefined && user !== null) return true;
    else return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoadingUser: isLoadingUser,
        user: user,
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
  isLoggedIn(): boolean;
  login(email: string, password: string): Promise<LoginOutcome>;
  logout(): void;
  signup(email: string, password: string, name: string): Promise<SignupOutcome>;
}
