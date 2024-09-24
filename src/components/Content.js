import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage,ref, getDownloadURL } from "firebase/storage";

const Content = () => {
  const [subtopicContent, setSubtopicContent] = useState(null);
  const db = getFirestore(Firebase);
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage(Firebase);
  

  useEffect(() => {
    // Get topicKey and moduleId from localStorage
    const topicKey = localStorage.getItem("topicKey");
    const moduleId = localStorage.getItem("moduleId");

    if (moduleId && topicKey !== null) {
      const fetchContent = async () => {
        const moduleRef = doc(db, 'Module', moduleId);
        const moduleSnap = await getDoc(moduleRef);
        
        if (moduleSnap.exists()) {
          const moduleData = moduleSnap.data();
          const subtopic = moduleData.subtopics[topicKey]; // Retrieve the selected subtopic
          setSubtopicContent(subtopic);
        }
      };

      fetchContent();
    }
  }, [db]);

  useEffect(() => {
    if (subtopicContent && subtopicContent.imageUrl) {
      const fetchImage = async () => {
        try {
          const storageRef = ref(storage, subtopicContent.imageUrl);
          const url = await getDownloadURL(storageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("Cannot get image from Firebase storage", error);
        }
      };

      fetchImage();
    }
  }, [subtopicContent, storage]);

  if (!subtopicContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{subtopicContent.topicName}</h2>
      <div>{subtopicContent.content }</div>
      {subtopicContent.imageUrl && (
            <div className="my-8 flex justify-center">
                {imageUrl ? (
                <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
                ) : (
                <p>Loading image...</p>
                )}
            </div>
      )}
      {subtopicContent.pdfUrl && (
        <div className="mt-4">
          <a href={subtopicContent.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default Content;
