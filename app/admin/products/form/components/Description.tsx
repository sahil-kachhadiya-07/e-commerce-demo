'use client'
import { Editor } from '@tinymce/tinymce-react';

const Description = ({ data, handleData }) => {
  const handleChange = (content) => {
    handleData('description', content);
  };

  return (
    <Editor
    apiKey="o9byh6ur6wuvlo0n2vzajrv59h7nk26k9kqxd1h1h1mqxd5e"
    id="tiny-react_66992478021733655599592"
    value={data?.description || ''}
    init={{
      height: 300,
      menubar: false, // Disable the menubar for simplicity
      toolbar:
        'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat',
      plugins: 'lists', 
      content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
    }}
    onEditorChange={handleChange}
  />
  
  );
};

export default Description;

// 'use client'

// import React, { useMemo, useRef } from 'react'
// import dynamic from 'next/dynamic'
// import 'react-quill/dist/quill.snow.css'

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading ... </p> });

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ size: ['extra-small', 'small', 'medium', 'large'] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link'],
//       [{ color: [] }, { background: [] }],
//       ['clean']
//     ]
//   }
// }

// const Description = ({ data, handleData }) => {
//     const quillRef = useRef<any>();
//   const handleChange = value => {
//     handleData('description', value)
//   }
//   return (
//     <section className='flex flex-1 flex-col bg-white border p-4 rounded-xl'>
//       <h1 className='font-semibold'>Description</h1>
//       <ReactQuill
//         value={data?.description}
//         onChange={handleChange}
//         modules={modules}
//         placeholder='Enter your content here...'
//       />
//     </section>
//   )
// }

// export default Description
