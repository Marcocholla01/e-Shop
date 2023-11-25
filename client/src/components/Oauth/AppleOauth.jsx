import React from 'react'
import { BsApple } from 'react-icons/bs'

function AppleOauth() {
    const handleAppleClick = () => {
        // Add Auth Logics
    }
    return (
        <BsApple
            className=" right-2 top-2 cursor-pointer"
            color=""
            size={30}
            onClick={handleAppleClick}
        />
    )
}

export default AppleOauth