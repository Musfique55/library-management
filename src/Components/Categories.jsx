import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Categories = ({item}) => {
    return (
        <Link to={`/category/${item.category}`}>
        <div className="h-[260px] w-[360px] category flex justify-center items-center cursor-pointer" style={{background : `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${item.image})`}}>
            <h5 className='font-semibold text-3xl text-white'>{item.category}</h5>
        </div>
        </Link>
    );
};

Categories.propTypes = {
    item : PropTypes.object.isRequired
}
export default Categories;