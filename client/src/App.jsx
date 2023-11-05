import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddNoteForm from './pages/AddNoteForm';
import LoginForm from './pages/LoginForm';
import NoteList from './pages/NoteList';
import Error from './pages/Error';
import Home from './pages/Home';
import PrivateRoute from './pages/PrivateRoute';
import Users from './pages/Users';
import User from './pages/User';

import Footer from './components/Footer';
import Notification from './components/Notification';
import Navbar from './components/Navbar';
import Register from './pages/Register';

function App() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-start mt-4 md:mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NoteList />
                </PrivateRoute>
              }
            />
            <Route
              path="/addNote"
              element={
                <PrivateRoute>
                  <AddNoteForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:id"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
      <Notification />
      <Footer />
    </main>
  );
}

export default App;
