
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Comment from '../components/Comment';

const Comments = (props) => {

    const [commentList, setCommentList] = useState([]);
    let params = useParams();
    let postid = params.postid;

    console.log(commentList);
    
    const removeComment = (commentid) => {
        setCommentList(commentList.filter(comment => comment._id !== commentid))
    }

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

 


    const listItems = commentList.map((comment) => {
        
        return (
        
            <li key={nanoid()}>
            <Comment comment={comment} removeComment={removeComment}></Comment>
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




export default Comments;