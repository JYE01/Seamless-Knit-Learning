import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DiscussionPage = () => {
  const titleID = localStorage.getItem("titleID");
  const [replyText, setReplyText] = useState('');
  const [showReplyArea, setShowReplyArea] = useState(false);
  const [discussion, setDiscussion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [filterOption, setFilterOption] = useState('All replies');
  const [replyToDelete, setReplyToDelete] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const db = getFirestore(Firebase);
  const currentUserEmail = localStorage.getItem("Email");
  const currentUserName = localStorage.getItem("Name");

  useEffect(() => {
    const fetchDiscussionData = async () => {
      if (!titleID) {
        console.error("No titleID found in localStorage");
        return;
      }
      const discussionDoc = await getDoc(doc(db, 'Discussion', titleID));
      if (discussionDoc.exists()) {
        const data = discussionDoc.data();
        setDiscussion(data);
        if (data.Response) {
          setResponses(data.Response);
        }
      } else {
        console.error("No such document!");
      }
    };

    fetchDiscussionData();
  }, [db, titleID]);

  const handleReplyClick = () => {
    setShowReplyArea(true);
  };

  const handleCancelClick = () => {
    setShowReplyArea(false);
    setReplyText('');
  };

  const handleTextAreaChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleSubmitReply = async () => {
    if (replyText.trim() === '') {
      toast.error("Reply can't be empty!", {
        position: "top-center",
      });
      return;
    }
    const discussionRef = doc(db, 'Discussion', titleID);

    const newReply = {
      Email: currentUserEmail,
      Name: currentUserName,
      Reply: replyText
    };

    // Add the new reply to the Response array using arrayUnion
    await updateDoc(discussionRef, {
      Response: arrayUnion(newReply)
    });

    // Fetch the updated discussion data to reflect the new reply
    const discussionDoc = await getDoc(discussionRef);
    if (discussionDoc.exists()) {
      const updatedData = discussionDoc.data();
      setDiscussion(updatedData);
      if (updatedData.Response) {
        setResponses(updatedData.Response);
      }
    }

    // Clear the reply area and hide it after submission
    setReplyText('');
    setShowReplyArea(false);
  };

  const handleDeleteClick = (reply) => {
    setReplyToDelete(reply);
    setShowDeleteModal(true);
  };

  const handleDeleteReply = async () => {
    const discussionRef = doc(db, 'Discussion', titleID);

    // Remove the selected reply from the Response array using arrayRemove
    await updateDoc(discussionRef, {
      Response: arrayRemove(replyToDelete)
    });

    // Fetch the updated discussion data
    const discussionDoc = await getDoc(discussionRef);
    if (discussionDoc.exists()) {
      const updatedData = discussionDoc.data();
      setDiscussion(updatedData);
      if (updatedData.Response) {
        setResponses(updatedData.Response);
      }
    }

    setShowDeleteModal(false); // Hide confirmation modal
    toast.success("Reply deleted successfully!", {
      position: "top-center",
    });
  };

  const filteredResponses = responses.filter((response) => {
    if (filterOption === 'My replies') {
      return response.Email === currentUserEmail;
    }
    return true;
  });

  return (
    <div className="p-8 bg-gray-100 h-full overflow-y-auto">
      {discussion ? (
        <div>
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

          <div className="flex justify-end mt-4">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border-gray-300 rounded-lg p-2"
            >
              <option value="All replies">All replies</option>
              <option value="My replies">My replies</option>
            </select>
          </div>

          <div className="bg-white shadow-md rounded-lg mt-6">
            {filteredResponses.length > 0 ? (
              filteredResponses.map((response, index) => (
                <div key={index} className="flex items-center p-4 border-b border-gray-200">
                  <div className="rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {response.Name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4 flex-grow">
                    <p className="font-bold text-gray-800">{response.Name}</p>
                    <p className="text-gray-600">{response.Reply}</p>
                  </div>
                  {response.Email === currentUserEmail && (
                    <button
                      className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                      onClick={() => handleDeleteClick(response)}
                      style={{ fontSize: '1.2rem', background: 'none', alignSelf: 'center' }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-4">No responses yet.</p>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed z-10 inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this reply?</p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                    onClick={handleDeleteReply}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        <p>Loading discussion data...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default DiscussionPage;
