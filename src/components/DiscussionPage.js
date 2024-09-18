import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DiscussionPage = () => {
  const titleID = localStorage.getItem("titleID"); // Get titleID from local storage
  const [replyText, setReplyText] = useState('');
  const [showReplyArea, setShowReplyArea] = useState(false);
  const [discussion, setDiscussion] = useState(null); // Discussion data
  const [responses, setResponses] = useState([]); // Responses data
  const db = getFirestore(Firebase); // Firestore instance
  const studentName = localStorage.getItem("studentName"); // Get the student name from localStorage

  useEffect(() => {
    const fetchData = async () => {
      if (!titleID) {
        console.error("No titleID found in localStorage");
        return;
      }
        // Fetch the specific document from Firestore using the document ID
        const discussionDoc = await getDoc(doc(db, 'Discussion', titleID));
        
        if (discussionDoc.exists()) {
          const data = discussionDoc.data();
          setDiscussion(data); // Set discussion data
          // Extract responses from the map field
          if (data.Response) {
            const responsesArray = Object.entries(data.Response); // Convert map to array of [name, response]
            setResponses(responsesArray); // Set responses data
          }
        } else {
          console.error("No such document!");
        }
    };
    fetchData();
  }, [db, titleID]);

  const handleReplyClick = () => {
    setShowReplyArea(true); // Show the reply textarea when "Reply" is clicked
  };

  const handleCancelClick = () => {
    setShowReplyArea(false);
    setReplyText(''); // Clear the text when canceling
  };

  const handleTextAreaChange = (e) => {
    setReplyText(e.target.value);
  };

  // Function to submit the response and store it in Firestore
  const handleSubmitReply = async () => {
    if (replyText.trim() === '') {
      toast.error("Reply can't be empty!", {
        position: "top-center",
      });
      return;
    }

    try {
      // Get the document reference
      const discussionRef = doc(db, 'Discussion', titleID);

      // Update the document by adding the response to the "Response" map
      await updateDoc(discussionRef, {
        [`Response.${studentName}`]: replyText // Use the student's name as the key, and the replyText as the value
      });

      // Re-fetch the updated data after submission
      const discussionDoc = await getDoc(discussionRef);
      if (discussionDoc.exists()) {
        const updatedData = discussionDoc.data();
        setDiscussion(updatedData);

        // Update the responses after submission
        if (updatedData.Response) {
          const updatedResponsesArray = Object.entries(updatedData.Response);
          setResponses(updatedResponsesArray);
        }
      }

      // Clear the reply input and hide the reply area
      setReplyText('');
      setShowReplyArea(false);

    } catch (error) {
      console.error('Error adding response: ', error);
      toast.error("Error submitting your reply. Please try again.", {
        position: "top-center",
      });
    }
  };

  // Function to generate profile image with the first letter of the name
  const generateProfilePicture = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Check if discussion data exists */}
      {discussion ? (
        <div>
          {/* Main discussion area */}
          <div className={`bg-white p-6 shadow-md ${showReplyArea ? 'rounded-t' : 'rounded'} mb-0`}>
            <h2 className="text-xl font-bold mb-2">{discussion.Title}</h2>
            <p className="text-gray-600">Published by {discussion.Publisher}</p>
            <p className="text-gray-800 mt-4">{discussion.Description}</p>

            {!showReplyArea && (
              <button 
                onClick={handleReplyClick} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Reply
              </button>
            )}
          </div>

          {/* Reply area connected to the main card */}
          {showReplyArea && (
            <div className="bg-white p-6 shadow-md border-t-0 rounded-b">
              <textarea
                value={replyText}
                onChange={handleTextAreaChange}
                className="w-full p-4 border border-gray-300 rounded-b h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your reply here..."
              />
              <div className="mt-4 flex">
                <button
                  onClick={handleSubmitReply}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Submit Reply
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* User Responses */}
          <div className="bg-white shadow-md rounded-lg mt-6">
            {responses.length > 0 ? (
              responses.map(([name, content], index) => (
                <div key={index} className="flex items-start p-4 border-b border-gray-200">
                  {/* Profile Picture */}
                  {generateProfilePicture(name)}

                  {/* Response Content */}
                  <div className="ml-4">
                    <p className="font-bold text-gray-800">{name}</p>
                    <p className="text-gray-600">{content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-4">No responses yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading discussion data...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default DiscussionPage;
