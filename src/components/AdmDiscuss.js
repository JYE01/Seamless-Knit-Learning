import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'; 
import AddTopic from './AddTopic'; 
import AddVote from './AddVote';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import VoteModal from './VoteModal'; // Import the VoteModal component

const AdmDiscuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]); // For filtered discussions
  const [filteredVotes, setFilteredVotes] = useState([]); // For filtered votes
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [voteOptions, setVoteOptions] = useState(['']); // Initialize with one empty option
  const [discussFilterOption, setDiscussFilterOption] = useState('All Discussions'); // For Discuss filtering
  const [voteFilterOption, setVoteFilterOption] = useState('All Votes'); // For Vote filtering
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const db = getFirestore(Firebase);
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const searchTerm = localStorage.getItem("searchTerm")?.toLowerCase() || '';
  const [activeTab, setActiveTab] = useState("Discuss"); // Default active tab
  const [selectedVote, setSelectedVote] = useState(null); // Track selected vote
  const [showVote, setShowVote] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const discussionsQuery = query(collection(db, 'Discussion'));
      const discussionsSnapShot = await getDocs(discussionsQuery);
      const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(discussionsData);

      // Initially set all discussions as filtered
      setFilteredDiscussions(discussionsData);
    };
    fetchDiscussions();
  }, [db]);

  useEffect(() => {
    const fetchVotes = async () => {
      const votesQuery = query(collection(db, 'Vote'));
      const votesSnapShot = await getDocs(votesQuery);
      const votesData = votesSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVotes(votesData);

      // Initially set all votes as filtered
      setFilteredVotes(votesData);
    };
    fetchVotes();
  }, [db]);

  // Apply filtering whenever the relevant states change
  useEffect(() => {
    filterDiscussions(discussions, discussFilterOption, searchTerm);
  }, [discussions, discussFilterOption, searchTerm]);

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
    setFilteredDiscussions(filtered);
  };

  const filterVotes = (data, voteFilterOption, searchTerm) => {
    let filtered = data;

    // Apply searchTerm filtering
    if (searchTerm) {
      filtered = filtered.filter(vote => 
        vote.Title.toLowerCase().includes(searchTerm)
      );
    }

    // Apply "Active Votes" filtering (assuming 'active' status is stored in vote data)
    if (voteFilterOption === "Active Votes") {
      filtered = filtered.filter(vote => vote.isActive); // Ensure 'isActive' field exists in Vote documents
    }

    // Set the filtered votes
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
  };

  const handleAddVote = async (e) => {
    e.preventDefault();

    // Validate that all options are filled
    const filledOptions = voteOptions.filter(option => option.trim() !== '');
    if (filledOptions.length < 2) {
      toast.error("Please provide at least two options for the vote.", {
        position: "top-center",
      });
      return;
    }

    await addDoc(collection(db, 'Vote'), {
      Title: newTitle,
      Description: newDescription,
      Options: filledOptions, // Store options as an array
      isActive: true, // Example field to manage active votes
      createdAt: new Date()
    });
    setShowVoteModal(false);
    setNewTitle('');
    setNewDescription('');
    setVoteOptions(['']); // Reset options to one empty field
    toast.success("Vote added successfully!", {
      position: "top-center",
    });

    // Re-fetch votes after adding a new vote
    const votesQuery = query(collection(db, 'Vote'));
    const votesSnapShot = await getDocs(votesQuery);
    const votesData = votesSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVotes(votesData);
  };

  const handleVoteClick = (vote) => {
    setSelectedVote(vote);
    setShowVote(true);
  };

  const handleTitleClick = (discussionId) => {
    localStorage.setItem("titleID", discussionId);
    navigate('/Admin/DiscussionPage');
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
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ToastContainer />
      {/* Tabs */}
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
          {/* Header Section with Discussion Info and Create Button */}
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

          {/* Dropdown Filter */}
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

          {/* Modal for Adding Topic */}
          <AddTopic
            showTopicModal={showTopicModal}
            closeModal={() => setShowTopicModal(false)}
            handleAddTopic={handleAddTopic}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
          />

          {/* Discussion Thread */}
          <div className="discussion-thread space-y-4" style={{ maxHeight: '50vh', overflowY: 'auto', width: '100%', paddingRight: '10px', boxSizing: 'border-box' }}>
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <div 
                  key={discussion.id} 
                  className="discussion flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer" 
                  style={{ width: '100%', maxWidth: '100%' }}
                  onClick={() => handleTitleClick(discussion.id)}
                >
                  <div>
                    <h2 className="font-bold text-base">{discussion.Title}</h2>
                    <p className="text-gray-500 text-sm">{discussion.Description}</p>
                  </div>
                  
                  <button
                    className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(discussion.id);
                    }}
                    style={{
                      fontSize: '1.2rem',
                      background: 'none',
                    }}
                  >
                    🗑️
                  </button>
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
          {/* Header Section with Vote Info and Create Button */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 text-sm">
              Participate in the vote about knitting techniques and materials.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              onClick={() => setShowVoteModal(true)}
            >
              + Create a Vote
            </button>
          </div>

          {/* Dropdown Filter */}
          <div className="mb-4">
            <select
              value={voteFilterOption}
              onChange={(e) => setVoteFilterOption(e.target.value)}
              className="border-gray-300 rounded-lg p-2"
            >
              <option value="All Votes">All Votes</option>
              <option value="Active Votes">Active Votes</option>
            </select>
          </div>

          {/* Modal for Adding Vote */}
          <AddVote
            showVoteModal={showVoteModal}
            closeModal={() => setShowVoteModal(false)}
            handleAddVote={handleAddVote}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            voteOptions={voteOptions}
            setVoteOptions={setVoteOptions}
          />

          {/* Vote Thread */}
          <div className="vote-thread space-y-4">
            {filteredVotes.length > 0 ? (
              filteredVotes.map((vote) => (
                <div 
                  key={vote.id} 
                  className="vote flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer"
                  onClick={() => handleVoteClick(vote)} // Pass the vote to modal
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

      {/* Vote Modal */}
      <VoteModal
        showVote={showVote}
        closeModal={() => setShowVote(false)}
        vote={selectedVote} // Pass the selected vote
        userEmail={email} // Pass the current user's email
        db={db} // Pass the Firestore database instance
      />

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

export default AdmDiscuss;
