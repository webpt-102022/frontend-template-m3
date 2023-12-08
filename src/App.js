import './App.css';
import { Routes, Route } from 'react-router-dom';
/*import { Toaster } from 'react-hot-toast'; */
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';


import EditKnowledge from './views/knowledges/EditKnowledge';
import KnowledgeDetail from './views/knowledges/KnowledgeDetail'
import Footer from './components/Footer';

import EditUser from './views/users/EditUser';
import UserDetail from './views/users/UserDetail';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/knowledges/:knowledgesId" element={<KnowledgeDetail />} />
        <Route path="/edit/:knowledgeId" element={<EditKnowledge />} />

        <Route path="/private/:usersId" element={<IsPrivate><UserDetail /></IsPrivate>} />
        <Route path="/private/edit/:userId" element={<IsPrivate><EditUser /></IsPrivate>} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
