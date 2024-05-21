import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
const BorrowedBooks = () => {
    const [books,setBooks] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {
        
            axios.get(`https://library-management-server-ten.vercel.app/borrowed-books?email=${user.email}`)
            .then(data => {
                setBooks(data.data);
            })
        
    },[books,user?.email])
    
    
    
    const handleReturn = (id) => {
        axios.delete(`https://library-management-server-ten.vercel.app/borrowed-books/${id}`)
        .then(data => {
            if(data.data.deletedCount > 0){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Book Returned Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div className="m-5 md:mx-12 lg:mx-20">
            <h3 className="text-start  font-semibold text-2xl my-12">Borrowed Books List ({books.length})</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {
                    books.map((book) => {
                        return <div key={book._id} className="flex flex-col gap-4 border items-center rounded-lg md:flex-row lg:flex-row">
                        <img src={book.image} alt="" className="w-72 h-72 object-cover rounded-tl-lg rounded-bl-lg"/>
                        <div className="space-y-4 pr-5">
                            <h5 className="text-xl font-semibold">{book.name}</h5>
                            <p className="text-base font-medium text-gray-400">{book.category}</p>
                            <p className="text-base font-medium">Borrowed : {book.borrowingDate}</p>
                            <p className="text-base font-medium text-green-500">Return : {book.backDate}</p>
                            <button onClick={() =>handleReturn(book._id)} className="btn mb-5 bg-[#17a288] w-full rounded-full text-white text-lg hover:bg-[#17a288] md:mb-0 lg:mb-0">Return</button>
                        </div>
                    </div>
                    })
                }
            </div>
            
        </div>
    );
};

export default BorrowedBooks;