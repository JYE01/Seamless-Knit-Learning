import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminModule = ({ removeMode }) => {
    const [modules, setModules] = useState([]);
    const [openModules, setOpenModules] = useState({}); // Track which modules are open
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null); // To hold the module ID for deletion
    const db = getFirestore(Firebase);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const moduleQuery = query(collection(db, 'Module'));
            const moduleSnapShot = await getDocs(moduleQuery);
            const moduleData = moduleSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setModules([...moduleData]);
        };
        fetchData();
    }, [db]);

    const toggleModule = (index) => {
        setOpenModules(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle the state of the clicked module
        }));
    };

    const handleTopicClick = (moduleId, topicKey) => {
      if (!removeMode) {
        localStorage.setItem("topicKey", topicKey);
        localStorage.setItem("moduleId", moduleId);
        navigate('/Admin/Dashboard/Content'); // Redirect to Content page
      }
    };

    // Show delete confirmation modal
    const handleDeleteClick = (modulId) => {
      setModuleToDelete(modulId);
      setShowDeleteModal(true); // Show the confirmation modal
  };

    // Delete quiz after confirmation
    const handleDeleteModule = async () => {
        try {
            await deleteDoc(doc(db, 'Module', moduleToDelete));
            setModules(modules.filter(module => module.id !== moduleToDelete)); // Update UI after deletion
            toast.success("Module deleted successfully!", {
                position: "top-center",
            });
            setShowDeleteModal(false); // Close the modal
        } catch (error) {
            console.error("Error deleting module: ", error);
            toast.error("Error deleting quiz!", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg space-y-4 max-w-15xl mx-auto" style={{ maxHeight: 'calc(95vh - 100px)', overflowY: 'auto' }}> 
          <ToastContainer />
          {modules.map((module, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-3">{module.name}</h2>
                {removeMode ? (
                      <button 
                        onClick={() => handleDeleteClick(module.id)} // Show delete confirmation
                        className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                        style={{
                            fontSize: '1.2rem',
                            background: 'none',
                          }}
                      >
                        🗑️
                      </button>
                    ) : ( 
                      <button
                        onClick={() => toggleModule(index)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        {openModules[index] ? 'Hide All' : 'Show All'}
                      </button>
                )}
              </div>
              <div className="h-3 bg-gray-300 rounded-full">
                <div
                  className="h-3 bg-gray-700 rounded-full"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Progress: {module.progress}%
              </p>

              {/* Conditionally render subtopics */}
              {openModules[index] && (
                  <div className="mt-4">
                    {module.subtopics && module.subtopics.length > 0 ? (
                      <ul className="space-y-2 pl-4">
                        {module.subtopics.map((subtopic, subIndex) => (
                          <li key={subIndex} className="text-gray-700 flex items-center"> {/* Flex for alignment */}
                            <i className="mr-2">📄</i>
                            <p
                              onClick={() => handleTopicClick(module.id, subIndex)}
                              className="cursor-pointer hover:text-blue-500 focus:text-blue-500 transition-colors duration-200"
                              tabIndex="0" // Makes it focusable for the "focus" styles to work
                            >
                              {subtopic.topicName}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No subtopics available</p>
                    )}
                  </div>
                )}
            </div>
          ))}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
                <div className="fixed z-10 inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this ?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                                onClick={() => setShowDeleteModal(false)} // Close the modal
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                                onClick={handleDeleteModule} // Confirm delete
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminModule;
