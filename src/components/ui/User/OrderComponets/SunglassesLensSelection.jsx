import React, { useState } from "react";
import { Link } from "react-router-dom";
import graysvg from '/images/order/gray.svg'
import bluesvg from '/images/order/blue.svg'
import brownsvg from '/images/order/brown.svg'
import greensvg from '/images/order/green.svg'
import yellowsvg from '/images/order/yellow.svg'
import redMirroredSvg from '/images/order/redMirrored.svg'
import blueMirroredSvg from '/images/order/blueMirrored.svg'
import goldMirroredSvg from '/images/order/goldMirrored.svg'
import greenMirroredSvg from '/images/order/greenMirrored.svg'
import SilverMirroredSvg from '/images/order/SilverMirrored.svg'
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({ onUpdate, onNextStep, onSelectedSunglasses }) {
    const [selectedColor, setSelectedColor] = useState("Gray Polarized");

    // Handle user input and update the product
    const handleFrameColorChange = (color) => {
        onUpdate(color);
        setSelectedColor(color.name)
    };

    // navigation
    const handleNext = (step) => {
        onNextStep(step)
    }

    // handling data, sending from child to parent
    // handling sunglasses type

    const dispatch = useDispatch();

    const handleSunglassesTypeAndColor = (sunglassesType, color) => {
        dispatch(updateSelectedOptions({
            "lensProperties": {
                "sunglassesLens": {
                    "sunglassesType": sunglassesType,
                    "color": color
                }
            }
        }));
    };


    return (
        <div className="">
            <h1 className="font-sans font-semibold text-2xl mx-auto mb-10 ">Sunglasses Lens Selection</h1>

            <div className="flex flex-row fixed-div mb-3  bg-white border-2 border-gray-300 rounded-md hover:border-gray-400">
                <div className="w-[60%] p-4">
                    <h2 className="text-lg font-bold mb-2">Polarized (+$99 +$49.50)</h2>
                    <p className=" text-sm font-sans">Reduce glare and haze for clearer vision</p>
                </div>
                <div className="w-[40%] flex items-center bg-white rounded-lg flow-row space-x-2">
                    {/* <img className="h-[80px]" src={clear} alt="free silver package" /> */}
                    <div className={`${selectedColor === "Gray Polarized" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: graysvg, name: "Gray Polarized" });
                                handleSunglassesTypeAndColor("Polarized", "Gray");
                            }}
                            className="h-7 w-7 rounded-full bg-gray-700 cursor-pointer border-white border-4 hover:bg-gray-800"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Blue Polarized" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Blue Polarized" })
                                handleSunglassesTypeAndColor("Polarized", "Blue");
                            }}
                            className="h-7 w-7 rounded-full bg-blue-700 cursor-pointer border-white border-4 hover:bg-blue-800"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:border-gray-400">
                <div className="w-[60%] p-4">
                    <h2 className="text-lg font-bold mb-2">Color Tint (+$29 +$14.50)</h2>
                    <p className=" text-sm font-sans">Sun protection basic lenses</p>
                </div>
                <div className="w-[40%] flex items-center bg-white rounded-lg flow-row space-x-2 flex-wrap">
                    {/* <img className="h-[80px]" src={clear} alt="free silver package" /> */}
                    <div className={`${selectedColor === "Gray Tint" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: graysvg, name: "Gray Tint" })
                                handleSunglassesTypeAndColor("Tint", "Gray");
                            }}
                            className="h-7 w-7 rounded-full bg-gray-700 cursor-pointer border-white border-4 hover:bg-gray-800"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Brown Tint" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: brownsvg, name: "Brown Tint" })
                                handleSunglassesTypeAndColor("Tint", "Brown");
                            }}
                            className="h-7 w-7 rounded-full bg-yellow-800 cursor-pointer border-white border-4 hover:bg-yellow-900"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Green Tint" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: greensvg, name: "Green Tint" })
                                handleSunglassesTypeAndColor("Tint", "Green");
                            }}
                            className="h-7 w-7 rounded-full bg-green-700 cursor-pointer border-white border-4 hover:bg-green-800"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Blue Tint" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Blue Tint" })
                                handleSunglassesTypeAndColor("Tint", "Blue");
                            }}
                            className="h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-4 hover:bg-blue-900"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Yellow Tint" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: yellowsvg, name: "Yellow Tint" })
                                handleSunglassesTypeAndColor("Tint", "Yellow");
                            }}
                            className="h-7 w-7 rounded-full bg-yellow-400 cursor-pointer border-white border-4 hover:bg-yellow-500"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:border-gray-400">
                <div className="w-[60%] p-4">
                    <h2 className="text-lg font-bold mb-2">Mirrored (+$49 +$24.50)</h2>
                    <p className=" text-sm font-sans">High fashionable reflective color</p>
                </div>
                <div className="w-[40%] flex items-center bg-white rounded-lg flow-row space-x-2 flex-wrap ">
                    {/* <img className="h-[80px]" src={clear} alt="free silver package" /> */}
                    <div className={`${selectedColor === "Red Mirrored" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: redMirroredSvg, name: "Red Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Red");
                            }}
                            className="h-7 w-7 rounded-full bg-red-700 cursor-pointer border-white border-4 hover:bg-red-800"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Blue Mirrored" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: blueMirroredSvg, name: "Blue Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Blue");
                            }}
                            className="h-7 w-7 rounded-full bg-blue-800 cursor-pointer border-white border-4 hover:bg-blue-900"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Gold Mirrored" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: goldMirroredSvg, name: "Gold Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Gold");
                            }}
                            className="h-7 w-7 rounded-full bg-yellow-700 cursor-pointer border-white border-4 hover:bg-yellow-800"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Green Mirrored" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: greenMirroredSvg, name: "Green Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Green");
                            }}
                            className="h-7 w-7 rounded-full bg-green-800 cursor-pointer border-white border-4 hover:bg-green-900"
                        ></div>
                    </div>
                    <div className={`${selectedColor === "Silver Mirrored" ? "border-black rounded-full border-2" : ""}`}>
                        <div
                            onClick={() => {
                                handleFrameColorChange({ image: SilverMirroredSvg, name: "Silver Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Silver");
                            }}
                            className="h-7 w-7 rounded-full bg-gray-400 cursor-pointer border-white border-4 hover:bg-gray-500"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <button onClick={() => handleNext(10)} type="button" className="text-white bg-red-800 hover:bg-red-900 focus:outline-none 
                focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-sm py-2.5 mb-2
                 w-full">
                    Select
                </button>
            </div>
        </div>
    )
}


