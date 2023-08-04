import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from "firebase/functions";
import { ICategory } from "../../models/ICategory";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: `${process.env.REACT_APP_API_KEY}`,
  // apiKey: `${secrets.REACT_APP_API_KEY}`,
  apiKey: "AIzaSyBqgJbGXjBpCjZPQIidD9NMmXKLqvlU91Y",
  authDomain: "renegvde-eshop.firebaseapp.com",
  projectId: "renegvde-eshop",
  storageBucket: "renegvde-eshop.appspot.com",
  messagingSenderId: "1089127656495",
  appId: "1:1089127656495:web:06473ab8a459df6a29aada",
  measurementId: "G-T5D87KH52T",
};

// Initialize Firebase
const firebseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export interface IObjectToAdd {
  title: string;
}

export const addCollectionAndDocuments = async <T extends IObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<ICategory[]> => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as ICategory);
};

export interface IAdditionalData {
  displayName?: string;
}

export interface UserData {
  createdAt: Date;
  displayName: string;
  email: string;
  id: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalData: IAdditionalData
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

const functions = getFunctions(firebseApp);

export const stripePayment = httpsCallable(functions, "handler");
