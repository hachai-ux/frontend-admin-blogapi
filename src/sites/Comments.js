
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

//single comment component
const Comment = (props) => {

    const [editActive, setEditActive] = useState(false);

       const editComment = (comment, e) => {

           setEditActive(true);
           
    };

     const deleteComment = (comment, e) => {

     };
    
     const updateComment = (comment, e) => {

    };


    const StandardComment = (props) => {
            return (
                <>
                    <h2>{props.comment.name}</h2>
                    <p>{props.comment.text}</p>
                    <p>{props.comment.timestamp}</p>
                    <button onClick={(e) => editComment(props.comment, e)}>Edit Comment</button>
                    <button onClick={(e) => deleteComment(props.comment, e)}>Delete Comment</button>
                </>
            )
        }

        const EditableComment = (props) => {
            return (
                <>
                    <h2>{props.comment.name}</h2>
                    <p>{props.comment.text}</p>
                    <p>{props.comment.timestamp}</p>
                    <button onClick={(e) => updateComment(props.comment, e)}>Update Comment</button>
                </>
            )
        }
    
    
        
        let commentComponent;

        
    
        if (editActive === false) {
            commentComponent = <StandardComment comment={props.comment}/>;
        }
        else if (editActive === true) {
            commentComponent = <EditableComment comment={props.comment}/>;
        }
    
    return (
        commentComponent
    )
}

const Comments = (props) => {

    const [commentList, setCommentList] = useState([]);
    const [editActive, setEditActive] = useState({});
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

 


    const listItems = commentList.map((comment) => {
        
        return (
        
            <li key={nanoid()}>
            <Comment comment={comment}></Comment>
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