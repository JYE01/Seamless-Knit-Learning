import { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const Module = () => {
    const [modules, setModules] = useState([]);
    const [openModules, setOpenModules] = useState({}); // Track which modules are open
    const db = getFirestore(Firebase);

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

    return (
        <div className="bg-white p-6 shadow rounded-lg space-y-4">
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
                {module.subtopics ? (
                  <ul className="space-y-2 pl-4">
                    {module.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex} className="text-gray-700">
                        <i className="mr-2">📄</i> {subtopic}
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

export default Module;
