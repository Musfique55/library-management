import { useLoaderData } from "react-router-dom";

const BookDetails = () => {
    const details = useLoaderData();
    console.log(details);
    return (
        <div>
            <div className="grid grid-cols-2">
                <img src={details.image} alt="" />
                <div>
                   <h3 className="text-3xl font-semibold ">{details.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;