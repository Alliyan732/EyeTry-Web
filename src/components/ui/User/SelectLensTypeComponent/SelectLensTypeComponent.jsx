import React, { useState, useEffect } from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";
import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import SunglassesLensPreview from '../OrderComponets/SunglassesLensPreview/SunglassesLensPreview';
import TransitionLensPreview from '../OrderComponets/TransitionLensPreview/TransitionLensPreview';
import SelectGlassesType from "../OrderComponets/SelectGlassesType";
import SelectPrescriptionOption from "../OrderComponets/SelectPrescriptionOption";
import SelectLensTypeComponent from "../OrderComponets/SelectPrescriptionType"
import EnterPrescription from "../OrderComponets/EnterPrescription"
import SaveOrderPrescription from "../OrderComponets/SaveOrderPrescription"
import ChooseLensPackage from "../OrderComponets/ChooseLensPackage"
import SelectLensType from "../OrderComponets/SelectLensType"
import AvailableCoatings from "../OrderComponets/AvailableCoatings"
import ReviewSelections from "../OrderComponets/ReviewSelections"
import SunglassesLensSelection from "../OrderComponets/SunglassesLensSelection"
import TransitionLensSelection from "../OrderComponets/TransitionLensSelection"
import graysvg from '/images/order/gray.svg'


