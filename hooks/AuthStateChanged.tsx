import firebase from '../service/FirebaseConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface LayoutProps {
    children: React.ReactNode;
}

const AuthStateChanged = ({ children }: LayoutProps) => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const firebaseAuth = getAuth(firebase);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Skeleton/>
    }

    return (
        <>
            {children}
        </>
        );
};

export default AuthStateChanged;