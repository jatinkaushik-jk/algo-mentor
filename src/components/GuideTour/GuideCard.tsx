'use client';
import { CardComponentProps } from 'nextstepjs';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GuideCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) => {
//   const [isHovered, setIsHovered] = useState(false);
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const getArrowPosition = (side: string)=>{
    switch (side) {
      case "top":
        return "-bottom-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "-top-2 left-1/2 -translate-x-1/2";
      case "left":
        return "-right-2 top-1/2 -translate-y-1/2";
      case "right":
        return "-left-2 top-1/2 -translate-y-1/2";
    
      default:
        return "-bottom-2 left-1/2 -translate-x-1/2";
    }
  }

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      {/* Arrow */}
      <div className={`absolute transform z-10 ${getArrowPosition(step.side as string)}`}>
        {arrow}
      </div>

      {/* Main Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl dark:hover:shadow-violet-900/30 border border-gray-100 dark:border-slate-700">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 px-6 py-4 sm:px-8 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {step.icon && (
                <div className="text-2xl sm:text-3xl flex-shrink-0">
                  {step.icon}
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                {step.title}
              </h3>
            </div>
            <button
              onClick={skipTour}
              className="flex-shrink-0 p-1.5 hover:bg-violet-700 rounded-lg transition-colors duration-200"
              aria-label="Close tour"
              title="Skip tour"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Content Section */}
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <div className="min-h-24 sm:min-h-28 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed prose dark:prose-invert prose-sm max-w-none">
            {step.content}
          </div>

          {/* Step Indicator */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Step <span className="font-bold text-gray-900 dark:text-white">{currentStep + 1}</span> of <span className="font-bold text-gray-900 dark:text-white">{totalSteps}</span>
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-violet-500 w-2'
                        : 'bg-gray-300 dark:bg-slate-600 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 flex flex-col-reverse sm:flex-row gap-3 sm:gap-2 justify-between">
          {/* Left Actions */}
          <div className="flex gap-2 order-2 sm:order-1">
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-all duration-200 active:scale-95 text-sm sm:text-base flex-1 sm:flex-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex gap-2 order-1 sm:order-2 flex-1 sm:flex-none">
            {step.showSkip && (
              <button
                onClick={skipTour}
                className="px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg font-medium transition-all duration-200 text-sm hidden sm:block"
              >
                Skip all
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-lg font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base flex-1 sm:flex-none"
            >
              <span>{isLastStep ? 'Finish' : 'Next'}</span>
              {!isLastStep && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;