# 👥 friends-finder

A full-stack web application for managing user profiles with social following functionality. Users can create, edit, and follow/unfollow other users.

## 🔗 Links

- **Live Demo**: https://friends-finder-umber.vercel.app (Vercel)
- **Backend API**: https://friends-finder.onrender.com   (Render)
- **Repository**: https://github.com/RahulCSS/friends-finder (Github)

## 🎯 Features

- ✅ **User CRUD Operations** - Create, Read and Update user profiles
- ✅ **User Profiles** - Name, email, phone, date of birth, and profile images
- ✅ **Age Calculation** - Automatically calculates and displays current age
- ✅ **Social Following** - Users can follow/unfollow other users
- ✅ **Follower Statistics** - View follower and following counts for each user
- ✅ **Image Upload** - Profile picture support via Firebase Storage
- ✅ **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- ✅ **Real-time Updates** - Instant UI updates after actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Storage** - Image hosting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **CORS** - Cross-origin resource sharing

### Database
- **Supabase PostgreSQL** - Cloud-hosted PostgreSQL database

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase
- **Images**: Firebase Storage

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database (local or Supabase account)
- Firebase account (for image uploads)
- Git

## 📁 Project Structure

```
user-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── routes/
│   │   ├── user.js               # User CRUD endpoints
│   │   └── follow.js             # Follow/unfollow endpoints
│   ├── server.js                 # Express server setup
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── UserCard.jsx      # User profile card component
│   │   ├── pages/
|   |   |   ├── Connection.jsx    # Followers/Following view page
│   │   │   ├── Dashboard.jsx     # Main dashboard view page
│   │   │   ├── CreateUser.jsx    # Create user form page
│   │   │   └── EditUser.jsx      # Edit user form page
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   ├── user.js           # User API calls
│   │   │   ├── follow.js         # Follow API calls
│   │   │   └── firebase.js       # Firebase config
│   │   ├── utils/
│   │   │   └── calculateAge.js   # Age calculation helper
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Tailwind imports
│   ├── package.json
│   └── .env.development
│
└── README.md
```

## 🔌 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users with follower/following counts |
| GET | `/api/users/:id` | Get single user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update user details |
| GET | `/api/users/:id/following` | Get users that user is following |
| GET | `/api/users/:id/followers` | Get user's followers |

### Follows

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/follows` | Follow a user |
| DELETE | `/api/follows` | Unfollow a user |


## 🎨 Features Walkthrough

### 1. Dashboard
- View all registered users
- See follower and following counts
- Select a user to manage their following relationships by view action
- Quick access to edit user details by edit actions

### 2. Create User
- Fill in user details (name, email, phone, DOB)
- Upload profile picture
- Automatic validation for required fields
- Email uniqueness validation

### 3. Edit User
- Update user information
- Change profile picture
- Manage following list:
  - View current following
  - Add new follows
  - Remove existing follows
- Real-time updates

### 4. Follow System
- Select a user from the dashboard by view action
- Click follow/unfollow on other users
- Prevents self-following
- Prevents duplicate follows
- Automatic count updates


## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Created as a Full Stack Development recruitment assignment.


**Built with ❤️ using React, Express, and PostgreSQL**