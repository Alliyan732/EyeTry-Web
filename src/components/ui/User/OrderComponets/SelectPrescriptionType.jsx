import React, { useState } from "react";

export default function SelectLensTypeComponent({onNextStep , onSelectedOptions}) {

    const handleSelections = (type) =>{
      onSelectedOptions(type)
    }

    const handleNext = () => {
      onNextStep();
    }

  return (
    <div>
      <h1 className="font-sans font-semibold text-3xl mx-auto mb-10 ">Select a prescription type</h1>

      <div onClick={ () => { handleSelections("Single Vision"); handleNext() }} class="cursor-pointer fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Single Vision</h2>
        <p class=" text-base font-sans">Most common prescription lenses, used for either distance or near vision</p>
      </div>

      <div onClick={ () => { handleSelections("Progressive"); handleNext() }} class="cursor-pointer fixed-div mb-3 bg-white border-gray-300 border-2 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Progressive</h2>
        <p class="text-base font-sans">No-line lenses with visual field options, including combinations of distance, intermediate, and near vision.</p>
      </div>

      <div onClick={ () => { handleSelections("Bifocal"); handleNext() }} class="cursor-pointer fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Bifocal</h2>
        <p class="text-base font-sans">Lenses with two fields of vision (distance and near) separated by a visible line.</p>
      </div>
    </div>
  )
}


