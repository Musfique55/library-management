import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BookDetails = () => {
  const details = useLoaderData();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const email = user?.email;
  const userName = user?.displayName;
  
  const detailsWithUser = { ...details, email,userName,startDate };
 console.log(detailsWithUser);
  const handleBids = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/borrowed-books", detailsWithUser)
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
          {details.quantity > 0 ? (
            <button
            onClick={()=>document.getElementById('my_modal_3').showModal()}
              className="px-8  bg-[#17A288] py-3 font-medium rounded-full text-white mt-5"
            >
              Borrow
            </button>
          ) : (
            <button
              disabled
              className="px-8  bg-[#abcac5] py-3 font-medium rounded-full text-white mt-5"
            >
              Borrow
            </button>
          )}
        </div>
        <dialog id="my_modal_3" className="modal"  >
          <div className="modal-box h-[550px] p-12">
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
                        <DatePicker required selected={startDate} onChange={(date) => setStartDate(date)} className= 'input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md' />   
                        </div>
                    
                        <button type="submit"  className="btn bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Submit</button>
                      
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
