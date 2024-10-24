import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const VoteModal = ({ showVote, closeModal, vote, userEmail, db }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [result, setResult] = useState(null);

  if (!showVote || !vote) return null;

  const handleSubmitVote = async () => {
    if (!selectedOption) {
      toast.error("Please select an option.", { position: "top-center" });
      return;
    }

    // Fetch the vote data from Firestore
    const voteDoc = await getDoc(doc(db, 'Vote', vote.id));
    const voteData = voteDoc.data();

    // Check if the user has already voted
    if (voteData.voters && voteData.voters.includes(userEmail)) {
      toast.error("You have already voted.", { position: "top-center" });
      return;
    }

    // Update the vote document with the user's choice
    await updateDoc(doc(db, 'Vote', vote.id), {
      [`votes.${selectedOption}`]: arrayUnion(userEmail), // Record the vote
      voters: arrayUnion(userEmail), // Track who voted
    });

    toast.success("Your vote has been submitted!", { position: "top-center" });
    setShowResults(true);
    calculateResults(voteData); // Pass the updated vote data to calculate results
  };

  const calculateResults = (voteData) => {
    // Ensure the votes object exists and is an object
    if (!voteData.votes || typeof voteData.votes !== 'object') {
      console.error('Votes data is missing or not in the expected format');
      return;
    }
  
    // Calculate total votes per option
    const calculatedResult = Object.keys(voteData.votes).map(option => ({
      option, // the voting option (e.g., "y", "n")
      count: Array.isArray(voteData.votes[option]) ? voteData.votes[option].length : 0
    }));
  
    // Set the results data for display purposes
    setResult(calculatedResult); // Use setResult as a function to store the data
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!showResults ? (
          <>
            <h2 className="text-xl font-semibold mb-4">{vote.Title}</h2>
            <form onSubmit={handleSubmitVote}>
              {vote.Options.map((option, index) => (
                <div key={index} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name="voteOption"
                      value={option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitVote}
                  className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Vote Results</h2>
            <div className="space-y-2">
              {result && result.map((res, index) => (
                <div key={index} className="flex justify-between">
                  <span>{res.option}</span>
                  <span>{res.count} votes</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoteModal;
