import React from "react";

const Courses = () => {
  return (
    <div className="container p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500 mb-4 text-sm"> {/* Reduced font size */}
          Available courses for learning knitting techniques.
        </p>
        <div className="course-list space-y-4">
          <div className="course bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-base"> {/* Reduced font size */}
              Foundation of Knitting
            </h2>
            <p className="text-gray-500 text-sm"> {/* Reduced font size */}
              Learn the basics of knitting from stitches to materials.
            </p>
          </div>
          <div className="course bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-base"> {/* Reduced font size */}
              Intermediate Knitting
            </h2>
            <p className="text-gray-500 text-sm"> {/* Reduced font size */}
              Improve your knitting skills with advanced techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
