import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext, ReactNode, useEffect } from 'react'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentiails: SignInProps) => Promise<void>
    signOut: () => Promise<void>
    loadingAuth: boolean;
    loading: boolean;
    error: string;
    setError: (data: string)=>void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type SignInProps = {
    email: string;
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: '',
    });
    const [error,setError] = React.useState<string>('');
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading,setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(()=>{
        async function getUser(){
            const userInfo = await AsyncStorage.getItem('@User')
            let takeUser :UserProps = JSON.parse(userInfo || '{}');

            if(Object.keys(takeUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${takeUser.token}`

                setUser({
                    id: takeUser.id,
                    name: takeUser.name,
                    email: takeUser.token,
                    token: takeUser.token
                })
            }
            setLoading(false)
        }
        getUser()
    },[])

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/users/login', {
                email,
                password
            })
            const { id, name, token } = response.data
            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@User', JSON.stringify(data))
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser({
                id,
                name,
                email,
                token
            })
            setLoadingAuth(false)
        } catch (error) {
            setError('erros na credencial');
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id:'',
                name:'',
                email:'',
                token:''
            })
        })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn,loading,loadingAuth,signOut,error, setError }}>
            {children}
        </AuthContext.Provider>
    )
}