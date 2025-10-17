import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { user} from '../api/user';
import { follow} from '../api/follow';
import UserCard from '../components/UserCard';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await user.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await user.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      alert('Failed to delete user');
      console.error(err);
    }
  };

  const handleFollow = async (followingId) => {
    if (!selectedUserId) {
      alert('Please select a user first (click on any user card)');
      return;
    }

    if (selectedUserId === followingId) {
      alert('You cannot follow yourself!');
      return;
    }

    try {
      await follow.followUser(selectedUserId, followingId);
      fetchUsers(); // Refresh to update counts
    } catch (err) {
      if (err.response?.status === 400) {
        alert('Already following this user');
      } else {
        alert('Failed to follow user');
      }
    }
  };

  const handleUnfollow = async (followingId) => {
    if (!selectedUserId) {
      alert('Please select a user first');
      return;
    }

    try {
      await follow.unfollowUser(selectedUserId, followingId);
      fetchUsers(); // Refresh to update counts
    } catch (err) {
      alert('Failed to unfollow user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
        <button 
          onClick={fetchUsers}
          className="ml-4 text-red-600 hover:text-red-800 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Total Users: {users.length}
          {selectedUserId && (
            <span className="ml-4 text-blue-600">
              ⚡ Selected User ID: {selectedUserId}
            </span>
          )}
        </p>
      </div>

      {selectedUserId && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Click "Follow" or "Unfollow" buttons on other user cards to manage following relationships for the selected user.
          </p>
        </div>
      )}

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No users found</p>
          <button
            onClick={() => navigate('/create')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create First User
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onSelect={() => setSelectedUserId(user.id)}
              onEdit={() => navigate(`/edit/${user.id}`)}
              onDelete={() => handleDelete(user.id)}
              onFollow={() => handleFollow(user.id)}
              onUnfollow={() => handleUnfollow(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;