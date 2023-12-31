import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../../layouts/User/UserProfilingNavbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEnvelope, FaUser, } from "react-icons/fa";
import { getUserData, deleteAddress, viewAllPayments, deletePaymentMethod, viewAllPrescriptions, viewSpecificPrescriptions } from '../../../api/userapi';
import tryonImg from '../../../assets/images/UserProfiling/tryon.png'
import { deletePrescription } from "../../../api/userapi";
import TrackOrder from '../../../components/ui/User/OrderComponets/TrackOrder'

export default function ProfileHomeScreen() {
    const [addresses, setAddresses] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = React.useState('')
    const [payments, setPayments] = useState([])
    const [prescriptions, setPrescriptions] = useState([])
    const [isDeleted, setDeleted] = useState(false)

    const profileRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Check if the location includes a hash and it matches the target id
        if (location.hash === '#profile-section' && profileRef.current) {
            profileRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [location]);

    // getting address book
    useEffect(() => {
        getProfileData()
        getPaymentData()
        getPrescriptionsData()
    }, [])

    const getProfileData = async () => {
        try {
            const response = await getUserData()
            setAddresses(response.addressBook)
            setFirstName(response.firstName)
            setLastName(response.lastName)
            setEmail(response.email)
        }
        catch (e) {
            throw e
        }
    }

    // delete address
    const deleteSpecificAddress = async (id) => {
        try {
            await deleteAddress(id)
            getProfileData()
        }
        catch (e) {
            throw e
        }
    }

    // delete Prescription
    const deleteSpecificPrescription = async (pid) => {
        try {
            await deletePrescription(pid)
            console.log("prescription Deleted")
            getPrescriptionsData()
        }
        catch (e) {
            throw e
        }
    }

    // getting payment data 
    const getPaymentData = async () => {
        try {
            const response = await viewAllPayments()
            setPayments(response)
        }
        catch (e) {
            throw e
        }
    }

    // delete Payment
    const deleteSpecificPayment = async (id) => {
        try {
            await deletePaymentMethod(id)
            getPaymentData()
        }
        catch (e) {
            throw e
        }
    }

    // managing prescriptions
    const getPrescriptionsData = async () => {
        try {
            const response = await viewAllPrescriptions()
            setPrescriptions(response)
            // console.log("prescriptions: " + prescriptions)
        }
        catch (e) {
            throw e
        }
    }


    return (
        <div className="flex flex-col min-h-screen">
            <div className=" text-center md:mb-0 mb-4">
                <h3 className="text-2xl mt-10 sm:text-3xl  font-bold font-sans">Manage Profile Information</h3>
                <p className=" font-sans text-base mt-3">Manage Your profile Information here</p>
            </div>
            <div className=" bg-white border mt-10 border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className=" left-0 pl-3 flex items-center pointer-events-none ">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>

                    <h4 className=" text-xl font-bold tracking-tight text-gray-900">My Orders</h4>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    < TrackOrder />
                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Personal Information</h2>
                        <Link to='/user/my_details'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Edit</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input disabled value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="lastname" className="block text-sm font-semibold text-gray-800 font-sans">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input disabled value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>
                        </div>
                    </div>


                    <label id="profile-section" ref={profileRef} htmlFor="email" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input disabled value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                    </div>
                </div>
            </div>





            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">My Prescriptions</h2>
                        <Link to='/user/add_prescription'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Add New Prescription</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {
                            prescriptions.length !== 0 ? (
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                PD Type
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {
                                        prescriptions.map((prescription, index) => (
                                            <tbody key={index} >
                                                <tr className="bg-white border-b hover:bg-gray-50">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {prescription.prescriptionName}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {prescription.dateOfPrescription}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {prescription.pdType}
                                                    </td>
                                                    <td className=" py-4 text-right">
                                                        <Link to={`/user/edit_prescription/${prescription._id}`} >
                                                            <button className="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                                                <BiEdit size={20} className="mr-2" />
                                                                <span>Edit</span>
                                                            </button>
                                                        </Link>
                                                        <button onClick={() => deleteSpecificPrescription(prescription._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                                            <MdDelete size={20} className="mr-2" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            ) : (
                                <div>
                                    <p className="font-sans text-base font-semibold p-2 py-3 ml-2">Prescription Not Added Yet</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>


            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Address Book</h2>
                        <Link to='/user/add_address'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Add New Address</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {
                            addresses.length !== 0 ? (
                                <table className="w-full text-sm text-left text-gray-500">

                                    <tbody>
                                        {
                                            addresses.map((address, index) => (
                                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-base font-sans">
                                                        <h5 className="font-bold text-black mb-2">{address.firstName}</h5>
                                                        <p className="font-semibold text-base font-sans">This is your default delivery address</p>
                                                        <p className="text-base font-sans">
                                                            {address.currentAddress}, {address.city}, {address.zipCode}, {address.country},
                                                            {address.phone}
                                                        </p>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <Link to={`/user/edit_address/${address._id}`}>
                                                            <button className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                                                <BiEdit size={20} className="mr-2" />
                                                                <span>Edit</span>
                                                            </button>
                                                        </Link>
                                                        <button onClick={() => deleteSpecificAddress(address._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                                            <MdDelete size={20} className="mr-2" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            ) : (
                                <div>
                                    <p className="font-sans text-base font-semibold p-2 py-3 ml-2">Address Not Added Yet</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Payment Methods</h2>
                        <Link to='/user/add_payment'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Add New Payment Method</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">

                            <tbody>
                                {
                                    payments.map((payment, index) => (
                                        <tr key={index} className="bg-white border-b">

                                            <td className="px-6 py-4 text-base">
                                                <h5 className=" font-bold text-black">{payment.nameOnCard}</h5>
                                                <p className="text-base font-sans">
                                                    VISA&nbsp;&nbsp;
                                                    {payment.paymentType}&nbsp;&nbsp;
                                                    <br />
                                                    Expiration Date: {payment.expirationMonth}/{payment.expirationYear}&nbsp;&nbsp;
                                                    <br />
                                                    Address: {payment.billingInfo.address}
                                                </p>

                                            </td>
                                            <td className=" py-4 text-right">
                                                <Link to={`/user/edit_payment/${payment._id}`}>
                                                    <button className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                                        <BiEdit size={20} className="mr-2" />
                                                        <span>Edit</span>
                                                    </button>
                                                </Link>
                                                <button onClick={() => deleteSpecificPayment(payment._id)} className="py-1 px-4 rounded inline-flex items-center ml-auto
                                                bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                                 hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                                    <MdDelete size={20} className="mr-2" />
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Try On Images</h2>
                        <Link to='/user/upload_tryon_images'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Upload Image</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                        <img src={tryonImg} alt="logo" className='w-full h-full' />
                        <div className="p-5 flex justify-center space-x-5">
                            <button className="py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent ">
                                <BiEdit size={20} className="mr-2" />
                                <span>Edit</span>
                            </button>
                            <button className="py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent ">
                                <MdDelete size={20} className="mr-2" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900">Giftcard / Store Credit</h2>
                        <Link to='/user/giftcards'><button className="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} className="mr-2" />
                            <span>Buy Gift Cards</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <p className="text-base font-sans mb-5">To check your Gift Card/Store Credit balance, enter your card number or store credit</p>

                    <span className="flex flex-row">
                        <input id='email' className="block w-full sm:w-[80%] lg:w-[50%] pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Gift Card/Store Credit number" type="number" />
                        <button className="ml-5 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent ">
                            <span>Check Balance</span>
                        </button>
                    </span>


                </div>
            </div>

            {/* <div className="flex-grow"></div> */}

        </div>


    );
}

