import React, { useState } from 'react';
import { storage, db } from '../Firebase';
import { collection, query, getDocs, getFirestore, addDoc, deleteDoc, doc } from 'firebase/firestore'; 
import ReactQuill from 'react-quill'; // For text formatting
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS for text formatting

const AddModule = () => {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);
  const [subtopics, setSubtopics] = useState([]);
  const [topicName, setTopicName] = useState(''); // New field for topic name
  const [paragraph, setParagraph] = useState(''); // This will be added to subtopics as content
  const [image, setImage] = useState(null); // For each subtopic's image
  const [pdf, setPdf] = useState(null); // For each subtopic's PDF
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setFile) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const addSubtopic = async () => {
    let imageUrl = '';
    let pdfUrl = '';

    if (image) {
      const imageRef = storage.ref(`images/${image.name}`);
      await imageRef.put(image);
      imageUrl = await imageRef.getDownloadURL();
    }

    if (pdf) {
      const pdfRef = storage.ref(`pdfs/${pdf.name}`);
      await pdfRef.put(pdf);
      pdfUrl = await pdfRef.getDownloadURL();
    }

    // Add the subtopic with the topic name, paragraph (content), image, and PDF
    if (topicName.trim() && paragraph.trim()) {
      const newSubtopic = {
        topicName, // Store topic name
        content: paragraph, // Store paragraph as content
        imageUrl: imageUrl || '', // Only add image URL if it exists
        pdfUrl: pdfUrl || '', // Only add PDF URL if it exists
      };

      setSubtopics([...subtopics, newSubtopic]);
      setTopicName(''); // Clear topic name
      setParagraph(''); // Clear the paragraph after adding
      setImage(null); // Clear the image after adding
      setPdf(null); // Clear the PDF after adding
    } else {
      alert('Please fill in both the topic name and content!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload the entire module with all subtopics to Firestore
      await addDoc(collection(db, 'Module'), {
        name: name,
        progress: progress,
        subtopics: subtopics, 
      });

      alert('Content uploaded successfully!');
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Upload failed!');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg space-y-4 max-w-15xl mx-auto" style={{ maxHeight: 'calc(95vh - 100px)', overflowY: 'auto' }}>
      <h2 className="text-2xl font-semibold mb-4">Upload Learning Content</h2>
      
      {/* Name Field */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Module Name"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Progress Field */}
      <input
        type="number"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        placeholder="Progress"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Topic Name Field */}
      <input
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Topic Name"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* Paragraph Editor (which will be added as subtopic content) */}
      <ReactQuill
        value={paragraph}
        onChange={setParagraph}
        placeholder="Write your content here..."
        className="mb-4"
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
          ],
        }}
      />

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, setImage)}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* PDF Upload */}
      <div className="mb-4">
        <label className="block text-gray-700">Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, setPdf)}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Add Subtopic Button */}
      <button
        onClick={addSubtopic}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Add Subtopic
      </button>

      {/* Subtopics List */}
      <div className="mb-4">
        <label className="block text-gray-700">Subtopics</label>
        <ul className="list-disc list-inside">
          {subtopics.map((subtopic, index) => (
            <li key={index} className="text-gray-600">
              <div>Topic Name: {subtopic.topicName}</div>
              <div>Content: {subtopic.content}</div>
              {subtopic.imageUrl && <div>Image: <a href={subtopic.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a></div>}
              {subtopic.pdfUrl && <div>PDF: <a href={subtopic.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a></div>}
            </li>
          ))}
        </ul>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Uploading...' : 'Upload Content'}
      </button>
    </div>
  );
};

export default AddModule;
