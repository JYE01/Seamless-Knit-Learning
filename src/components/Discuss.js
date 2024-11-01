import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'; 
import AddTopic from './AddTopic'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import VoteModal from './VoteModal';

const Discuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]); 
  const [filteredVotes, setFilteredVotes] = useState([]); 
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [discussFilterOption, setDiscussFilterOption] = useState('All Discussions'); // For Discuss filtering
  const [voteFilterOption, setVoteFilterOption] = useState('All Vote'); // For Vote filtering
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const db = getFirestore(Firebase);
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const searchTerm = localStorage.getItem("searchTerm")?.toLowerCase() || '';
  const [activeTab, setActiveTab] = useState("Discuss"); // Default active tab
  const [selectedVote, setSelectedVote] = useState(null); 
  const [showVote, setShowVote] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const discussionsQuery = query(collection(db, 'Discussion'));
      const discussionsSnapShot = await getDocs(discussionsQuery);
      const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(discussionsData);

      // Apply the filter
      filterDiscussions(discussionsData, discussFilterOption, searchTerm);
    };
    fetchData();
  }, [db, discussFilterOption, searchTerm]);

  const fetchVotes = async () => {
    const votesQuery = query(collection(db, 'Vote'));
    const votesSnapShot = await getDocs(votesQuery);
    const votesData = votesSnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      hasVoted: doc.data().UserVotes && Object.values(doc.data().UserVotes).flat().includes(email),
    }));
    setVotes(votesData);
    setFilteredVotes(votesData);
  };
  
  useEffect(() => {
    filterDiscussions(discussions, discussFilterOption, searchTerm);
  }, [discussions, discussFilterOption, searchTerm]);

  useEffect(() => {
    fetchVotes();
  }, [db, email]);

  useEffect(() => {
    filterVotes(votes, voteFilterOption, searchTerm);
  }, [votes, voteFilterOption, searchTerm]);

  const filterDiscussions = (data, discussFilterOption, searchTerm) => {
    let filtered = data;

    // Apply searchTerm filtering
    if (searchTerm) {
      filtered = filtered.filter(discussion => 
        discussion.Title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply "My Discussions" filtering
    if (discussFilterOption === "My Discussion") {
      filtered = filtered.filter(discussion => discussion.PubEmail === email);
    }

    // Set the filtered discussions
    setFilteredDiscussions(filtered); // Corrected
  };

  const filterVotes = (data, voteFilterOption, searchTerm) => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(vote => 
        vote.Title.toLowerCase().includes(searchTerm)
      );
    }

    if (voteFilterOption === "Unvoted Votes") {
      filtered = filtered.filter(vote => !vote.hasVoted);
    } else if (voteFilterOption === "Voted Votes") {
      filtered = filtered.filter(vote => vote.hasVoted);
    }

    setFilteredVotes(filtered);
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'Discussion'), {
      Title: newTitle,
      Publisher: name,
      PubEmail: email,
      Description: newDescription
    });
    setShowTopicModal(false);
    setNewTitle('');
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
    filterDiscussions(discussionsData, discussFilterOption, searchTerm);
  };

  const handleTitleClick = (discussionId) => {
    localStorage.setItem("titleID", discussionId);
    navigate('/Main/DiscussionPage');
  };

  const handleVoteClick = (vote) => {
    setSelectedVote(vote);
    setShowVote(true);
  };

  const handleDeleteClick = (discussionId) => {
    setDiscussionToDelete(discussionId);
    setShowDeleteModal(true); 
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
    filterDiscussions(discussionsData, discussFilterOption, searchTerm);

    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ToastContainer />
      <div className="flex border-b border-gray-300 mb-4">
        <div
          className={`mr-6 pb-2 cursor-pointer ${
            activeTab === "Discuss" ? "border-b-2 border-blue-500 text-blue-600" : ""
          }`}
          onClick={() => setActiveTab("Discuss")}
        >
          Discuss
        </div>
        <div
          className={`mr-6 pb-2 cursor-pointer ${
            activeTab === "Vote" ? "border-b-2 border-blue-500 text-blue-600" : ""
          }`}
          onClick={() => setActiveTab("Vote")}
        >
          Vote
        </div>
      </div>

      {activeTab === "Discuss" && (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 text-sm">
              Join the discussion about knitting techniques and materials.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              onClick={() => setShowTopicModal(true)}
            >
              + Create a New Topic
            </button>
          </div>

          <div className="mb-4">
            <select
              value={discussFilterOption}
              onChange={(e) => setDiscussFilterOption(e.target.value)}
              className="border-gray-300 rounded-lg p-2"
            >
              <option value="All Discussions">All Discussions</option>
              <option value="My Discussion">My Discussions</option>
            </select>
          </div>

          <AddTopic
            showTopicModal={showTopicModal}
            closeModal={() => setShowTopicModal(false)}
            handleAddTopic={handleAddTopic}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
          />

          <div className="discussion-thread space-y-4" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="discussion flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer"
                  onClick={() => handleTitleClick(discussion.id)}
                >
                  <div>
                    <h2 className="font-bold text-base">{discussion.Title}</h2>
                    <p className="text-gray-500 text-sm">{discussion.Description}</p>
                  </div>

                  {discussion.PubEmail === email && (
                    <button
                      className="text-red-600 ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(discussion.id);
                      }}
                      style={{ fontSize: '1.2rem', background: 'none' }}
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
        </>
      )}

      {activeTab === "Vote" && (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 text-sm">
              Participate in the vote about knitting techniques and materials.
            </p>
          </div>

          <div className="mb-4">
            <select
              value={voteFilterOption}
              onChange={(e) => setVoteFilterOption(e.target.value)}
              className="border-gray-300 rounded-lg p-2"
            >
              <option value="All Votes">All Votes</option>
              <option value="Unvoted Votes">Unvoted Votes</option>
              <option value="Voted Votes">Voted Votes</option>
            </select>
          </div>

          <div className="vote-thread space-y-4" style={{ maxHeight: '50vh', overflowY: 'auto', width: '100%', paddingRight: '10px', boxSizing: 'border-box' }}>
            {filteredVotes.length > 0 ? (
              filteredVotes.map((vote) => (
                <div 
                  key={vote.id} 
                  className="vote flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer"
                  onClick={() => handleVoteClick(vote)}
                >
                  <div>
                    <h2 className="font-bold text-base">{vote.Title}</h2>
                    <p className="text-gray-500 text-sm">{vote.Description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No votes available.</p>
            )}
          </div>
        </>
      )}

      <VoteModal
        showVote={showVote}
        closeModal={() => setShowVote(false)}
        vote={selectedVote} 
        userEmail={email} 
        db={db} 
        onVoteSubmit={fetchVotes} // Callback to refresh votes on submit
      />

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
