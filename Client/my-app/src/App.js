import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import Post from './components/Post';


function App() {
  return (
    <div className="App">
      <>
      <div className='navbar'>
          <div className='logo'>
            MY Blog
          </div>
          <button className='btn'>
            <a href='/posts/new'>New Post</a>
          </button>
      </div>
        < BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/posts/:id' element={<Post/>}/>
            <Route path='/posts/new' element={<CreatePost/>}/>
            <Route path='/posts/edit/:id' element={<EditPost/>}/> 
          </Routes>  
       </BrowserRouter>
      </>
      
    </div>
  );
}

export default App;
