import React from 'react'
import { FcGoogle } from 'react-icons/fc'

function GoogleOauth() {
    const handleGoogleClick = () => {
        // Add Auth Logics
    }
    return (
        <FcGoogle
            className=" right-2 top-2 cursor-pointer"
            size={30}
            onClick={handleGoogleClick}
        />
    )
}

export default GoogleOauth