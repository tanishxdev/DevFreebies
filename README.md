# DevFreebies 📦

A community-driven platform for developers to discover, share, and save free developer tools and resources.

## 🌟 Overview

DevFreebies solves the problem of losing valuable developer tools in endless bookmarks, tabs, or notes. It provides a centralized platform where developers can:

- **Discover** free developer tools
- **Save** tools to personal collections
- **Submit** new resources
- **Upvote** useful resources
- **Build** a personal library of tools

## 🏗️ Project Structure

```
DevFreebies/
├── DevFreebies-backend/          # Node.js + Express API
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Authentication & validation
│   │   ├── models/              # MongoDB schemas
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Helper functions
│   │   ├── app.js               # Express app setup
│   │   └── server.js            # Server entry point
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── README.md
├── DevFreebies-frontend/        # React + Vite + Tailwind
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/          # React components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── pages/          # Page components
│   │   │   ├── sections/       # Section components
│   │   │   └── ui/             # UI components
│   │   ├── context/            # React context providers
│   │   ├── services/           # API service layer
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Public assets
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── vite.config.js
├── .git/                       # Git repository
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd DevFreebies-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd DevFreebies-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. Start the development server:
```bash
npm run dev
```

## 📁 Git Repository Details

This repository contains a complete monorepo structure with:

### Git Configuration
- **Main branches**: `main` (production), `dev` (development)
- **Hooks**: All standard Git hooks available as samples
- **Remotes**: Connected to `origin` remote

### Object Database
The `.git/objects/` directory contains all Git objects (commits, trees, blobs) organized by SHA-1 hash prefix. The repository includes:
- 80+ Git objects
- Pack files for efficient storage
- Reference logs for branch tracking

### Key Git Files
- `HEAD`: Points to current branch
- `index`: Staging area
- `config`: Repository configuration
- `packed-refs`: Packed references for efficiency

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Environment**: Dotenv

### Frontend
- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: React Context API

## 🔧 Core Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes and API endpoints
- Role-based access control (user/admin)

### Resource Management
- CRUD operations for developer resources
- Category and tag-based organization
- Featured and verified resource flags
- Upvote system for community validation
- Bookmarking for personal collections

### User Experience
- Responsive design with Tailwind CSS
- Dashboard for personal activity tracking
- Search and filtering capabilities
- Pagination for resource listings
- Real-time feedback on user actions

## 📊 Data Models

### User
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  avatar: String,
  role: String, // 'user' or 'admin'
  bookmarks: [ResourceId],
  contributionScore: Number
}
```

### Resource
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  url: String,
  image: String,
  category: String,
  tags: [String],
  submittedBy: UserId,
  upvotes: Number,
  visits: Number,
  isFeatured: Boolean,
  isVerified: Boolean,
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Resources
- `GET /api/resources` - List resources (with pagination/filtering)
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create resource (protected)
- `PUT /api/resources/:id` - Update resource (protected)
- `DELETE /api/resources/:id` - Delete resource (protected)
- `POST /api/resources/:id/upvote` - Upvote resource (protected)

### Users
- `GET /api/users/bookmarks` - Get user bookmarks (protected)
- `POST /api/users/bookmark/:id` - Bookmark resource (protected)

## 🗂️ Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `dev`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bug fix branches

### Commit Convention
We follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test-related changes
- `chore:` Maintenance tasks

### Development Workflow
1. Create feature branch from `dev`:
   ```bash
   git checkout -b feature/your-feature-name dev
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "feat: add new resource submission form"
   ```

3. Push to remote:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create Pull Request to `dev` branch

## 🤝 Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All contributors who have helped shape this project
- The open-source community for invaluable tools and libraries
- Developers everywhere for sharing their knowledge and resources

---

## 🎯 Project Vision

DevFreebies aims to become the go-to platform for developers to:
- Discover high-quality, free tools
- Build a reputation through contributions
- Create personal tool collections
- Connect with other developers through shared interests

## 🔮 Future Enhancements

Planned features include:
- Advanced search with filtering
- User profiles and leaderboards
- Collections and custom lists
- API for third-party integrations
- Browser extensions for quick saving
- Weekly newsletter with top resources

## 📞 Support

For support, questions, or feedback:
1. Check the [FAQ](DevFreebies-frontend/src/components/pages/FAQ.jsx)
2. Review existing issues
3. Submit a new issue with details

---

**Happy coding!** 💻✨