# DevFreebies Frontend

Modern React frontend for DevFreebies - A curated directory of free developer resources.

## 🚀 Features

- **Modern UI/UX** - Built with React 19, Tailwind CSS, and Framer Motion
- **Dark Mode** - Full dark mode support with theme persistence
- **Responsive Design** - Mobile-first, fully responsive across all devices
- **Authentication** - JWT-based auth with protected routes
- **Resource Management** - Browse, search, filter, bookmark, and upvote resources
- **User Dashboard** - Personal dashboard with bookmarks and submissions
- **Real-time Feedback** - Toast notifications for all actions
- **Performance Optimized** - Fast loading with code splitting and lazy loading

## 📦 Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Next generation frontend tooling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **React Icons** - Icon library

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   cd DevFreebies-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=DevFreebies
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navbar, Footer, Layout)
│   ├── pages/           # Page components
│   ├── sections/        # Section components (Hero, Features)
│   └── ui/              # Reusable UI components (Button, Input, Card)
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication context
│   └── ThemeContext.jsx # Theme management
├── services/            # API service functions
│   ├── api.js          # Axios instance
│   ├── auth.js         # Auth API calls
│   ├── resources.js    # Resources API calls
│   └── users.js        # Users API calls
├── App.jsx             # Main app component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Key Features Breakdown

### Authentication

- JWT-based authentication
- Persistent sessions with localStorage
- Protected routes for authenticated users
- User profile management

### Resource Management

- Browse all resources with pagination
- Search and filter by category
- Sort by newest, popular, most visited
- Upvote/downvote resources
- Bookmark favorite resources
- Submit new resources

### User Dashboard

- View profile statistics
- Manage bookmarks
- Track submitted resources
- Contribution scoring

### Theme System

- Dark/light mode toggle
- System preference detection
- Persistent theme selection
- Smooth transitions

## 🎯 Usage

### Running the App

1. **Start the backend server** (from backend directory)

   ```bash
   npm run dev
   ```

2. **Start the frontend** (from frontend directory)

   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Default Test Accounts

Use these credentials for testing (after seeding the database):

**Admin Account:**

- Email: `admin@devfreebies.com`
- Password: `admin123`

**Regular User:**

- Email: `john@example.com`
- Password: `password123`

## 🚧 Development Notes

### Important Considerations

1. **API Configuration**: Ensure `VITE_API_URL` in `.env` matches your backend URL
2. **Authentication**: Token is stored in localStorage and sent with each API request
3. **Error Handling**: All API calls include try-catch blocks with toast notifications
4. **Dark Mode**: Theme preference is saved in localStorage
5. **Responsive Design**: All components are mobile-first and fully responsive

### Common Issues

**CORS Errors**: Make sure backend CORS is configured to allow frontend origin

**Authentication Issues**: Check if JWT_SECRET matches between frontend and backend

**Theme Not Persisting**: Clear browser localStorage and try again

## 📝 Code Style

- ES6+ JavaScript
- Functional React components with hooks
- Tailwind CSS for styling
- Comments for component documentation
- Consistent naming conventions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Built with ❤️ by the tanish

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All contributors and users of DevFreebies

---

**Happy Coding! 🚀**
