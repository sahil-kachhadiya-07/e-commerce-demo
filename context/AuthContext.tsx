'use client'

import { auth } from '@/lib/firestore/fierbase'
import { onAuthStateChanged } from 'firebase/auth'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

interface AuthContextProviderProps {
  children: ReactNode
}
interface AuthContextType {
  user: any | null
  isLoading: boolean
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true
}
const AuthContext = createContext<AuthContextType>(defaultAuthContext)
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children
}) => {
  //this is gives state of current user
  const [user, setUser] = useState<any | null>(undefined)
  useEffect(() => {
    //Adds an observer for changes to the user's sign-in state.
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsub()
  }, [])
  return (
    <AuthContext.Provider value={{ user, isLoading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContextProvider
