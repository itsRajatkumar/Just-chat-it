import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { ToastEmmitor } from "./Utills/OpenToast";
// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: user?.displayName,
        authProvider: "google",
        email: user?.email,
        photoURL:user?.photoURL || ""
      });
    }
  } catch (err) {
    console.error(err);
    ToastEmmitor("error",err.message)
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    ToastEmmitor("success","Login Success")
  } catch (err) {
    console.error(err);
    ToastEmmitor("error",err.message)
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
      .then(async function (result) {
        const user = result.user;
        await addDoc(collection(db, "users"), {
          uid: user?.uid,
          name,
          authProvider: "local",
          email,
          photoURL:user?.photoURL || ""
        });
        ToastEmmitor("success","Login Success")
      })
      .catch(function (error) {
        ToastEmmitor("error",error.message)
        console.log(error);
      });
  } catch (err) {
    console.error(err);
    ToastEmmitor("error",err.message)
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    ToastEmmitor("success","Password reset link sent!");
  } catch (err) {
    console.error(err);
    ToastEmmitor("error",err.message)
  }
};

const logout = () => {
  signOut(auth);
  ToastEmmitor("success","Logout Success")

};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
