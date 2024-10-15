import React, { useState, useMemo, useRef } from 'react';
import { storage, db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddModule = () => {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);
  const [subtopics, setSubtopics] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [pdf, setPdf] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // Update this to useState correctly
  const quillRef = useRef(null);

  const handleFileChange = (e, setFile) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  // Custom image handler for ReactQuill to handle multiple images
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.setAttribute('multiple', 'multiple'); // Allow multiple file selection
  input.click();

  input.onchange = async () => {
    const files = Array.from(input.files); // Get multiple files
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    files.forEach(async (file) => {
      if (file) {
        const uploadedImageUrl = await uploadFile(file, 'Module');
        setImageUrl((prevState) => [...prevState, uploadedImageUrl]); // Store all image URLs

        // Insert the uploaded image URL into the editor
        editor.insertEmbed(range.index, 'image', uploadedImageUrl);
      }
    });
  };
};

const pdfHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'application/pdf'); // Accept only PDF files
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      const uploadedPdfUrl = await uploadFile(file, 'PDFs');
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      // Insert a link to the uploaded PDF in the content
      editor.insertText(range.index, file.name);
      editor.formatText(range.index, range.index + file.name.length, { link: uploadedPdfUrl });
    }
  };
};


  // Function to upload file to Firebase Storage and return the download URL
  const uploadFile = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const addSubtopic = async () => {
    let pdfUrl = '';
  
    if (pdf) {
      pdfUrl = await uploadFile(pdf, 'PDF');
    }
  
    // Ensure each subtopic has its own image URL
    if (topicName.trim() && paragraph.trim()) {
      const newSubtopic = {
        topicName,
        content: paragraph,
      };
  
      setSubtopics([...subtopics, newSubtopic]); // Add subtopic to the list
      setTopicName('');
      setParagraph('');
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
        progress: 0,
        subtopics: subtopics, 
      });

      alert('Content uploaded successfully!');
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Upload failed!');
    }

    setLoading(false);
  };

  // ReactQuill Editor with image handler memoized to prevent unnecessary re-renders
  const memoizedQuill = useMemo(() => (
    <ReactQuill
      ref={quillRef}
      value={paragraph}
      onChange={setParagraph}
      placeholder="Write your content here..."
      className="mb-4"
      modules={{
        toolbar: {
          container: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image','video'],
            [{ 'align': [] }],
            ['clean'],
          ],
          handlers: {
            link: pdfHandler,
            image: imageHandler,
          },
        },
      }}
    />
  ), []); 

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

      {/* Topic Name Field */}
      <input
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e.target.value)}
        placeholder="Topic Name"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />

      {/* ReactQuill Editor */}
      {memoizedQuill}

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
