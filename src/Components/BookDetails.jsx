import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookDetails = () => {
  const details = useLoaderData();
  const [borrowCount,setBorrowCount] = useState([]);
  const { user } = useContext(AuthContext);
  const borrowingDate = new Date().toDateString();
  const [returnDate, setReturnDate] = useState(new Date().toDateString());
  const email = user?.email;
  const userName = user?.displayName;
  const detailsWithUser = { ...details, email,userName,returnDate,borrowingDate };


  useEffect(() => {
     axios.get(`https://library-management-server-ten.vercel.app/borrowed-books?email=${email}`)
     .then(data => {
        setBorrowCount(data.data);
     })
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
      <div className="grid grid-cols-2">
        <img src={details.image} alt="" />
        <div>
          <h3 className="text-3xl font-semibold ">{details.name}</h3>
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
                title: "You Can't Borrow more than 3 books",
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
