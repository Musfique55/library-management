import { useLoaderData } from "react-router-dom";
import SpecificBooks from "./SpecificBooks";

const SpecificCategory = () => {
    const books = useLoaderData();
    return (
        <div className="m-5 md:mx-12 lg:mx-20">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    books.map(book => {
                        return <SpecificBooks key={book._id} book={book}></SpecificBooks>
                    })
                }
            </div>
        </div>
    );
};

export default SpecificCategory;