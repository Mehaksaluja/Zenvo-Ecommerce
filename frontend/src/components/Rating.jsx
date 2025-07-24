// frontend/src/components/Rating.jsx
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center text-sm">
      {/* Star 1 */}
      <span className="text-gold">
        {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      {/* Star 2 */}
      <span className="text-gold">
        {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      {/* Star 3 */}
      <span className="text-gold">
        {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      {/* Star 4 */}
      <span className="text-gold">
        {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
      {/* Star 5 */}
      <span className="text-gold">
        {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>

      {/* Optional Review Text */}
      {text && <span className="text-taupe ml-2">{text}</span>}
    </div>
  );
};

export default Rating;