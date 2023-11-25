import React from 'react'
import { BsFacebook } from 'react-icons/bs'

function FacebookOauth() {

    const handleFacebookClick = () => {
        // Add Auth Logics
    }
    return (
        <BsFacebook
            className="right-2 top-2 cursor-pointer"
            color="#039BE5"
            size={30}
            onClick={handleFacebookClick}
        />
    )
}

export default FacebookOauth