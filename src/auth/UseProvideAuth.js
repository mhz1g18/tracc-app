import React, { useState } from 'react'

const getUserFromLocalStorage = () => {
    //const user = JSON.parse(localStorage.getItem('tracc_user'))
    return null
}

const setUserToLocalStorage = (user) => {
    //localStorage.setItem('tracc_user', JSON.stringify(user))
}

const removeUserFromLocalStorage = () => {
    //localStorage.removeItem('tracc_user')
}

const useProvideAuth = () => {
    const [user, setUser] = useState(getUserFromLocalStorage())

    const signin = async (username, password) => {

        /* let resp = await odooLogin(username, password)
        
        if(resp.result) {
            setUser(resp.result)
            setUserToLocalStorage(resp.result)
            return true
        } 

        return false; */
    }

    const signout = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setUser(null)
                removeUserFromLocalStorage()
                resolve(true)
            }, 2000)
        })
    }

    return {
        user,
        signin,
        signout
    }

}


export default useProvideAuth