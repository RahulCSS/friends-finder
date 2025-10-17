import { calculateAge } from '../utils/calculateAge';

function UserCard({
  user,
  isSelected,
  onSelect,
  onEdit,
  onView
}) {
  const age = calculateAge(user.date_of_birth);

  return (
    <div
      className={`border rounded-lg shadow-md p-4 bg-white cursor-pointer ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'hover:border-blue-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.profile_image_url || 'https://via.placeholder.com/100'}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">Age: {age}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>👥 Followers: {user.followers_count || 0}</p>
          <p>➡️ Following: {user.following_count || 0}</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="text-blue-600 text-sm hover:underline"
          >
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-blue-600 text-sm hover:underline"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
