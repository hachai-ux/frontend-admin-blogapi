
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';


const Comment = (props) => {

     const [commentList, setCommentList] = useState([]);
 let params = useParams();
    let postid = params.postid;
    

    useEffect(() => {
        //get comments
         const getComments = () => {

            fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${postid}/comments`, { mode: 'cors' })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
            
                    setCommentList(response);
                
                })
                .catch(function (error) {
                    console.log(error);
                });
      
        
        };
        getComments();
    }, []);

    const editComment = (comment, e) => {

    };

     const deleteComment = (comment, e) => {

    };

    const listItems = commentList.map((comment) => {
        
     
        
        return (
        
            <li key={nanoid()}>
                <h2>{comment.name}</h2>
                <p>{comment.text}</p>
                <p>{comment.timestamp}</p>
                <button onClick={(e) => editComment(comment, e)}>Edit Comment</button>
                <button onClick={(e) => deleteComment(comment, e)}>Delete Comment</button>
        
            </li>
        )
    });
        

    return (
        <div className="comments">
            <h1>Manage Comments</h1>
            <div>{listItems}</div>
        </div>
        
    );
};

export default Comment;