import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateBooks = () => {
    const book = useLoaderData();
    const {author,image,category,name,rating,_id} = book;

    const updateBooks = (e) => {
        e.preventDefault();
        const bookname = e.target.name.value;
        const image = e.target.image.value;
        const authorname = e.target.authorname.value;
        const category = e.target.category.value;
        const rating = e.target.rating.value;
        const book = {bookname,image,authorname,category,rating};
        fetch(`https://library-management-server-ten.vercel.app/allbooks/${_id}`,{
            method : 'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Book updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div>
            <div className="hero min-h-screen ">
                    <div className=" flex-col w-[503px] p-4  border">
                        <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-center font-bold">Update Book Details</h1>
                        </div>
                        <div className="w-full bg-base-100">
                            <form onSubmit={updateBooks} className="card-body pb-0">
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Book Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Book Name" defaultValue={name} className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input name="image" type="text" placeholder="Image URL" defaultValue={image} className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Author Name</span>
                                </label>
                                <input name="authorname" type="text" placeholder="Author Name" defaultValue={author} className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select defaultValue={category} name="category" id="" className=" border-2 border-gray-300 p-3 rounded-xl">
                                    <option value="Novel">Novel</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="History">History</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="Horror">Horror</option>
                                </select>
                                </div>
                               
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input name="rating" type="text" placeholder="Rating" defaultValue={rating} className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                
                                <div className="form-control mt-6">
                                <button  className="btn bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Update Book</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </div>
    );
};

export default UpdateBooks;