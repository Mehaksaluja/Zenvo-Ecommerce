import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const Step = ({ number, label, isComplete, isCurrent, linkTo }) => {
    const linkContent = (
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
            ${isComplete ? 'bg-gold border-gold text-white' : ''}
            ${isCurrent ? 'border-gold text-gold' : ''}
            ${!isComplete && !isCurrent ? 'border-taupe/50 text-taupe/50' : ''}
          `}
        >
          {isComplete ? <FiCheck size={24} /> : number}
        </div>
        <span
          className={`font-semibold text-xs md:text-sm
            ${isCurrent ? 'text-charcoal' : 'text-taupe/80'}
          `}
        >
          {label}
        </span>
      </div>
    );

    return isComplete ? <Link to={linkTo}>{linkContent}</Link> : <div>{linkContent}</div>;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 px-4">
      <div className="flex items-start justify-between relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-gold transition-all duration-500"
            style={{
              width: step4 ? '100%' : step3 ? '66.66%' : step2 ? '33.33%' : '0%',
            }}
          ></div>
        </div>

        <div className="relative z-10 w-full flex justify-between">
          <Step number={1} label="Sign In" isComplete={step1} isCurrent={step1 && !step2} linkTo="/login" />
          <Step number={2} label="Shipping" isComplete={step2} isCurrent={step2 && !step3} linkTo="/shipping" />
          <Step number={3} label="Payment" isComplete={step3} isCurrent={step3 && !step4} linkTo="/payment" />
          <Step number={4} label="Place Order" isComplete={step4} isCurrent={step4} linkTo="/placeorder" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;