export default function SelectLensTypeScreen() {
  const [selectedOptions, setSelectedOptions] = useState({ package: "", coatings: "" });
  // Define the handleGlassesTypeSelect function to update selectedOptions
  const handleSelectedOptions = (optionType, value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [optionType]: value
    }));
  };

  // animation effect
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Trigger the animation when the component is mounted
    setLoaded(true);
  }, []);

  const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
  const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';

  const [customization, setCustomization] = useState({
    image: graysvg,
    name: 'Gray Polarized',
  });

  // Update the Lens customization state based on user input
  const handleCustomizationUpdate = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(null);
  
  const handleNextStep = (nextStep) => {
    if (nextStep) {
      setPreviousScreen(currentStep);
      setCurrentStep(nextStep);
    } else if (currentStep < 15) {
      setPreviousScreen(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };
  
  // managing previus states comming from child components
  const handlePreviousState = (state) => {
    setPreviousScreen(state)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      if (currentStep <= 8){
        setCurrentStep(currentStep-1)
      }
      else if (currentStep === 8 || currentStep === 9) {
        setCurrentStep(7);
      }
      else if (currentStep === 10 && previousScreen === 8) {
        setCurrentStep(8);
      }
      else if (currentStep === 10 && previousScreen === 9) {
        setCurrentStep(9);
      }
      else if (previousScreen === 10) {
        setCurrentStep(7);
      } 
      else {
        setCurrentStep(previousScreen);
      }
    }
    console.log("prev state: " + previousScreen)
  };

  let rightSideComponent;

  switch (currentStep) {
    case 1:
      rightSideComponent = <SelectGlassesType onSelectedOptions={(value) => handleSelectedOptions("lensType", value)} onNextStep={handleNextStep} />;
      break;
    case 2:
      rightSideComponent = <SelectPrescriptionOption onNextStep={handleNextStep} />;
      break;
    case 3:
      rightSideComponent = <SelectLensTypeComponent onSelectedOptions={(value) => handleSelectedOptions("prescriptionType", value)} onNextStep={handleNextStep} />;
      break;
    case 4:
      rightSideComponent = <EnterPrescription onSelectedOptions={(value) => handleSelectedOptions("prescription", value)} onNextStep={handleNextStep} />;
      break;
    case 5:
      rightSideComponent = <SaveOrderPrescription onNextStep={handleNextStep} />;
      break;
    case 6:
      rightSideComponent = <ChooseLensPackage onSelectedPackage={(value) => handleSelectedOptions("package", value)} onSelectedCoatings={(value) => handleSelectedOptions("coatings", value)} onNextStep={handleNextStep} />
      break;
    case 7:
      rightSideComponent = <SelectLensType onNextStep={handleNextStep} />;
      break;
    case 8:
      rightSideComponent = <TransitionLensSelection onPreviousState={handlePreviousState} onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
      break;
      case 9:
        rightSideComponent = <SunglassesLensSelection onUpdate={handleCustomizationUpdate} onNextStep={handleNextStep} />;
        break;
        case 10:
          rightSideComponent = <AvailableCoatings onNextStep={handleNextStep} />;
      break;
    case 11:
      rightSideComponent = <ReviewSelections selectedOptions={selectedOptions} />;
      break;
    default:
      rightSideComponent = null;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row  sm:px-0 min-h-screen">
        {/* section 1 */}
        <div className="w-full md:w-[55%] mb-10 justify-center sm:justify-start flex flex-col items-center">
          <div className="w-full sm:w-85">
            <div className="">
              {currentStep !== 9 && currentStep !== 8 && (
                <>
                  <div className='bg-gray-700 w-full flex flex-row text-white p-2'>
                    <p className='w-[20%] text-sm justify-center flex items-center cursor-pointer mb-2 whitespace-nowrap'>&lt; Back to frame</p>
                    <p className='w-[60%] mx-auto text-lg justify-center flex mb-4'>Lens Preview</p>
                    <p className='w-[20%]'></p>
                  </div>
                  <div className='p-8 bg-white mt-[-15px] rounded-md w-full'></div>
                  <div className={` justify-center items-center flex ${imageAnimationClass}`}>
                    <img src={yellowGlassesImg} alt="logo" className="w-[80%] h-[80%]" />
                  </div>
                </>
              )}

              {currentStep === 8 && (
                <>
                  <TransitionLensPreview customization={customization} />
                </>
              )}

              {currentStep === 9 && (
                <>
                  <SunglassesLensPreview customization={customization} />
                </>
              )}

            </div>
            {currentStep !== 8 && currentStep !== 9 && (
              <>
                <div className={`px-20 flex flex-row mx-auto mt-4 sm:mt-10 ${textAnimationClass}`}>
                  <div>
                    <h5 className="font-sans text-xl sm:text-3xl font-bold mr-4 sm:mr-10">JACKSON</h5>
                    <p className="font-sans text-md font-semibold mb-4 sm:mb-10">Cat Eye Eyeglasses</p>
                  </div>
                  <div className="ml-auto">
                    <h5 className="font-sans text-xl sm:text-3xl font-bold">$149.00</h5>
                  </div>
                </div>
                <div className={`bg-gray-100 rounded-md p-2 sm:px-4 mr-8 ml-8 mb-8 transform ${textAnimationClass}`}>
                  <h5 className="font-sans text-xl font-bold mr-4 sm:mr-10 mb-2">Gray Polarized Lens</h5>
                  <p className="font-sans text-base">
                    Gray polarized lenses reduce glare and provide clear vision in bright conditions while maintaining natural color perception. They are ideal for outdoor activities and offer UV protection.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* section 2 */}
        <div className="flex flex-col w-full md:w-[45%] shadow-lg shadow-left bg-[#f7f8f9] border-l-[#f1f1f1] border-l-2">
          <div className='bg-gray-200 w-full flex flex-row p-2 font-semibold'>
            <button className="w-[20%] text-base font-normal mb-2 hover:text-blue-400  cursor-pointer" onClick={() => handlePreviousStep()} disabled={currentStep === 1}>
              &lt; <span className="hover:underline">Back</span>
            </button>
            <p className='w-[60%] mx-auto text-lg justify-center flex mb-4'>Lens Selection</p>
            <button className="w-[20%] text-base font-normal mb-2" onClick={() => handleNextStep()} disabled={currentStep === 10}>
              &gt;
            </button>
          </div>
          <div className="flex justify-between p-10 mt-[-15px] rounded-md bg-[#f7f8f9] "></div>
          <div className=" flex flex-col w-[90%] mx-auto flex-1 mb-8">
            <div className="mx-auto w-full p-3">{rightSideComponent}</div>
          </div>
        </div>
      </div>
    </>
  );
}
