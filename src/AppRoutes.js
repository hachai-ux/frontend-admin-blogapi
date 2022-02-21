import { BrowserRouter, Routes, Route, Redirect, useLocation, useHistory} from "react-router-dom";
import Homepage from "./sites/Homepage";
import Post from "./sites/Post";
import NewPost from "./sites/NewPost";


const AppRoutes = (props) => {

  

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                            <Route exact path="/" element={<Homepage />}>
                            </Route>
                            <Route exact path="/newpost" element={<NewPost />}>
                                                        </Route>
                            <Route exact path="/posts/:postid" element={<Post />}>
                            </Route>
                </Routes>
            </BrowserRouter>
                </div>
    )
}

export default AppRoutes;