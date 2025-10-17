import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { user} from '../api/user';
import { follow} from '../api/follow';

function Connections() {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowData();
  }, [id]);

  const fetchFollowData = async () => {
    try {
      setLoading(true);
      const [followersData, followingData, allUsersData] = await Promise.all([
        user.getFollowers(id),
        user.getFollowing(id),
        user.getAllUsers(),
      ]);

      setFollowers(followersData);
      setFollowing(followingData);
      setAllUsers(allUsersData.filter(u => u.id !== parseInt(id)));
      console.log('Followers Data:', followersData);
      console.log('Following Data:', followingData);
      console.log('All Users Data:', allUsersData);
    } catch (err) {
      alert('Failed to load follow data');
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (followingId) => {
    try {
      await follow.unfollowUser(parseInt(id), followingId);
      setFollowing(following.filter(u => u.id !== followingId));
    } catch (error) {
      console.error('Error unfollowing:', error);
      alert('Failed to unfollow user');
    }
  };

  const handleFollow = async (followingId) => {
    try {
      await follow.followUser(parseInt(id), followingId);
      const newFollowingUser = allUsers.find(u => u.id === followingId);
      setFollowing([...following, newFollowingUser]);
    } catch (error) {
      console.error('Error following:', error);
      alert(error.response?.data?.error || 'Failed to follow user');
    }
  };

  const availableToFollow = allUsers.filter(
    user => !following.find(f => f.id === user.id)
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Manage Followers & Following</h1>


      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Your Followers</h2>
        {followers.length === 0 ? (
          <p className="text-gray-500">No followers yet.</p>
        ) : (
          <ul className="space-y-2">
            {followers.map(user => (
                <li key={user.id} className="flex items-center space-x-3">
                <img
                    src={user.profile_image_url || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.name} </span>
                <span className="text-xs text-gray-400">
                👥 {user.followers_count || 0}  · ➡️ {user.following_count || 0} 
                </span>
                </li>
            ))}
            </ul>
        )}
      </section>

      
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">You're Following</h2>
        {following.length === 0 ? (
          <p className="text-gray-500">Not following anyone.</p>
        ) : (
          <ul className="space-y-2">
            {following.map(user => (
                <li key={user.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                    src={user.profile_image_url || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{user.name} </span>
                    <span className="text-xs text-gray-400">
                    👥 {user.followers_count || 0}  · ➡️ {user.following_count || 0} 
                    </span>
                </div>
                <button
                    onClick={() => handleUnfollow(user.id)}
                    className="text-red-500 hover:underline text-sm"
                >
                    Unfollow
                </button>
                </li>
            ))}
            </ul>
        )}
      </section>

      
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Add More People to Follow</h2>
        {availableToFollow.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          <ul className="space-y-2">
            {availableToFollow.map(user => (
                <li key={user.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                    src={user.profile_image_url || '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{user.name} </span>
                    <span className="text-xs text-gray-400">
                    👥 {user.followers_count || 0} · ➡️ {user.following_count || 0} 
                    </span>
                </div>
                <button
                    onClick={() => handleFollow(user.id)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    Follow
                </button>
                </li>
            ))}
            </ul>
        )}
      </section>
    </div>
  );
}

export default Connections;
