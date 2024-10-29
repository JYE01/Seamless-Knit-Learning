import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doc, updateDoc, getDoc, arrayUnion, increment } from 'firebase/firestore';

const VoteModal = ({ showVote, closeModal, vote, userEmail, db, onVoteSubmit}) => {
  const [pollOptions, setPollOptions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vote) {
      setLoading(true);
      setPollOptions([]);
      setTotalVotes(0);
      setHasVoted(false);
      setSelectedOption('');

      fetchVoteData();
    }
  }, [vote]);

  const fetchVoteData = async () => {
    const voteDoc = await getDoc(doc(db, 'Vote', vote.id));
    if (voteDoc.exists()) {
      const voteData = voteDoc.data();

      // Get options and vote counts
      const formattedOptions = Object.keys(voteData.Options || {}).map(option => ({
        label: option,
        votes: voteData.Options[option] || 0
      }));
      setPollOptions(formattedOptions);

      // Calculate total votes
      const totalVotes = formattedOptions.reduce((acc, option) => acc + option.votes, 0);
      setTotalVotes(totalVotes);

      // Check if user has voted by searching UserVotes arrays
      const userVoteOption = Object.keys(voteData.UserVotes || {}).find(option => {
        // Ensure UserVotes[option] is treated as an array
        const userVotesForOption = Array.isArray(voteData.UserVotes[option]) ? voteData.UserVotes[option] : [];
        return userVotesForOption.includes(userEmail);
      });

      if (userVoteOption) {
        setSelectedOption(userVoteOption);
        setHasVoted(true);
      } else {
        setHasVoted(false);
      }
    }
    setLoading(false);
  };

  const handleVote = async (optionLabel) => {
    if (hasVoted) {
      toast.error("You have already voted.", { position: "top-center" });
      return;
    }

    setSelectedOption(optionLabel);

    // Update the selected option count and add user's email to the selected option in UserVotes
    await updateDoc(doc(db, 'Vote', vote.id), {
      [`Options.${optionLabel}`]: increment(1),
      [`UserVotes.${optionLabel}`]: arrayUnion(userEmail)
    });

    setHasVoted(true);
    toast.success("Your vote has been submitted!", { position: "top-center" });

    // Re-fetch the data to update the poll results
    fetchVoteData();

    // Call the onVoteSubmit callback to refresh votes in the parent component
    if (onVoteSubmit) {
      onVoteSubmit();
    }
  };

  const calculatePercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  if (!showVote || !vote) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{vote.Title}</h2>
        <p className="text-gray-800 mt-4">{vote.Description}</p>

        {loading ? (
          <div className="flex justify-center items-center">
            <span>Loading...</span>
          </div>
        ) : (
          pollOptions.map(option => {
            const percentage = calculatePercentage(option.votes);
            const isSelected = selectedOption === option.label;

            return (
              <div
                key={option.label}
                className="relative my-2 p-3 border rounded-lg flex items-center cursor-pointer"
                onClick={() => !hasVoted && handleVote(option.label)}
                style={{
                  backgroundColor: isSelected ? '#d1e7ff' : '#f3f4f6',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                {/* Background fill based on vote percentage */}
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundColor: '#a3a0f1',
                    width: `${percentage}%`,
                    zIndex: -1,
                  }}
                />
                <div className="flex justify-between items-center w-full relative z-10">
                  <span className="font-semibold text-gray-700">
                    {option.label} {isSelected && '✓'}
                  </span>
                  {hasVoted && (
                    <span className="text-gray-500">
                      {percentage}% ({option.votes} votes)
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}

        <div className="text-center mt-4 text-gray-500">
          {totalVotes} votes
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
      </div>
    </div>
  );
};

export default VoteModal;
