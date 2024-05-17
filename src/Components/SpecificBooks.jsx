import PropTypes from 'prop-types';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const SpecificBooks = ({book}) => {
    return (
        <div className='p-7  border space-y-5 rounded-xl'>
            <div>
                <img src={book.image} alt="" className='w-full object-cover h-[350px] rounded-xl'/>
            </div>
            <div className='space-y-4'>
                <h5 className='font-semibold text-2xl'>{book.name}</h5>
                <div className="flex justify-between items-center mt-4 text-base font-medium">
                    <p>Author : {book.author}</p>
                    <p>Category : {book.category}</p>
                </div>
                <div className='flex gap-3 items-center mt-4'>
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={book.rating}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
                    <p className='text-base font-medium'>{book.rating}</p>
                </div>
                <Link to={`/book-details/${book._id}`}><button className='w-full  bg-[#17A288] py-3 font-medium rounded-full text-white mt-5'>Details</button></Link>
            </div>
        </div>
    );
};

SpecificBooks.propTypes = {
    book : PropTypes.object
}
export default SpecificBooks;