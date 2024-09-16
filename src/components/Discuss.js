import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, addDoc } from 'firebase/firestore'; 
import AddTopic from './AddTopic'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Discuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const db = getFirestore(Firebase);

  useEffect(() => {
    const fetchData = async () => {
      const discussionsQuery = query(collection(db, 'Discussion'));
      const discussionsSnapShot = await getDocs(discussionsQuery);
      const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions([...discussionsData]);
    };
    fetchData();
  }, [db]);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'Discussion'), {
      Title: newTitle,
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
    setDiscussions([...discussionsData]);
  };

  return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <ToastContainer />
        <div className="flex justify-between items-center mb-6">
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
        <div className="discussion-thread space-y-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {discussions.length > 0 ? (
            discussions.map((Discussion) => (
              <div key={Discussion.id} className="discussion bg-gray-100 p-4 rounded-lg">
                <h2 className="font-bold text-base">{Discussion.Title}</h2>
                <p className="text-gray-500 text-sm">{Discussion.Description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No discussions available.</p>
          )}
        </div>
      </div>
  );
};

export default Discuss;
