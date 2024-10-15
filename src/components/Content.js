import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import "./Content.css"

const Content = () => {
  const [subtopicContent, setSubtopicContent] = useState(null);
  const db = getFirestore(Firebase);
  const [imageUrl, setImageUrl] = useState([]); // Store multiple image URLs
  const storage = getStorage(Firebase);
  const [topicKey, setTopicKey] = useState(parseInt(localStorage.getItem("topicKey"), 10)); // Correct useState declaration
  const [totalSubtopics, setTotalSubtopics] = useState(0);

  useEffect(() => {
    const moduleId = localStorage.getItem("moduleId");

    if (moduleId && topicKey !== null) {
      const fetchContent = async () => {
        const moduleRef = doc(db, 'Module', moduleId);
        const moduleSnap = await getDoc(moduleRef);

        if (moduleSnap.exists()) {
          const moduleData = moduleSnap.data();
          const subtopic = moduleData.subtopics[topicKey];
          console.log("Subtopic content:", subtopic);
          setSubtopicContent(subtopic);
          setTotalSubtopics(moduleData.subtopics.length);
        } else {
          console.log("No module found");
        }
      };

      fetchContent();
    }
  }, [db, topicKey]); // Add topicKey as dependency to refetch when it changes

  useEffect(() => {
    if (subtopicContent && subtopicContent.imageUrl && Array.isArray(subtopicContent.imageUrl)) {
      const fetchImages = async () => {
        try {
          const urls = await Promise.all(
            subtopicContent.imageUrl.map(async (imagePath) => {
              console.log("Fetching image:", imagePath);
              const storageRef = ref(storage, imagePath);
              const url = await getDownloadURL(storageRef);
              console.log("Fetched image URL:", url);
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

  const handlePrev = () => {
    if (topicKey > 0) {
      const prevTopicKey = topicKey - 1;
      localStorage.setItem("topicKey", prevTopicKey); // Store in localStorage for refresh safety
      setTopicKey(prevTopicKey); // Update topicKey to move to the previous subtopic
      setImageUrl("");
    }
  };

  const handleNext = () => {
    if (topicKey < totalSubtopics - 1) {
      const nextTopicKey = topicKey + 1;
      localStorage.setItem("topicKey", nextTopicKey); // Store in localStorage for refresh safety
      setTopicKey(nextTopicKey); // Update topicKey to move to the next subtopic
      setImageUrl("");
    }
  };

  if (!subtopicContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto overflow-y-auto" style={{ maxHeight: '90vh' }}>
      <h2 className="text-2xl font-semibold mb-4">{subtopicContent.topicName}</h2>
      <div className="content"dangerouslySetInnerHTML={{ __html: subtopicContent.content }}></div> 
      
      <div className="mt-8 flex justify-between">
        {topicKey > 0 && (
          <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-auto">
            Prev
          </button>
        )}
        {topicKey < totalSubtopics - 1 && (
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Content;
