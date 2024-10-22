import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import "./Content.css";

const Content = () => {
  const [subtopicContent, setSubtopicContent] = useState(null);
  const db = getFirestore(Firebase);
  const [imageUrl, setImageUrl] = useState([]);
  const storage = getStorage(Firebase);
  const [topicKey, setTopicKey] = useState(parseInt(localStorage.getItem("topicKey"), 10)); 
  const [totalSubtopics, setTotalSubtopics] = useState(0);
  const [moduleId, setModuleId] = useState(localStorage.getItem("moduleId"));
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (moduleId && topicKey !== null) {
      const fetchContent = async () => {
        const moduleRef = doc(db, 'Module', moduleId);
        const moduleSnap = await getDoc(moduleRef);

        if (moduleSnap.exists()) {
          const moduleData = moduleSnap.data();
          const subtopic = moduleData.subtopics[topicKey];
          setSubtopicContent(subtopic);
          setTotalSubtopics(moduleData.subtopics.length);
        } else {
          console.log("No module found");
        }
      };

      fetchContent();
    }
  }, [db, topicKey, moduleId]);

  useEffect(() => {
    if (subtopicContent && subtopicContent.imageUrl && Array.isArray(subtopicContent.imageUrl)) {
      const fetchImages = async () => {
        try {
          const urls = await Promise.all(
            subtopicContent.imageUrl.map(async (imagePath) => {
              const storageRef = ref(storage, imagePath);
              const url = await getDownloadURL(storageRef);
              return url;
            })
          );
          setImageUrl(urls);
        } catch (error) {
          console.error("Cannot get images from Firebase storage", error);
        }
      };

      fetchImages();
    }
  }, [subtopicContent, storage]);

  const calculateProgress = (currentIndex, total) => {
    if (total <= 1) {
      return 0; 
    }
    return ((currentIndex + 1) / total) * 100; 
  };

  const updateProgressInFirebase = async (newProgress) => {
    if (moduleId) {
      const moduleRef = doc(db, 'Module', moduleId);
      try {
        await updateDoc(moduleRef, { progress: newProgress });
        setProgress(newProgress);
        console.log("Progress updated to:", newProgress);
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }
  };

  const handlePrev = () => {
    if (topicKey > 0) {
      const prevTopicKey = topicKey - 1;
      localStorage.setItem("topicKey", prevTopicKey);
      setTopicKey(prevTopicKey);
      setImageUrl([]);
      const newProgress = calculateProgress(prevTopicKey, totalSubtopics);
      updateProgressInFirebase(newProgress); 
    }
  };

  const handleNext = () => {
    if (topicKey < totalSubtopics - 1) {
      const nextTopicKey = topicKey + 1;
      localStorage.setItem("topicKey", nextTopicKey);
      setTopicKey(nextTopicKey);
      setImageUrl([]);
      const newProgress = calculateProgress(nextTopicKey, totalSubtopics);
      updateProgressInFirebase(newProgress); 
    }
  };

  const handleFinish = () => {
    updateProgressInFirebase(100);
    navigate('/Main/Dashboard');
  };

  if (!subtopicContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto overflow-y-auto" style={{ maxHeight: '90vh' }}>
      <h2 className="text-2xl font-semibold mb-4">{subtopicContent.topicName}</h2>
      <div className="content" dangerouslySetInnerHTML={{ __html: subtopicContent.content }}></div>

      {/* Display the progress */}
      <div className="progress-bar-container my-4">
        <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: '#4caf50', height: '8px' }}></div>
        <p className="text-gray-600 mt-2">Progress: {Math.round(progress)}%</p>
      </div>

      <div className="mt-8 flex justify-between">
        {topicKey > 0 && (
          <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-auto">
            Prev
          </button>
        )}
        {topicKey < totalSubtopics - 1 ? (
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto">
            Next
          </button>
        ) : (
          <button onClick={handleFinish} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto">
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Content;
