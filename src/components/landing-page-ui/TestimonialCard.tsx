import Image from 'next/image';
import { BiSolidQuoteAltLeft } from "react-icons/bi";

// 1. Defined Types for Scalability
interface TestimonialCardProps {
  quote: string;
  authorName: string;
  avatar: string;
  rating?: number; // Optional: Defaults to 5
  className?: string; // Optional: For overriding container styles
}

// 2. Internal Icon Components to avoid external dependencies

const StarIcon = () => (
  <svg 
    className="w-5 h-5 text-orange-400" 
    fill="currentColor" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  avatar,
  rating = 5,
  className = "",
}) => {
  return (
    <div 
      className={`
        bg-white 
        rounded-3xl 
        border border-gray-200 
        p-8 
        shadow-sm
        hover:shadow-md
        hover:scale-105
        duration-300
        max-w-md 
        w-full
        ${className}
      `}
    >
      {/* Header: Icon & Stars */}
      <div className="flex justify-between items-center mb-6">
        <div className="-ml-1">
          <BiSolidQuoteAltLeft size={40} color='#135CE7' opacity={0.4} />
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: rating }).map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>
      </div>

      {/* Body: Quote Text */}
      <blockquote className="text-gray-900 text-lg leading-relaxed font-medium mb-8 text-start">
        {quote}
      </blockquote>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200 mb-6" />

      {/* Footer: User Profile */}
      <div className="flex items-center gap-4">
        <div className='w-12 h-12'>
            <Image
          src={avatar}
          alt={"Avatar"}
          height={200}
          width={200}
          className="rounded-full object-cover border border-gray-100 bg-purple-100"
        />
        </div>
        <div>
          <h4 className="text-gray-900 font-bold text-base">
            {authorName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;