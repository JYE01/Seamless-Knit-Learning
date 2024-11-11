import React, { useState } from 'react';

const AddVote = ({ showVoteModal, closeModal, handleAddVote, newTitle, setNewTitle, newDescription, setNewDescription, voteOptions, setVoteOptions }) => {
  if (!showVoteModal) return null; // Don't render the modal if `showVoteModal` is false

  // Function to handle adding a new option field
  const addOptionField = () => {
    setVoteOptions([...voteOptions, '']);
  };

  // Function to handle removing an option field
  const removeOptionField = (index) => {
    const updatedOptions = voteOptions.filter((_, idx) => idx !== index);
    setVoteOptions(updatedOptions);
  };

  // Function to handle change in option inputs
  const handleOptionChange = (index, value) => {
    const updatedOptions = voteOptions.map((option, idx) => (idx === index ? value : option));
    setVoteOptions(updatedOptions);
  };

  const handleClose = () => {
    setNewTitle(''); // Reset title
    setNewDescription(''); // Reset description
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Create a New Vote</h2>
        <form onSubmit={handleAddVote}>
          <div className="mb-4">
            <label className="block text-gray-700">Vote Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Options</label>
            {voteOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                {voteOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOptionField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOptionField}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              + Add Option
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVote;