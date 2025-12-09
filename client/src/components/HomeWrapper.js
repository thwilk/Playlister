import { useContext } from 'react'
import AuthContext from '../auth'

import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn || auth.isguest )
        return <HomeScreen />
    else
        return <SplashScreen />
}