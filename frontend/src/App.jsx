import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="inline-flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                  🏠 Dashboard
                </Link>
                <Link to="/create" className="inline-flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                  ➕ Create User
                </Link>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600">👥 User Management</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;