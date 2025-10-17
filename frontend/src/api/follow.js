import api from './api';

export const follow = {
  // Follow a user
  followUser: async (followerId, followingId) => {
    const response = await api.post('/follow/followuser', {
      follower_id: followerId,
      following_id: followingId,
    });
    return response.data;
  },

  // Unfollow a user
  unfollowUser: async (followerId, followingId) => {
    const response = await api.delete('/follow/unfollowuser', {
      data: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return response.data;
  },
};