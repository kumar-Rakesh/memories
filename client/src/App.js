import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import PostDetail from './components/PostDetail/PostDetail'
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' replace={true} />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/auth' exact element={(user ? <Navigate to="/posts" replace /> : <Auth />)} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
