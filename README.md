# minifacebook
This project is ideal for those learning CRUD operations, authentication, and client-server architecture.

# About Mini Facebook

**Users can:**

- **Sign up / log in**
- **Create a post (with image & caption)**
- **View others' posts**
- **Delete their own post**

# Folder Structure

src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── Input/
│   ├── layout/           # Layout components
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   └── Footer.js
│   ├── features/         # Feature-specific components
│   │   ├── auth/
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   ├── posts/
│   │   │   ├── PostList.js
│   │   │   ├── PostItem.js
│   │   │   └── CreatePost.js
│   │   └── profile/
│   │       ├── ProfileCard.js
│   │       └── EditProfile.js
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   ├── usePosts.js
│   └── useLocalStorage.js
├── services/             # API and external services
│   ├── api.js
│   ├── authService.js
│   └── postService.js
├── utils/                # Helper functions
│   ├── dateUtils.js
│   ├── validators.js
│   └── constants.js
├── contexts/             # React Context providers
│   ├── AuthContext.js
│   └── ThemeContext.js
├── styles/               # Global styles
│   ├── globals.css
│   ├── variables.css
│   └── mixins.css
├── assets/               # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── pages/                # Page-level components
│   ├── HomePage.js
│   ├── ProfilePage.js
│   └── LoginPage.js
└── tests/                # Test utilities
    ├── testUtils.js
    └── mocks/


## Technologies Used

- Next.js
- TypeScript
- Prisma (with Supabase)
- Authentication
- File Upload handling
