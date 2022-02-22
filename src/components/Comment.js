import { useState, useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from 'react-router-dom';

//single comment component
const Comment = (props) => {

    const editorTextRef = useRef(null);
    let params = useParams();
    let postid = params.postid;
    let navigate = useNavigate();

    const [editActive, setEditActive] = useState(false);
      const [commentText, setCommentText] = useState(props.comment.text);

    const editComment = (comment, e) => {

        setEditActive(true);
           
    };

    const deleteComment = (comment, e) => {

         fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${postid}/comments/${comment._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(response => response.json())
                            .then(result => {
                                
                                console.log('Success:', result);
                                props.removeComment(comment._id);

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

    };
    
    const updateComment = (comment, e) => {

          const data = {
           name: comment.name,
           text: editorTextRef.current.getContent().replace(/<\/?[^>]+(>|$)/g, "")

          }
        const dataJSON = JSON.stringify(data);
        
        fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${postid}/comments/${comment._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: dataJSON
                        })
                            .then(response => response.json())
                            .then(result => {
                                
                                console.log('Success:', result);
                                setCommentText(editorTextRef.current.getContent().replace(/<\/?[^>]+(>|$)/g, ""));
                                setEditActive(false);
                            

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

    };


    const StandardComment = (props) => {
        return (
            <>
                <h2>{props.comment.name}</h2>
                <p>{commentText}</p>
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
                  
                <Editor apiKey='rhl5vp4qavwbk8r93xd01a47m0aaqzkh4a4735w0pd87100r'
         onInit={(evt, editor) => editorTextRef.current = editor} 
         initialValue={`${commentText}`}
         init={{
           height: 100,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
             toolbar: false,
             statusbar: false,
             inline: true,
            auto_focus: true,
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
               
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