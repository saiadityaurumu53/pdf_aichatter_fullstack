'use client';
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {}

const FileUpload = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: {"application/pdf" : [".pdf"]},
      maxFiles:1,
      onDrop: async (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0]
        if (file.size > 10*1024*1024){
          //if the file is bigger than 10 MB then we won't upload the file to the s3 bucket
          alert('please upload a smaller file')
          return
        }
        //Now, the file is smaller than 10 MB so we need to handle the file
        try{
        const data = await uploadToS3(file);
        console.log("data", data);
        } catch (error){
          console.log(error);
        }

      },
      
    });
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({
            className: 'boarder-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })} >
            <input {...getInputProps() } />
            <>
              <Inbox className='w-10 h-10 text-blue-500' />
              <p className='mt-2 text-sm text-slate-400'>Drop PDF here</p>
            </>

        </div>
    </div>
  )
}

export default FileUpload