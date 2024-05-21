import PropTypes from 'prop-types';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const BookCards = ({book}) => {

    const {image,author,category,name,quantity,rating,_id} = book;
    return (
        <div className='border p-5 rounded-lg space-y-4'>
            <div>
                <img src={image} alt="" className='w-full object-cover h-[400px] rounded-md'/>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold text-2xl">{name}</h3>
                <div className="flex justify-between items-center text-base font-medium mt-4">
                    <p>{author}</p>
                    <p>{category}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3 items-center font-medium text-base">
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
                <p className=' font-medium text-base'>Available : {quantity}</p>
                </div>
                <Link to={`/allbooks/${_id}`}>
                <button className='w-full bg-[#17A288] py-3 font-medium rounded-full text-white mt-4'>Update</button>
                </Link>
            </div>
        </div>
    );
};

BookCards.propTypes = {
    book : PropTypes.object,
}
export default BookCards;