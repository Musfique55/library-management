import { Link, useLoaderData } from "react-router-dom";
import BookCards from "./BookCards";
import grid from '../../public/categories.png';
import list from '../../public/view-list.png';
import { useEffect, useState } from "react";
const Allbooks = () => {
    const data = useLoaderData();
    const [books,setBooks] = useState(data);
    const [toggleView,setToggleView] = useState('grid');
    useEffect(() => {
        const gridView = document.querySelector('.grid-view');
        const listView = document.querySelector('.list-view');
        if(toggleView === 'list'){
            listView.classList.remove('hidden');
            gridView.classList.add('hidden');
        }else{
            gridView.classList.remove('hidden');
            listView.classList.add('hidden');
        }
        
    },[toggleView,books])
    const handleListView = () => {
        setToggleView('list');    
    }
    const handleGridView = () => {
        setToggleView('grid');
    }
    

    const handleFilter = () => {
        const check = document.getElementById('render');
        if(check.checked){
            const filtered = books.filter(book => (book.quantity > 0));
            setBooks(filtered);
        }else{
            setBooks(data);
        }
    }

    
    return (
        <div className="m-5 md:m-12 lg:mx-20 lg:my-12">
           <h3 className="text-center font-semibold text-4xl my-12">All Books</h3>
           
            <div>
                <div className="hidden justify-between mb-5 md:flex lg:flex">
                    <div>
                    <input type="checkbox" id="render" onChange={handleFilter} /> 
                    <label > Available Books </label> 
                    </div>
                   <div className="flex gap-2 items-center">
                   <img src={list} alt="" className="w-8 h-8 cursor-pointer" title="list view" onClick={handleListView}/>
                    <img src={grid} alt="" className="w-8 h-8 cursor-pointer" title="grid view" onClick={ handleGridView}/>
                   </div>
                </div>
            </div>
           <div className="grid-view">
            
            <div  className="grid grid-cols-1 gap-6 md:grid-cols-2  lg:grid-cols-3">
                
            {
                books.map((book,idx) => {
                    return <BookCards key={idx} book={book} handleFilter={handleFilter}></BookCards>
                })
            }
            </div>
           </div>
            <div className="list-view hidden">
                {
                    books.map((book) => {
                        return <div key={book._id} className="flex items-center gap-4 mb-5 border">
                        <img src={book.image} alt="" className="w-52 h-52"/>
                        <h3 className="text-lg font-medium">{book.name}</h3>
                        <p className="font-medium text-gray-400">Author : {book.author}</p>
                        <p  className="font-medium ">Category : {book.category}</p>
                        <p className="font-medium ">Rating : {book.rating}</p>
                        <p className="font-medium ">Available : {book.quantity}</p>
                        <Link to={`/allbooks/${book._id}`}>
                        <button className='px-7 bg-[#17A288] py-3 font-medium rounded-full text-white'>Update</button>
                        </Link>
                    </div>
                    })
                }
            </div>
        </div>
    );
};

export default Allbooks;