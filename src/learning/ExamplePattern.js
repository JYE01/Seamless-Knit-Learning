import React from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExamplePattern = () => {
    const handleLastPage = async (e) => {
        toast.success("It's the last section of this topic!", {
          position: "top-center",
          autoClose: 3000,
          onClose: () => window.location.href = "/Main/Dashboard",
        });
      }; 
    return (
        <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
        <h1 className="text-3xl font-bold mb-6">Continuous patterns by 24 stitches</h1>

        <h1 className="text-3xl font-bold mb-6">Single figures</h1>
        <h1 className="text-3xl font-bold mb-6">Bands</h1>
        <h1 className="text-3xl font-bold mb-6">Other continuous patterns</h1>
        <div className="flex justify-between mt-6">
          <Link to="/Main/ProbKnit">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</button>
          </Link>
            <button onClick = {handleLastPage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button> 
        </div>
        <ToastContainer />
        </div>
    )
}

export default ExamplePattern