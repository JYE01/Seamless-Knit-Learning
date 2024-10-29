import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { getFirestore, collection, query, where, getDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Module = () => {
  const [modules, setModules] = useState([]);
  const [openModules, setOpenModules] = useState({}); 
  const [userProgress, setUserProgress] = useState({});
  const db = getFirestore(Firebase);
  const navigate = useNavigate();
  const email = localStorage.getItem("Email");

  useEffect(() => {
    const fetchModules = async () => {
      const moduleQuery = query(collection(db, 'Module'));
      const moduleSnapshot = await getDocs(moduleQuery);
      const moduleData = moduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setModules(moduleData);

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
    fetchModules();
  }, [db, email]);

  const toggleModule = (index) => {
    setOpenModules(prevState => ({
      ...prevState,
      [index]: !prevState[index] 
    }));
  };

  const handleTopicClick = (moduleId, topicKey) => {
    localStorage.setItem("topicKey", topicKey);
    localStorage.setItem("moduleId", moduleId);
    navigate('/Main/Dashboard/Content');
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg space-y-4 max-w-15xl mx-auto" style={{ maxHeight: 'calc(95vh - 100px)', overflowY: 'auto' }}>
      {modules.map((module, index) => {
        const progress = userProgress[module.name]?.progress || 0;
        const isCompleted = userProgress[module.name]?.completed || false;
        return (
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

            {/* Progress bar */}
            <div className="h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 bg-gray-700 rounded-full"
                style={{ width: `${progress}%` }} 
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Progress: {progress}%
            </p>
            {isCompleted && <p className="text-sm text-green-500 mt-2">Module Completed!</p>}

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
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No subtopics available</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Module;
