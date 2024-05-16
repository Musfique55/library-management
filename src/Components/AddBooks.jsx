import Swal from "sweetalert2";

const AddBooks = () => {
    const handleNewBooks = (e) => {
        e.preventDefault();
        const bookname = e.target.name.value;
        const image = e.target.photoURL.value;
        const quantity = e.target.quantity.value;
        const authorname = e.target.authorname.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const rating = e.target.rating.value;
        const book = {bookname,image,quantity,authorname,category,description,rating};
        fetch('https://library-management-server-ten.vercel.app/allbooks',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Book added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                e.target.reset();
            }
        })
    }
    return (
        <div>
            <div>
                <div className="hero min-h-screen ">
                    <div className=" flex-col w-[503px] p-4  border">
                        <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-center font-bold">Add New Books</h1>
                        </div>
                        <div className="w-full bg-base-100">
                            <form onSubmit={handleNewBooks} className="card-body pb-0">
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Book Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Book Name" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input name="photoURL" type="text" placeholder="Image URL" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Quantity of the book</span>
                                </label>
                                <input name="quantity" type="number" placeholder="Quantity" className="input w-full input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Author Name</span>
                                </label>
                                <input name="authorname" type="text" placeholder="Author Name" className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select name="category" id="" className=" border-2 border-gray-300 p-3 rounded-xl">
                                    <option defaultValue="Select a Category" >Select a Category</option>
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
                                    <span className="label-text">Short Description</span>
                                </label>
                                <input name="description" type="text" placeholder="Description" className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <input name="rating" type="text" placeholder="Rating" className="input input-bordered border-gray-300 border-2 rounded-xl focus:outline-none focus:border-gray-300 focus:shadow-md" required />
                                </div>
                                
                                <div className="form-control mt-6">
                                <button className="btn bg-[#17a288] text-white text-lg hover:bg-[#17a288]">Add Books</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );
};

export default AddBooks;