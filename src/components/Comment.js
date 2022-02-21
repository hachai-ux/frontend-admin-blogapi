import { useState } from 'react';

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
        commentComponent = <StandardComment comment={props.comment} />;
    }
    else if (editActive === true) {
        commentComponent = <EditableComment comment={props.comment} />;
    }
    
    return (
        <div>
            {commentComponent}
        </div>
    )
};
export default Comment;