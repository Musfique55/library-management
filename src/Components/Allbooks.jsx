import { useLoaderData } from "react-router-dom";
import BookCards from "./BookCards";

const Allbooks = () => {
    const books = useLoaderData();
    return (
        <div className="grid grid-cols-1 gap-6 m-5 md:grid-cols-2 md:m-12 lg:grid-cols-3 lg:mx-20 lg:my-12">
            {
                books.map((book,idx) => {
                    return <BookCards key={idx} book={book}></BookCards>
                })
            }
        </div>
    );
};

export default Allbooks;