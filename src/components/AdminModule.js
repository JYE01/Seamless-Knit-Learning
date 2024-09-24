import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminModule = () => {
    const [modules, setModules] = useState([]);
    const [openModules, setOpenModules] = useState({}); // Track which modules are open
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
      localStorage.setItem("topicKey", topicKey);
      localStorage.setItem("moduleId", moduleId);
      navigate('/Admin/Dashboard/Content'); // Redirect to Content page
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg space-y-4 max-w-15xl mx-auto" style={{ maxHeight: 'calc(95vh - 100px)', overflowY: 'auto' }}> 
          {modules.map((module, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-3">{module.name}</h2>
                <button
                  onClick={() => toggleModule(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {openModules[index] ? 'Hide All' : 'Show All'}
                </button>
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
        </div>
    );
}

export default AdminModule;
