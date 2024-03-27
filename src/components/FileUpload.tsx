'use client';
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';
import toast from 'react-hot-toast';


type Props = {}

const FileUpload = () => {

    const {mutate} = useMutation({
      mutationFn: async ({file_key, file_name} : {
        file_key: string;
        file_name: string;
      }) => {
          const response = await axios.post("/api/create-chat", {
            file_key, 
            file_name
          });
          return response.data;
      },
    })
  };


    const { getRootProps, getInputProps } = useDropzone({
      accept: {"application/pdf" : [".pdf"]},
      maxFiles:1,
      onDrop: async (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0]
        if (file.size > 10*1024*1024){
          //if the file is bigger than 10 MB then we won't upload the file to the s3 bucket
          toast.error("File too large");
          alert('please upload a smaller file');
          return;
        }
        //Now, the file is smaller than 10 MB so we need to handle the file
        try{
        const data = await uploadToS3(file);
        console.log("data", data);

        if (!data?.file_key || !data.file_name){
          alert("something went wrong");
          return;
        }
        // mutate(data, {
        //   onSuccess: () => {
        //     console.log(data);
        //   },
        //   onError: (err) => {
        //     console.log(err);
        //   }
        //})
        //now this data with the file key and the file name after uploading to the aws s3, it will hit the backend endpoint with the same

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