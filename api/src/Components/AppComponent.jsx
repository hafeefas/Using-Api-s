import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './appComp.css'
import Loader from './Loader'

const AppComponent = () => {
  const [gif, setGif] = useState([]);
//   the below is for searching
  const [input, setInput] = useState("");
// the below is for a loading screen:
    const [loading, setLoading] = useState(false)
    //the default for loading is when it's not loading anything 
    //which is why it's false
    //to make the spinner stop spinning, we need to set it to false somewhere
    //(put under setGid(results.data.data))
    const [error, setError] = useState(false)

  useEffect(() => {
    //useEffect is used when the component loads (the api key and website)
    const fetchGif = async () => {
        //here u may be waiting for everything to pop up, so put loading screen here
        setLoading(true);
        setError(false)

      try {
        // first, get trending links information,
        const result  = await axios.get('http://api.giphy.com/v1/gifs/trending', 
        {
          params: {
            api_key: 'Fb5Lhkj3yaMQJvkawOQbBCd0dVvlkueo'
            //the parameter is basically the ending of a link, here the ending of the link will be
            //our api key
          }
        });
        // after getting the links info, set it equal to setGif
        //we are setting it to these 3 because we want the data, abd the next data
        setGif(result.data.data);  
        //^this needs to be data.data!! im not sure why
        console.log(result);

        //we can make the loader stop loading here bcause all the functions to load
        //have been complete by now:
        setLoading(false)

      } catch (error) {
        setError(true)
        console.log(error);
        alert("error, please recheck your URL or search and try again.")
      }
    };

    fetchGif();
  }, []);
  //^without this empty dependency array, there will be an infinite loop
  //u want to place it here and not beforehand because otherwise there will still be an infinite loop
  //for example, if you put it uunder where u wrote params and api key


//   const handleInputChange = (e) => {
//     // Update the 'input' state with the new input value
//     inputValue(e.target.value);
//     // this will allow the user to write in the text area
//     // without it, the user cannot type in anything!!
//     // check the searchField component for allowing the user to type #bugSolved
//   }
    const renderGifs = () => {
        //18:18
    if(loading){ //if loading=true
        return <Loader/>
    } //if its false, then render all the gifs:
        return gif.map(looping => {
            return (
        //after i did this part the gifs started loading =)
                //we can do this because we use an ID and when u click data three times after
                //clicking inspect, there is an id there and i just used that
                <div key = {looping.id} className='gif'>
                    {/* got this link from doing insepect, console,
                    click data, then data again, then data again, 
                    then scroll down to where it says "fixed height", and
                    there is a URL there and we are basically putting that here */}
                    <img src = {looping.images.fixed_height.url}/>
                </div>
            )
        })
    }
//search button stuff:
    const inputChange = (event) => {
        setInput(event.target.value)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Sets the loading state to true, indicating that data is being fetched
        setError(false); //Sets the error state to false which indicates no errors at the moment
      
        try {
          const result = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
              api_key: 'Fb5Lhkj3yaMQJvkawOQbBCd0dVvlkueo',
              q: input //'q' is the query paramenter used to specify the search term
            }
          });
      
          setGif(result.data.data); //Updates the gif state with the fetched data
          setLoading(false); //Sets the loading state to false, indicating the data fetching is complete
        } catch (error) { 
          console.log(error);
          alert("error");
        }
      }

      return (
    <div >
        {/* this is for the search button: */}
            <div className='m-2'>
            <form style={{ width: '50%', margin: '0 auto' }} className="justify-content-center">
                    <input 
                    value = {input} 
                    type='text' 
                    placeholder='search...' 
                    className='form-control' 
                    onChange={inputChange}/>
                        <button type='submit' 
                        onClick={handleSubmit}
                        className='btn btn-primary mx-2 sm'
                        style = {{width: '50%', margin: '0 auto', marginTop:"5px"}}> Go </button>
                </form>
            </div>

        {/* first lets render the top parts */}
        <div className ='container gifs'> {renderGifs()} </div>
     <label>Enter value: </label>
    </div>
  );
};

export default AppComponent;
