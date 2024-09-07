import { useState, useEffect } from 'react';
import Firebase from './Firebase'; 
import {
  collection,
  query,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

const useModuleData = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(Firebase);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const moduleQuery = query(collection(db, 'Module'));
            const moduleSnapShot = await getDocs(moduleQuery);
            const moduleData = moduleSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            setModules([...moduleData]);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [db]);
      return { modules, loading, error };
};
export default useModuleData;