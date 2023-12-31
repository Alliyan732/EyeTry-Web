import React, { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { uploadProfileImage } from '../../../api/userapi';
import defaultImage from '../../../assets/images/UserProfiling/pfpdefault.png';
import { sendImageToIPDServer } from "../../../services/IPD/ipdApi";
import defaultIpd from '../../../assets/images/UserProfiling/defaultIpd.jpeg'
export default function UploadUserImageScreen() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image
    const [ipd, setIpd] = useState(null)

    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(null)


    // Clear the error and success msgs on every rerender
    useEffect(() => {
        setErrorVisible(false)
        setSuccessVisible(false)
        // SetGuidelinesShow(false)
    }, [])

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
        setUploadedImage(URL.createObjectURL(image)); // Use the "image" variable directly
        console.log("image selected: ", image)
    };



    const handleDefaultImageClick = () => {
        document.getElementById('image-input').click();
    };

    // IPD measurement 
    const measureIPD = async (img) => {
        try {
            const res = await sendImageToIPDServer(img)
            if (res.status == 200) {
                setSuccessMessage("Your IPD in mm is " + res.data.ipd_in_mm)
                setErrorMessage('')
                setErrorVisible(false)
                console.log("Your IPD is: ", res.data.ipd_in_mm)
                setIpd(res.data.ipd_in_mm)
            }
            setSuccessVisible(true)
        }
        catch (err) {
            setSuccessMessage('')
            setSuccessVisible(false)
            setErrorMessage(err.response.data.error)
            setErrorVisible(true)
            console.log(err)
        }
    }

    // stroing user IPD in localstorage
    const userIpd = localStorage.setItem('userIPD', ipd)

    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-10">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-3xl  font-semibold font-sans">Measure Your IPD</h3>
                        <p className=" font-sans text-base mt-3">Insert Your IPD Picture</p>
                    </div>

                    <p className="text-xl font-sans font-semibold mt-10 mb-2">Calibration Guide</p>
                    <p>Please Align your face with the camera and make sure the lighting conditions are good. Place marker on your forehead or under your nose, and make sure it also aligns wells with the camera angle.
                        Sample Image is provided below which shows how to hold the marker</p>
                    <p className="mt-5">Consider Sample Image: </p>
                    <img className="w-[500px] h-[400px] object-contain mx-auto mt-5" src={defaultIpd} alt="img" />


                    <p className="text-xl font-sans font-semibold mt-10">Add an Image</p>
                    {successVisible &&
                        <div className=" mt-5 flex items-center p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-semibold">Success alert! {successMessage}</span>
                            </div>
                        </div>
                    }{
                        errorVisible &&
                        <div className=" mt-5 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-semibold">Failed alert!  {errorMessage}</span>
                            </div>
                        </div>
                    }
                    <div className="bg-white border border-gray-200 rounded-lg shadow mt-5 mx-auto mb-10">
                        <div className="flex flex-col items-center justify-between w-full p-5 pt-7 sm:flex-row sm:items-center">
                            <h2 className="mr-auto text-base font-sans tracking-tight text-gray-900 text-justify sm:w-auto sm:mr-5">
                                Please make sure your face is straight and level
                                and proper lighting is available for an effective image capture
                            </h2>
                            {/* <button className="py-2.5 px-4 rounded inline-flex items-center sm:ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mt-5 sm:mt-0">
                                <FaBookOpen size={20} className="mr-2" />
                                <span>Capture Image</span>
                            </button> */}
                        </div>
                        <div className="relative flex items-center justify-center w-full mt-5 border border-t sm:w-4/5 mx-auto">
                            <div className="absolute px-5 text-sm bg-white font-sans">OR</div>
                        </div>
                        <div className="p-5">
                            <div onClick={handleDefaultImageClick} className='w-full h-64 mt-5 flex justify-center cursor-pointer'>
                                {selectedImage ? <img
                                    className='max-w-full max-h-full '
                                    src={uploadedImage} // Use the uploaded image if available, otherwise use the default image
                                    alt="Preview" />
                                    :
                                    <img className='max-w-full max-h-full ' src={defaultImage} alt="preview" />
                                }
                            </div>
                        </div>
                    </div>
                    <div>

                        <input className="invisible" id="image-input"
                            type="file" accept="image/*" onChange={handleImageChange} />

                    </div>

                    {
                    }
                    <div className="w-full flex items-center justify-center">
                        <button onClick={() => measureIPD(selectedImage)} type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10">Measure IPD</button>
                    </div>

                </div>

            </div>

        </div >


    );
}

