import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/style";
import { Link , Navigate, useNavigate } from "react-router-dom";
import { RxAvatar } from 'react-icons/rx'
import axios from 'axios'
import { BASE_URL } from "../../config";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const newForm = new FormData();

        newForm.append("file", avatar);
        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);

        //console.log("Form is being submitted");
        axios.post(`${BASE_URL}/user/create-user`, newForm, config).then((res) => {
            if (res.data.success === true) {
                navigate("/")
            }
            //console.log(res)
           // console.log("Request successful:", res);

            // Clear form fields
            setName("");
            setEmail("");
            setPassword("");
            setAvatar(null);

        }).catch((err) => {
            console.log(err)
            // console.log("Request failed:", err);
        })
    }

    const handleFacebookClick = () => {
        console.log(`facebook icon clicked`)
    }
    const handleGoogleClick = () => {
        console.log(`Google icon clicked`)
    }
    const handleAppleClick = () => {
        console.log(`Apple icon clicked`)
    }
    return (
        <div className="min-h-screen bg-grsy-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a new user
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm::px-10">
                    <form action="" className="space-y-6 " onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Names
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="signup-name"
                                    autoComplete="name"
                                    required
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="signup-email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    id="signup-password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter you password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700"
                            >
                                <div className="mt-2 flex items-center">
                                    <span className="inline-block h-8 v-8 rounded-full overflow-hidden">
                                        {
                                            avatar ?
                                                (
                                                    <img src={URL.createObjectURL(avatar)} alt="avatar" className="h-8 w-8 object-cover rounded-full" />
                                                ) : (
                                                    <RxAvatar className="h-8 w-8" />
                                                )

                                        }
                                    </span>
                                    <label htmlFor="file-input" className="ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <span>Upload an image</span>
                                        <input type="file" name="avatar" id="file-input" accept=".jpg,.jpeg,.png"
                                            onChange={handleFileInputChange}
                                            className="sr-only"
                                        />
                                    </label>
                                </div>

                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                REGISTER
                            </button>
                        </div>
                        <div className="  flex justify-center py-2 text-lg font-bold text-gray-700 ">
                            -- OR --
                        </div>
                        <div className="flex justify-center space-x-6 pb-2 px-2 w-full">
                            <BsFacebook className="right-2 top-2 cursor-pointer"
                                color="#039BE5"
                                size={25}
                                onClick={handleFacebookClick} />
                            <FcGoogle className=" right-2 top-2 cursor-pointer"
                                size={25}
                                onClick={handleGoogleClick} />
                            <BsApple className=" right-2 top-2 cursor-pointer"
                                color=""
                                size={25}
                                onClick={handleAppleClick} />
                        </div>
                        <div className={`${styles.noramlFlex} w-full`}>
                            <h4 className='relative w-full h-[40] flex justify-center'>Alraedy have an account?
                                <Link to="/login" className="text-blue-600 pl-2">
                                    Login
                                </Link>
                            </h4>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
