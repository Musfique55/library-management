import PropTypes from 'prop-types';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const BookCards = ({book}) => {
    const {image,author,category,name,quantity,rating,_id} = book;
    return (
        <div className='border p-5 rounded-lg'>
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <h3>{name}</h3>
                <div className="flex justify-between items-center">
                    <p>{author}</p>
                    <p>{category}</p>
                </div>
                <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={rating}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
                <p>{rating}</p>
                </div>
                <p>Available : {quantity}</p>
                </div>
                <Link to={`/allbooks/${_id}`}>
                <button className='w-full bg-[#17A288] py-3 font-medium rounded-full text-white'>Update</button>
                </Link>
            </div>
        </div>
    );
};

BookCards.propTypes = {
    book : PropTypes.object
}
export default BookCards;