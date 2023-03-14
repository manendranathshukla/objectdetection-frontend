import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const SearchResults = () => {
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [results, setResults] = useState(null);

   const fetchResults = () => {

      if (startDate && endDate) {
         const formData = new FormData();
         formData.append('startDate', startDate);
         formData.append('endDate', endDate);
         axios
            .post(`http://localhost:8000/results/`,formData,{
               headers: {
                 'content-type': 'multipart/form-data',
               }
             })
            .then((response) => {
               console.log(response.data);
               setResults(response.data);
            })
            .catch((error) => {
               console.error(error);
            });
      }
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      fetchResults();
   };

   const renderResultsTable = () => {
      if (results) {
         return (
            <table className="table table-striped">
               <thead>
                  <tr >
                     <th>Image Name</th>
                     <th>Detections</th>
                     <th>Image</th>
                  </tr>
               </thead>
               <tbody>
                  {results.map((result) => (
                     <tr key={result.fields.image_name}>
                        <td>{result.fields.image_name}</td>
                        <td>{result.fields.objects_detected}</td>
                        <td>
                           
                           <img width={150} height={150} src={`${process.env.PUBLIC_URL}/Assets/${result.fields.image_name}`} alt="" />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         );
      } else {
         return null;
      }
   };

   return (
      <div >
         <form className="filter" onSubmit={handleSubmit}>
            <h1>Start Date</h1>
            <DatePicker
               id="start-date"
               selected={startDate}
               onChange={(date) => setStartDate(date)}
            />
            <h1>End Date</h1>
            <DatePicker
               id="end-date"
               selected={endDate}
               onChange={(date) => setEndDate(date)}
            />
            <button type="submit" disabled={!startDate || !endDate}>
               Fetch Data and Generate Report
            </button>
         </form>
         {renderResultsTable()}
      </div>
   );
};

export default SearchResults;
