import React, { useEffect, useState } from 'react'
import axios from "axios";
import './App.css';
import RedditVideo from './RedditVideo';
import Navbar from './components/Navbar'
import ReactPlayer from 'react-player'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  
  const [posts, setPosts] = useState([]);
  const [filterValue, setFilterValue] = useState(50);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  
  function filterPosts() {
    let highest = -100;
    let lowest = 100;
    
    for (let post of posts) {
      if (post[1] > highest) {
        highest = post[1];
      }
      else if (post[1] < lowest) {
        lowest = post[1];
      }
    }
    
    let difference = Math.abs(lowest - highest);
    let increment = difference / 100;
    let value = lowest + (increment * filterValue)

    setFilteredPosts([])
    for (let post of posts) {
      if (post[1] > (value - 0.25)) {
        setFilteredPosts(filteredPosts => [...filteredPosts, [post[0]]])
      }
    }
    console.log(highest)
    console.log(lowest)
    console.log(value)
  }


  useEffect(() => {
    filterPosts();
  }, [filterValue])

  function formatPosts(res) {
    setPosts([]);
    const data = res["data"]
    // Object.values(data[i])[0].score
    for (let i in data) {
      // console.log(data[i])
      // console.log(Object.keys(data[i]))
      // console.log(Object.values(data[i])[0].img)
      // console.log(Object.values(data[i])[0].positivity)
      setPosts(posts => [...posts, [(
        <div className="post-container">
          <div style={{ textAlign:"left"}}>
            r/{Object.values(data[i])[0].subreddit}
          </div>
          <div className="title" style={{ marginBottom: "0.5rem"}}>
            {Object.keys(data[i])[0]}
          </div>
          <div className="content">
            {Object.values(data[i])[0].img.indexOf("jpg") != -1? (
              <img style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }} src={Object.values(data[i])[0].img} />
            ) : Object.values(data[i])[0].img.indexOf("png") != -1? (
              <img style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }} src={Object.values(data[i])[0].img} />
            ) : (
            <ReactPlayer url={Object.values(data[i])[0].img.toString() + `/DASH_96.mp4`} playing={isPlaying} controls={true} />
            )}
            

            
            
            <p>{Object.values(data[i])[0].description}</p>
          </div>
        </div>
      ), Object.values(data[i])[0].positivity]
    ]);
      // console.log(posts)
    }
  }

  
  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res = response.data
      console.log(res)
      formatPosts(res)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
      <Navbar setFilterValue={setFilterValue} filterValue={filterValue}/>
      {filteredPosts}
    </div>
  );
}

export default App;