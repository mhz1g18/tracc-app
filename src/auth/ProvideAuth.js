import React from 'react'
import useProvideAuth from './UseProvideAuth'
import AuthContext from './AuthContext'

const ProvideAuth = ({children}) => {
    const auth = useProvideAuth()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default ProvideAuth