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
            console.log(response.data)
            setPublishers(response.data);
            setLoading(false)
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
    <div className='p-container'>
        <div className='p-title'>
            <h1>Verified Publishers</h1>
        </div>
        <div className='p-title'>
            <h3>Click on any of the publishers below to discover more about them and the games they have contributed to the platform.</h3>
        </div>
        <div className='p-card-container'>
            {currentItems.map((publisher) => (
                <PublisherCard
                    id={publisher.id} 
                    name={publisher.name}
                    logo={publisher.logo}
                />
            ))}
        </div>
        <ReactPaginate
            className='p-page-selector'
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            containerClassName={"pagination"}
            activeClassName={"active"}
        />
    </div>
    )
}

export default Publishers