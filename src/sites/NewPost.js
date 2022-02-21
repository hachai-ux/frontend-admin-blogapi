import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

const NewPost = (props) => {

    const editorTitleRef = useRef(null);
    const editorTextRef = useRef(null);
     let navigate = useNavigate();
    
   const postToServer = () => {
     if (editorTitleRef.current) {
       console.log(editorTitleRef.current.getContent());
     }
    if (editorTextRef.current) {
       console.log(editorTextRef.current.getContent());
    }
       
       const data = {
           title: editorTitleRef.current.getContent().replace(/<\/?[^>]+(>|$)/g, ""),
           text: editorTextRef.current.getContent().replace(/<\/?[^>]+(>|$)/g, "")

       }

       const dataJSON = JSON.stringify(data);

       fetch(`https://calm-wave-71314.herokuapp.com/api/posts`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: dataJSON
                        })
                            .then(response => response.json())
                            .then(result => {
                                
                                console.log('Success:', result);
                                navigate('/');

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
   };
  


    return (
        <div className="new-post">
            <h1>Create a new post</h1>
            <>
                <Editor apiKey='rhl5vp4qavwbk8r93xd01a47m0aaqzkh4a4735w0pd87100r'
         onInit={(evt, editor) => editorTitleRef.current = editor} 
         initialValue="<p>Title</p>"
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
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <Editor apiKey='rhl5vp4qavwbk8r93xd01a47m0aaqzkh4a4735w0pd87100r'
         onInit={(evt, editor) => editorTextRef.current = editor}
         initialValue="<p>Text</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
             toolbar: false,
            statusbar: false,
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <button onClick={postToServer}>Post to server</button>
     </>
        </div>
        
    );
};

export default NewPost;