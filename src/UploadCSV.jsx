import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function UploadCsv() {
   const [file, setFile] = useState(null);
   

   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
   };


   const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('csv', file);
      let url = 'http://localhost:8000/upload/';
      axios.post(url, formData,{
         headers: {
           'content-type': 'multipart/form-data',
         }
       })
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
   };

   return (
      <form onSubmit={handleSubmit}>
         <h1>Upload CSV</h1>
         <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
         <button type="submit">Upload</button>

      </form>
      
   );
}

export default UploadCsv;
