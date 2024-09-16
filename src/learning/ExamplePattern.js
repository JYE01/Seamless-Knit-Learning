import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExamplePattern = () => {
    const handleLastPage = async (e) => {
        toast.success("It's the last section of this topic!", {
          position: "top-center",
          autoClose: 3000,
          onClose: () => window.location.href = "/Main/Dashboard",
        });
    }; 

    const storage = getStorage(app);
    const [imageUrls, setImageUrls] = useState(Array(35).fill('')); // Initialize an array for all image URLs

    const imagePaths = [
      'Module/MachineKnittingPattern2.gif',
      'Module/MachineKnittingPattern4.gif',
      'Module/MachineKnittingPattern17.gif',
      'Module/MachineKnittingPattern30.gif',
      'Module/MachineKnittingPattern5.gif',
      'Module/MachineKnittingPattern6.gif',
      'Module/MachineKnittingPattern32.gif',
      'Module/MachineKnittingPattern22.gif',
      'Module/MachineKnittingPattern8.gif',
      'Module/MachineKnittingPattern43.gif',
      'Module/MachineKnittingPattern44.gif',
      'Module/MachineKnittingPattern11.gif',
      'Module/MachineKnittingPattern12.gif',
      'Module/MachineKnittingPattern13.gif',
      'Module/MachineKnittingPattern14.gif',
      'Module/MachineKnittingPattern28.gif',
      'Module/MachineKnittingPattern22-2.gif',
      'Module/MachineKnittingPattern23.gif',
      'Module/MachineKnittingPattern18.gif',
      'Module/MachineKnittingPattern27.gif',
      'Module/MachineKnittingPattern26.gif',
      'Module/MachineKnittingPattern29.gif',
      'Module/MachineKnittingPattern24.gif',
      'Module/MachineKnittingPattern25.gif',
      'Module/MachineKnittingPattern16.gif',
      'Module/MachineKnittingPattern19.gif',
      'Module/MachineKnittingPattern21.gif',
      'Module/MachineKnittingPattern33.gif',
      'Module/MachineKnittingPattern34.gif',
      'Module/MachineKnittingPattern35.gif',
      'Module/MachineKnittingPattern39.gif',
      'Module/MachineKnittingPattern36.gif',
      'Module/MachineKnittingPattern37.gif',
      'Module/MachineKnittingPattern40.gif',
      'Module/MachineKnittingPattern42.gif'
    ];

    useEffect(() => {
        const fetchImages = async () => {
            const updatedUrls = await Promise.all(imagePaths.map(async (path) => {
                const storageRef = ref(storage, `gs://seamless-knitting.appspot.com/${path}`);
                return await getDownloadURL(storageRef)
                    .catch((error) => {
                        console.error(`Cannot get image from firebase storage for ${path}`, error);
                        return '';
                    });
            }));
            setImageUrls(updatedUrls); // Set the array of image URLs after fetching them
        };

        fetchImages();
    }, []);

    return (
        <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
            {/* Section 1 */}
            <h1 className="text-3xl font-bold mb-6">Continuous patterns by 24 stitches</h1>
            <div className="my-8 flex flex-col items-center space-y-4">
                {imageUrls.slice(0, 7).map((url, index) => (
                    url ? <img key={index} src={url} alt={`Pattern ${index + 1}`} className="max-w-full h-auto" /> : <p key={index}>Loading image {index + 1}...</p>
                ))}
            </div>

            {/* Section 2 */}
            <h1 className="text-3xl font-bold mb-6">Single figures</h1>
            <div className="my-8 flex flex-col items-center space-y-4">
                {imageUrls.slice(7, 11).map((url, index) => (
                    url ? <img key={index + 7} src={url} alt={`Pattern ${index + 8}`} className="max-w-full h-auto" /> : <p key={index + 7}>Loading image {index + 8}...</p>
                ))}
            </div>

            {/* Section 3 */}
            <h1 className="text-3xl font-bold mb-6">Bands</h1>
            <div className="my-8 flex flex-col items-center space-y-4">
                {imageUrls.slice(11, 33).map((url, index) => (
                    url ? <img key={index + 11} src={url} alt={`Pattern ${index + 12}`} className="max-w-full h-auto" /> : <p key={index + 11}>Loading image {index + 12}...</p>
                ))}
            </div>

            {/* Section 4 */}
            <h1 className="text-3xl font-bold mb-6">Other continuous patterns</h1>
            <div className="my-8 flex flex-col items-center space-y-4">
                {imageUrls.slice(33, 35).map((url, index) => (
                    url ? <img key={index + 33} src={url} alt={`Pattern ${index + 34}`} className="max-w-full h-auto" /> : <p key={index + 33}>Loading image {index + 34}...</p>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <Link to="/Main/ProbKnit">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</button>
                </Link>
                <button onClick={handleLastPage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ExamplePattern;
