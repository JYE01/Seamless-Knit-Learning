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
    console.log(modules);

    return (
        <div className="bg-white p-6 shadow rounded-lg">
        {modules.map((module, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-3">{module.name}</h2>
            <div className="h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 bg-gray-700 rounded-full"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Progress: {module.progress}%
            </p>
            <br></br>
          </div>
        ))}
        </div>
    )
}

export default Module