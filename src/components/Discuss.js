import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'; 
import AddTopic from './AddTopic'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Discuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filterOption, setFilterOption] = useState('All Discussions');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const db = getFirestore(Firebase);
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const searchTerm = localStorage.getItem("searchTerm")?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      const discussionsQuery = query(collection(db, 'Discussion'));
      const discussionsSnapShot = await getDocs(discussionsQuery);
      const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(discussionsData);

      // Filter discussions based on searchTerm
      filterDiscussions(discussionsData, filterOption, searchTerm);
    };
    fetchData();
  }, [db, filterOption, searchTerm]);

  const filterDiscussions = (data, filterOption, searchTerm) => {
    let filtered = data;

    // Apply searchTerm filtering
    if (searchTerm) {
      filtered = filtered.filter(discussion => 
        discussion.Title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply "My publish" filtering
    if (filterOption === "My Discussion") {
      filtered = filtered.filter(discussion => discussion.PubEmail === email); // Correct field: PubEmail
    }

    setFilteredDiscussions(filtered);
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'Discussion'), {
      Title: newTitle,
      Publisher: name,
      PubEmail: email, // Ensure PubEmail is correctly spelled here
      Description: newDescription
    });
    setShowModal(false); // Hide modal after submission
    setNewTitle(''); // Reset form fields
    setNewDescription('');
    toast.success("Topic added successfully!", {
      position: "top-center",
    });

    // Re-fetch discussions after adding a new topic
    const discussionsQuery = query(collection(db, 'Discussion'));
    const discussionsSnapShot = await getDocs(discussionsQuery);
    const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDiscussions(discussionsData);

    // Re-apply filtering after new topic addition
    filterDiscussions(discussionsData, filterOption, searchTerm);
  };

  const handleTitleClick = (discussionId) => {
    localStorage.setItem("titleID", discussionId);
    navigate('/Main/DiscussionPage');
  };

  const handleDeleteClick = (discussionId) => {
    setDiscussionToDelete(discussionId);
    setShowDeleteModal(true); // Show confirmation modal
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'Discussion', discussionToDelete));
    toast.success("Topic deleted successfully!", {
      position: "top-center",
    });

    // Re-fetch discussions after deletion
    const discussionsQuery = query(collection(db, 'Discussion'));
    const discussionsSnapShot = await getDocs(discussionsQuery);
    const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDiscussions(discussionsData);

    // Re-apply filtering after deletion
    filterDiscussions(discussionsData, filterOption, searchTerm);

    // Close modal
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-500 text-sm">
          Join the discussion about knitting techniques and materials.
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
          onClick={() => setShowModal(true)}
        >
          + Create a New Topic
        </button>
      </div>

      {/* Dropdown Filter */}
      <div className="mb-4">
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border-gray-300 rounded-lg p-2"
        >
          <option value="All Discussions">All Discussion</option>
          <option value="My Discussion">My Discussion</option>
        </select>
      </div>

      {/* Modal for Adding Topic */}
      <AddTopic
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleAddTopic={handleAddTopic}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
      />

      {/* Discussion Thread */}
      <div className="discussion-thread space-y-4" style={{ maxHeight: '450px', overflowY: 'auto', width: '100%', paddingRight: '10px', boxSizing: 'border-box' }}>
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((Discussion) => (
              <div 
                key={Discussion.id} 
                className="discussion flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer" 
                style={{ width: '100%', maxWidth: '100%' }} // Ensure discussion cards stay within the container
                onClick={() => handleTitleClick(Discussion.id)}
              >
                <div>
                  <h2 className="font-bold text-base">{Discussion.Title}</h2>
                  <p className="text-gray-500 text-sm">{Discussion.Description}</p>
                </div>
                
                {/* Delete button if the user is the publisher */}
                {Discussion.PubEmail === email && (
                  <button
                    className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(Discussion.id);
                    }}
                    style={{
                      fontSize: '1.2rem',
                      background: 'none',
                    }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No discussions available.</p>
          )}
      </div>


      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this discussion?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
