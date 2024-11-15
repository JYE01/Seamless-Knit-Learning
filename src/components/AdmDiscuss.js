import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'; 
import AddTopic from './AddTopic'; 
import AddVote from './AddVote';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import VoteModal from './VoteModal';

const AdmDiscuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]); 
  const [filteredVotes, setFilteredVotes] = useState([]); 
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [voteOptions, setVoteOptions] = useState(['']); 
  const [discussFilterOption, setDiscussFilterOption] = useState('All Discussions'); 
  const [voteFilterOption, setVoteFilterOption] = useState('All Votes'); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const db = getFirestore(Firebase);
  const navigate = useNavigate();
  const name = localStorage.getItem("Name");
  const email = localStorage.getItem("Email");
  const searchTerm = localStorage.getItem("searchTerm")?.toLowerCase() || '';
  const [activeTab, setActiveTab] = useState("Discuss"); 
  const [selectedVote, setSelectedVote] = useState(null); 
  const [showVote, setShowVote] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showVoteDeleteModal, setShowVoteDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const discussionsQuery = query(collection(db, 'Discussion'));
      const discussionsSnapShot = await getDocs(discussionsQuery);
      const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscussions(discussionsData);
      setFilteredDiscussions(discussionsData);
    };
    fetchDiscussions();
  }, [db]);

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
    fetchVotes();
  }, [db, email]);

  useEffect(() => {
    filterDiscussions(discussions, discussFilterOption, searchTerm);
  }, [discussions, discussFilterOption, searchTerm]);

  useEffect(() => {
    filterVotes(votes, voteFilterOption, searchTerm);
  }, [votes, voteFilterOption, searchTerm]);

  const filterDiscussions = (data, discussFilterOption, searchTerm) => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(discussion => 
        discussion.Title.toLowerCase().includes(searchTerm)
      );
    }

    if (discussFilterOption === "My Discussion") {
      filtered = filtered.filter(discussion => discussion.PubEmail === email);
    }

    setFilteredDiscussions(filtered);
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

    const discussionsQuery = query(collection(db, 'Discussion'));
    const discussionsSnapShot = await getDocs(discussionsQuery);
    const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDiscussions(discussionsData);
  };

  const handleAddVote = async (e) => {
    e.preventDefault();
  
    const filledOptions = voteOptions.filter(option => option.trim() !== '');
    if (filledOptions.length < 2) {
      toast.error("Please provide at least two options for the vote.", {
        position: "top-center",
      });
      return;
    }
  
    const optionsMap = filledOptions.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});
  
    await addDoc(collection(db, 'Vote'), {
      Title: newTitle,
      Description: newDescription,
      Options: optionsMap,
      UserVotes: {},
      createdAt: new Date()
    });
  
    setShowVoteModal(false);
    setNewTitle('');
    setNewDescription('');
    setVoteOptions(['']); 
    toast.success("Vote added successfully!", {
      position: "top-center",
    });
  
    fetchVotes();
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

  const handleVoteDeleteClick = (vote) => {
    setDiscussionToDelete(vote);
    setShowVoteDeleteModal(true); 
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'Discussion', discussionToDelete));
    toast.success("Topic deleted successfully!", {
      position: "top-center",
    });
    setShowDeleteModal(false); 
    const discussionsQuery = query(collection(db, 'Discussion'));
    const discussionsSnapShot = await getDocs(discussionsQuery);
    const discussionsData = discussionsSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDiscussions(discussionsData);
  };

  const handleVoteDelete = async () => {
    await deleteDoc(doc(db, 'Vote', discussionToDelete));
    toast.success("Vote deleted successfully!", {
      position: "top-center",
    });
    setShowVoteDeleteModal(false); 
    fetchVotes();
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
                  
                  {showTopicModal ? null : (
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
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
              onClick={() => setShowVoteModal(true)}
            >
              + Create a Vote
            </button>
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

                  {showVoteModal ? null : (
                    <button
                      className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoteDeleteClick(vote.id);
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
        onVoteSubmit={fetchVotes}
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

      {showVoteDeleteModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this vote?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setShowVoteDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                onClick={handleVoteDelete}
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
