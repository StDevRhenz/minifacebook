# minifacebook
This project is ideal for those learning CRUD operations, authentication, and client-server architecture.

# About Mini Facebook

**Users can:**

- **Sign up / log in**
- **Create a post (with image & caption)**
- **View others' posts**
- **Delete their own post**

# Folder Structure

```
minifacebook/
├── public/                     # Static files (favicon, uploaded images)
├── src/
│   ├── pages/
│   │   ├── index.tsx           # Home page (feed)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── api/                # Backend API routes
│   │       ├── auth/
│   │       │   ├── login.ts
│   │       │   └── register.ts
│   │       └── posts/
│   │           ├── index.ts    # GET (list), POST (create post)
│   │           └── [id].ts     # DELETE post by ID
│   ├── components/             # PostCard, PostForm, etc.
│   ├── styles/                 # CSS or Tailwind setup
│   └── lib/                    # Database connection, auth helpers
├── db/                         # (Supabase)
│   └── schema.prisma
├── .env
├── next.config.js
└── README.md
```


## Technologies Used

- Next.js
- TypeScript
- Prisma (with Supabase)
- Authentication
- File Upload handling
