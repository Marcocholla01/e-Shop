import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BASE_URL } from '../config';
import axios from 'axios';

const ActivationPage = () => {
    const { activation_token } = useSearchParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${BASE_URL}/activation`, {
                        activation_token
                    });
                    console.log(res.data.message)
                } catch (error) {
                    console.log(error.response.data.message)
                    setError(true)
                }
            };
            activationEmail();
        }
    }, [activation_token])

    return (
        <div className='w-full h-full flex justify-center items-center text-lg font-semibold'>
            {
                error ? (
                    <p>Your token is Expired!!</p>
                ) : (
                        <p>Your Account has been created successfully!!</p>
                )
            }
        </div>
    )
}

export default ActivationPage