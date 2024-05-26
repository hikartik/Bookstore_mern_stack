import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDeleteBook = ()=>{
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
        .then(()=>{
            setLoading(false);
            navigate('/');
        })
        .catch((err)=>{
            setLoading(false);
        })
  }
  return (
    <div className='p-4'>
        <BackButton></BackButton>
        <h1 className='text 3-xl my-4'>Delete Book</h1>
        {loading?<Spinner/>:''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are you sure you want to delete this Book</h3>
            <button className='p-4 bg-red-600 text-whtie m-8 w-full' onClick={handleDeleteBook}>
                Yes, Delete it
            </button>
        </div>
    </div>
  )

};

export default DeleteBook;