import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, where, getDocs, getFirestore, doc, deleteDoc, updateDoc, getDoc,  deleteField  } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminModule = ({ removeMode }) => {
    const [modules, setModules] = useState([]);
    const [openModules, setOpenModules] = useState({}); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null); 
    const [userProgress, setUserProgress] = useState({});
    const [subtopicToDelete, setSubtopicToDelete] = useState({ moduleId: null, subIndex: null });
    const db = getFirestore(Firebase);
    const navigate = useNavigate();
    const email = localStorage.getItem("Email");
    const df = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0, // Display no decimals for whole numbers
        maximumFractionDigits: 2, // Allow up to 2 decimal places
      });

    useEffect(() => {
        const fetchData = async () => {
            const moduleQuery = query(collection(db, 'Module'));
            const moduleSnapShot = await getDocs(moduleQuery);
            const moduleData = moduleSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setModules([...moduleData]);

            const userQuery = query(collection(db, 'Users'), where('Email', '==', email));
            const userSnapShot = await getDocs(userQuery);

            if (userSnapShot.empty) {
                console.error("No user found with the provided email.");
                return;
            }

            const userDoc = userSnapShot.docs[0];
            const userData = userDoc.data();

            if (userData.progress) {
                setUserProgress(userData.progress);
                console.log(userProgress);  
            }
        };
        fetchData();
    }, [db]);

    const toggleModule = (index) => {
        setOpenModules(prevState => ({
            ...prevState,
            [index]: !prevState[index] 
        }));
    };

    const handleTopicClick = (moduleId, topicKey) => {
        if (!removeMode) {
            localStorage.setItem("topicKey", topicKey);
            localStorage.setItem("moduleId", moduleId);
            navigate('/Admin/Dashboard/Content'); 
        }
    };

    const handleDeleteClick = (moduleId, moduleName) => {
        setModuleToDelete({ id: moduleId, name: moduleName });
        setShowDeleteModal(true);
    };

    const handleDeleteSubTopic = (moduleId, subIndex) => {
        setSubtopicToDelete({ moduleId, subIndex });
        setShowDeleteModal(true); 
    };

    const handleDeleteModule = async () => {
        try {
            // Delete the module from the "Module" collection
            await deleteDoc(doc(db, "Module", moduleToDelete.id));
    
            // Remove the module from the local state
            setModules(modules.filter((module) => module.id !== moduleToDelete.id));
    
            // Delete the module field from each user's "progress"
            const usersCollection = collection(db, "Users");
            const userDocs = await getDocs(usersCollection);
    
            userDocs.forEach(async (userDoc) => {
                const userRef = doc(db, "Users", userDoc.id);
    
                // Use the module name to delete the specific progress field
                await updateDoc(userRef, {
                    [`progress.${moduleToDelete.name}`]: deleteField(),
                });
            });
    
            toast.success("Module deleted successfully!", {
                position: "top-center",
            });
    
            // Close the delete modal and reset the selected module to delete
            setShowDeleteModal(false);
            setModuleToDelete(null);
        } catch (error) {
            console.error("Error deleting module: ", error);
            toast.error("Error deleting module!", {
                position: "top-center",
            });
        }
    };

    const handleDeleteSubtopic = async () => {
        const { moduleId, subIndex } = subtopicToDelete;

        try {
            const moduleDocRef = doc(db, 'Module', moduleId);
            const moduleSnap = await getDoc(moduleDocRef);

            if (moduleSnap.exists()) {
                const moduleData = moduleSnap.data();
                const updatedSubtopics = moduleData.subtopics.filter((_, index) => index !== subIndex); 

                await updateDoc(moduleDocRef, { subtopics: updatedSubtopics });

                setModules(prevModules =>
                    prevModules.map(module =>
                        module.id === moduleId ? { ...module, subtopics: updatedSubtopics } : module
                    )
                );

                toast.success("Subtopic deleted successfully!", {
                    position: "top-center",
                });
                setShowDeleteModal(false); 
                setSubtopicToDelete({ moduleId: null, subIndex: null }); 
            }
        } catch (error) {
            console.error("Error deleting subtopic: ", error);
            toast.error("Error deleting subtopic!", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-7/8 w-full bg-white p-4 lg:p-6 shadow rounded-lg space-y-4 overflow-y-auto mx-auto" 
                style={{ maxHeight: 'calc(88vh - 100px)' }}> 
                <ToastContainer />
                {modules.map((module, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold mb-3">{module.name}</h2>
                            {removeMode ? (
                                <button 
                                    onClick={() => handleDeleteClick(module.id, module.name)} 
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
                                style={{ width: `${userProgress[module.name]?.progress || 0}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Progress: {df.format(userProgress[module.name]?.progress || 0)}%
                        </p>
                        {userProgress[module.name]?.completed && <p className="text-sm text-green-500 mt-2">Module Completed!</p>}

                        {/* Conditionally render subtopics */}
                        {openModules[index] && (
                            <div className="mt-4">
                                {module.subtopics && module.subtopics.length > 0 ? (
                                    <ul className="space-y-2 pl-4">
                                        {module.subtopics.map((subtopic, subIndex) => (
                                            <li key={subIndex} className="text-gray-700 flex items-center">
                                                <i className="mr-2">📄</i>
                                                <p
                                                    onClick={() => handleTopicClick(module.id, subIndex)}
                                                    className="cursor-pointer hover:text-blue-500 focus:text-blue-500 transition-colors duration-200"
                                                    tabIndex="0"
                                                >
                                                    {subtopic.topicName}
                                                </p>
                                                {removeMode ? (
                                                    <button 
                                                        onClick={() => handleDeleteSubTopic(module.id, subIndex)} 
                                                        className="text-red-600 transition-all ml-4 hover:scale-125 hover:text-red-800 transform duration-200"
                                                        style={{
                                                            fontSize: '1.2rem',
                                                            background: 'none',
                                                        }}
                                                    >
                                                        🗑️
                                                    </button>
                                                ) : (
                                                    <></>
                                                )}
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
                            <p>Are you sure you want to delete this {subtopicToDelete.moduleId ? "subtopic" : "module"}?</p>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    className="bg-gray-300 px-4 py-2 rounded-lg"
                                    onClick={() => setShowDeleteModal(false)} 
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                                    onClick={subtopicToDelete.moduleId ? handleDeleteSubtopic : handleDeleteModule} 
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminModule;
