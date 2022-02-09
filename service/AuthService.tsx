import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from './FirebaseConfig';

const firebaseAuth = getAuth(firebase);

const AuthService = {
    SignInWithEmailAndPassword: async (email: string, password: string) => {
        try {
            const userCred = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return {
                user: userCred.user
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }

    },

    LoginOut: async () => {
        await signOut(firebaseAuth);
    }
};

export default AuthService;