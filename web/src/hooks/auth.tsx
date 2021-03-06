import React, {createContext, useCallback, useState, useContext} from 'react';
import api from '../services/api';

interface SignCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(credentials: SignCredentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

   // const [data, setData] = useState<AuthState | null>(null);
   // const [data, setData] = useState<AuthState>({} as AuthState);

   const [data, setData] = useState<AuthState>(() => {
    
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if ( token && user ) {
        return { token, user: JSON.parse(user)};
    }
    return {} as AuthState;
    });

    
    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('/sessions', {
            email,
            password
        });
        //console.log(response.data);
        const {user, token} = response.data;

        localStorage.setItem('@Gobarber:token', token);
        localStorage.setItem('@Gobarber:user', JSON.stringify(user));

        setData({token, user})
    },[]);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Gobarber:token');
        localStorage.removeItem('@Gobarber:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
} 

export {AuthContext, AuthProvider, useAuth};
