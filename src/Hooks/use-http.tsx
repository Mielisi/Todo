import { useCallback, useState } from "react";

/*
This custom hook is used to fetch data from the DB with rest apis and JSON
this hook take a configuration object (Not needed if you want to make a 
get request) and a function to transform the data from an object of object to 
something else that you'll need in your application
*/

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  Creating the send request function with useCallback hook to prevent usless re-evaluations
  This function to take 2 parameters, the request config, this is an object that contain 3 fileds:
  - Method, this can be GET, POST, DELETE etc
  - Headers
  - And the request body
  theres are used in the fetch request 

  The default configuration is for a get request.

  The second paramether is a function tha is used to transform the data
  */
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    console.log("from use http: \n url:", requestConfig)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Richiesta Fallita!");
      }
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Qualcosa e' andato storto!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
