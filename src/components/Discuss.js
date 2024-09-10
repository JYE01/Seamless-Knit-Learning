import React from 'react'

const Discuss = () => {
  return (
    <div className="container p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500 mb-4 text-sm"> {/* Reduced font size */}
          Join the discussion about knitting techniques and materials.
        </p>
        <div className="discussion-thread space-y-4">
          <div className="discussion bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-base"> {/* Reduced font size */}
              Best yarn for beginners?
            </h2>
            <p className="text-gray-500 text-sm"> {/* Reduced font size */}
              What type of yarn should I start with as a beginner?
            </p>
          </div>
          <div className="discussion bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-base"> {/* Reduced font size */}
              How to fix knitting mistakes?
            </h2>
            <p className="text-gray-500 text-sm"> {/* Reduced font size */}
              What are the best ways to fix common mistakes while knitting?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discuss