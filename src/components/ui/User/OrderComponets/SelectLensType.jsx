import React, { useState } from "react";
import clear from '/images/order/clear.svg'
import bluelight from '/images/order/bluelight.svg'
import transition from '/images/order/transition.svg'
import sunglasses from '/images/order/sunglasses.svg'
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({onNextStep}) {
    

    const dispatch = useDispatch();
  
    const handleSelections = (value) => {
      // Dispatch an action to update selected package and coatings
      dispatch(updateSelectedOptions({
        "lensProperties":{
            "glassesType":value
        }

      }));
  
    };

    const handleNext = (step) => {
        onNextStep(step)
    }

    

    return (
        <div>
            <h1 className="font-sans font-semibold text-2xl mx-auto mb-10 ">Select Glasses Type</h1>
            
            <div onClick={()=>{handleNext(10) , handleSelections("Clear")}} className="cursor-pointer flex flex-row fixed-div mb-3 hover:border-gray-400 bg-white border-2 border-gray-300 hover:bg-gray-200 rounded-md ">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={clear} alt="free silver package" />
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-bold mb-2">Clear</h2>
                    <p className=" text-sm font-sans">Lenses for everyday use</p>
                </div>
            </div>

            <div onClick={()=>{handleNext(10) , handleSelections("Blue Light Lensesear")}} className="cursor-pointer flex flex-row fixed-div mb-3 hover:border-gray-400 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200 ">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={bluelight} alt="free silver package" />
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-bold mb-2">Blue Light Lenses (+$39 +$19.50)</h2>
                    <p className=" text-sm font-sans">Protect your eyes from the emissions of digital devices</p>
                </div>
            </div>

            <div onClick={()=>{handleNext(8) , handleSelections("Transition / Photochromic")}} className="cursor-pointer flex flex-row fixed-div mb-3 hover:border-gray-400 bg-white border-2 rounded-md border-gray-300 hover:bg-gray-200">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-2" src={transition} alt="free silver package" />
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-bold mb-2">Transition / Photochromic (From +$69 +$34.50)</h2>
                    <p className=" text-sm font-sans">Darken when outdoors, fade back to clear indoors</p>
                </div>
            </div>

            <div onClick={()=>{handleNext(9) , handleSelections("Sunglasses")}} className="cursor-pointer flex flex-row fixed-div mb-3 hover:border-gray-400 bg-white border-2 rounded-md border-gray-300 hover:bg-gray-200">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={sunglasses} alt="free silver package" />
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-bold mb-2">Sunglasses (From +$29 +$14.50)</h2>
                    <p className=" text-sm font-sans">Tints, Mirrored or Polarized</p>
                </div>
            </div>
        </div>
    )
}


