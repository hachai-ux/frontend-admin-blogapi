import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';


const Homepage = (props) => {

    const [postList, setPostList] = useState([]);
    const [postUpdateSignal, setPostUpdateSignal] = useState(false);
    
    
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
        setPostUpdateSignal(false);
        
    }, [postUpdateSignal]);
    
    const handlePublishState = (post) => {

        let updatedPost;
        if (post.state === 'unpublished') {
            updatedPost = {
                title: post.title,
                text: post.text,
                state: 'published'
            };

        }
        else if (post.state === 'published') {
            updatedPost = {
                 title: post.title,
                text: post.text,
                state: 'unpublished'
            };
        }
       
        const dataJSON = JSON.stringify(updatedPost);

        fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${post._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: dataJSON
                        })
                            .then(response => response.json())
                            .then(result => {
                                console.log('Success:', result);
                                setPostUpdateSignal(true);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
    }
    
    
    const listItems = postList.map((post) =>{
        
        let stateText;
        if (post.state === 'unpublished') {
            stateText = 'publish';
        }
        else if (post.state === 'published') {
            stateText = 'unpublish';
        }
        
        return(
        
        <li key={nanoid()}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <p>{post.timestamp}</p>
            <p>{post.state}</p>
            <button onClick={(e)=>handlePublishState(post, e)}>{stateText}</button>
                </li>
            )
        }
  );
  


    return (
        <div className="homepage">
            <h1>Blog API Admin Area</h1>
            <Link to="/newpost">Create new post</Link>
            <ul>{listItems}</ul>
        </div>
        
    );
};

export default Homepage;