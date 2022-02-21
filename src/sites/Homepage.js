import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'


const Homepage = (props) => {

    const [postList, setPostList] = useState([]);
    
    useEffect(() => {
        const getPosts = () => {

        fetch('https://calm-wave-71314.herokuapp.com/api/posts', { mode: 'cors' })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
            
            
                setPostList(response);
                
            })
            .catch(function (error) {
                console.log(error);
            });
      
        
        };
        getPosts();
        
    },[])
    
   
    
    const listItems = postList.map((post) =>
        <li key={nanoid()}>
      {post.title}
    </li>
  );
  


    return (
        <div className="homepage">
            <ul>{listItems}</ul>
        </div>
        
    );
};

export default Homepage;