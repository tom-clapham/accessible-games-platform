import {useState, useEffect} from 'react'
import axios from 'axios';
import PublisherCard from './Publisher Card';
import ReactPaginate from 'react-paginate';

const Publishers = () => {

  const [publishers, setPublishers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
        axios.get("http://127.0.0.1:8000/app/publishers/get-all-publishers/")
        .then(response => {
            setPublishers(response.data);
            setLoading(false)
            console.log(response.data.name)
        })
        .catch(error => {
            setLoading(false)
            console.error(error);
        });

    }, [loading]);

    const itemsPerPage = 9;
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = publishers.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(publishers.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % publishers.length;
        setItemOffset(newOffset);
    };

    return (
    <div>
        <h1></h1>
        <div>
            {currentItems.map((publisher) => (
                <PublisherCard
                    id={publisher.id} 
                    name={publisher.name}
                />
            ))};
            <ReactPaginate
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    </div>
    )
}

export default Publishers