import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from "react-rating-stars-component";

const BookDetails = () => {
  const details = useLoaderData();
  const [borrowCount,setBorrowCount] = useState([]);
  const { user } = useContext(AuthContext);
  const borrowingDate = new Date().toDateString();
  const [error,setError] = useState('');
  const [returnDate, setReturnDate] = useState(new Date().toDateString());
  const email = user?.email;
  const userName = user?.displayName;
  const detailsWithUser = { ...details, email,userName,returnDate,borrowingDate };


  useEffect(() => {
     axios.get(`https://library-management-server-ten.vercel.app/borrowed-books?email=${email}`)
     .then(data => {
        setBorrowCount(data.data);
     })
     if(!details.quantity > 0 ){
      setError('Sorry Currently The Book is not Available');
    }else if(borrowCount.length < 3){
      setError("You Can't Borrow more than 3 books");
    }
  },[])
       

  
  const handleBids = (e) => {
    e.preventDefault();
    axios
      .post("https://library-management-server-ten.vercel.app/borrowed-books", detailsWithUser)
      .then((data) => {
        if (data.data.acknowledged) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Borrowed Books Successfully",
            showConfirmButton: false,
            timer: 1500,
            target: document.querySelector('dialog')
          });
         
        }
      })
      .catch((error) => {
        const existError = error.response.data?.message;
        if (existError) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: `${existError}`,
            showConfirmButton: false,
            timer: 2500,
            target: document.querySelector('dialog')
          });
        }
      });

  };

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 m-5 md:grid-cols-2 md:m-12 lg:grid-cols-2 lg:mx-20 lg:my-12">
        <img src={details.image} alt="" className="h-[600px] object-cover w-full "/>
        <div className="space-y-5">
          <h3 className="text-3xl font-semibold ">{details.name}</h3>
          <p className="text-medium text-xl">By {details.author}</p>
          <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={details.rating}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
          />
          <p>CHUAN, adding that there were two other CHUAN besides. This has brought forth a theory, that the bulk of these 82 chapters consisted of other writings of Sun Tzu -- we should call them apocryphal -- similar to the WEN TA, of which a specimen dealing with the Nine Situations [15] is preserved in the T`UNG TIEN, and another in Ho Shins commentary. It is suggested that before his interview with Ho Lu, Sun Tzu had only written the 13 chapters, but afterwards composed a sort of exegesis in the form of question and answer between himself and the King. Pi I-hsun, the author of the SUN TZU HSU LU, backs this up with a quotation from the WU YUEH CH`UN CH`IU The King of Wu summoned Sun Tzu, and asked him questions about the art of war.</p>

         <div className="flex mt-5 items-center justify-between">
         <p><span className=" py-2 px-5 bg-green-200 rounded-full text-green-500 font-semibold">{details.category}</span></p> 
         <p className="text-green-500 font-medium">Available : {details.quantity}</p>
         </div>
        
        <br />  
        
          { details.quantity > 0 && borrowCount.length < 3 ? 
            <button id="borrow"
            onClick={()=>document.getElementById('my_modal_3').showModal()}
              className="px-8  bg-[#17A288] py-3 font-medium rounded-full text-white mt-5"
            >
              Borrow
            </button>
           : 
            <button onClick={() => Swal.fire({
                position: "top",
                icon: "error",
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500
              })} className="px-8  bg-[#17A288] py-3 font-medium rounded-full text-white mt-5">
              Borrow
            </button>
          }
        </div>
        <dialog id="my_modal_3" className="modal"  >
          <div className="modal-box  p-12">
            <h3 className="text-center text-3xl  font-bold">Borrow Book</h3>
            <button  onClick={()=>document.getElementById("my_modal_3").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <form method="dialog" onSubmit={handleBids}>
            <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="Email" value={detailsWithUser.userName} className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                        </div>
            <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Email" value={detailsWithUser.email} className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                        </div>
                        <div className="mt-5">
                        <label className="label">
                            <span className="label-text">Return Date</span>
                        </label>
                        <DatePicker required selected={returnDate} onChange={(date) => setReturnDate(date)} className= 'input z-50 w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md' />   
                        </div>
                    
                        <button type="submit"  className="btn w-full mt-5 bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Submit</button>
                      
            </form>
            <form >
                                 
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default BookDetails;
