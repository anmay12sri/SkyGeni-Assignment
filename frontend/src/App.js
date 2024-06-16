import React, { useEffect, useState,useRef } from "react";
import Bar from "./Components/Graph-Bar";
import Doughnut from "./Components/Chart_2";
import Details from "./Components/Details";

const App = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);
  
  // useRef to track if data has been fetched to prevent multiple fetches
  const hasFetched = useRef(false);

  // Function to fetch data from the server based on dataType
  const fetchData = async (dataType) => {
    try {
      // Fetch data from the server using dynamic endpoint based on dataType
      const response = await fetch(`http://localhost:3001/api/customer`);
      
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the fetched data
      console.log(`FETCH_${dataType.toUpperCase()}`, data);

      // Set the fetched data to the state
      setData(data);

      // Return the fetched data
      return data;
    } catch (error) {
      // Log any errors during the fetch
      console.error(`Fetch failed for ${dataType}:`, error);
      // Throw the error to handle it outside this function
      throw error;
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    // Fetch data only if it hasn't been fetched before
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData('customer-type').catch((error) => {
        // Handle fetch error if needed
        console.error(error);
      });
    }
  }, []);

  return (
    <div className="justify-between p-20 h-screen w-full flex-col gap-20 flex items-center bg-gray-50">
      <h1 className="text-2xl font-semibold -mt-10">
        Won ACV mix by Cust Type
      </h1>
      <div className="flex">
        <div>
          {/* <h1>Bar Chart with D3.js and React</h1> */}
          {/* Bar chart component to display data */}
          <Bar data={data} />
        </div>
        <div>
          {/* Pie chart component to display data */}
          <Doughnut data={data} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1>CustomerType Details</h1>
        {/* Table details component to display data */}
        <Details data={data} />
      </div>
    </div>
  );
};

export default App;
