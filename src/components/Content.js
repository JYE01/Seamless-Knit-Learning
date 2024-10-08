import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Content = () => {
  const [subtopicContent, setSubtopicContent] = useState(null);
  const db = getFirestore(Firebase);
  const [imageUrl, setImageUrl] = useState([]); // Store multiple image URLs
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
          console.log("Subtopic content:", subtopic); // Debugging: Check subtopic content
          setSubtopicContent(subtopic);
        } else {
          console.log("No module found");
        }
      };

      fetchContent();
    }
  }, [db]);

  useEffect(() => {
    if (subtopicContent && subtopicContent.imageUrl && Array.isArray(subtopicContent.imageUrl)) {
      const fetchImages = async () => {
        try {
          // Fetch URLs for each image
          const urls = await Promise.all(
            subtopicContent.imageUrl.map(async (imagePath) => {
              console.log("Fetching image:", imagePath); // Debugging: Check image path
              const storageRef = ref(storage, imagePath);
              const url = await getDownloadURL(storageRef);
              console.log("Fetched image URL:", url); // Debugging: Check fetched URL
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

  if (!subtopicContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{subtopicContent.topicName}</h2>
      <div>{subtopicContent.content}</div>

      {/* Display multiple images */}
      {imageUrl.length > 0 ? (
        <div className="my-8 flex justify-center flex-wrap">
          {imageUrl.map((url, index) => (
            <div key={index} className="p-2">
              <img src={url} alt="{`Firebase ${index}`}" className="max-w-full h-auto" />
            </div>
          ))}
        </div>
      ) : (
        <p>No images available.</p>
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
};

export default Content;
