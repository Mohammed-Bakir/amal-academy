# 🚀 Amal Academy - Startup Guide

## Quick Start Instructions

### 1. 📋 Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 2. 🗄️ Database Setup

#### Test Database Connection
```bash
cd backend
npm run test-db
```

#### Seed Database with Sample Data
```bash
cd backend
npm run seed
```

### 3. 🖥️ Start Backend Server
```bash
cd backend
npm install
npm run dev
```
Server will run on: http://localhost:5003

### 4. 🌐 Start Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:3000

### 5. 🧪 Test the Application

#### Backend Health Check
Visit: http://localhost:5003/health

#### API Endpoints
- **Courses**: http://localhost:5003/api/courses
- **Categories**: http://localhost:5003/api/categories
- **Auth**: http://localhost:5003/api/auth

#### Frontend Pages
- **Home**: http://localhost:3000
- **Courses**: http://localhost:3000/courses
- **Login**: http://localhost:3000/login

### 6. 👤 Test Accounts (After Seeding)

#### Admin Account
- **Email**: admin@amalacademy.com
- **Password**: admin123

#### Instructor Accounts
- **Email**: ahmad@amalacademy.com / **Password**: instructor123
- **Email**: fatima@amalacademy.com / **Password**: instructor123

### 7. 🔧 Environment Configuration

#### Backend (.env)
```env
NODE_ENV=development
PORT=5003
MONGODB_URI= (Your MongoDB URI here)
JWT_SECRET=amal-academy-super-secret-jwt-key-2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5003/api
VITE_APP_NAME=Amal Academy
VITE_APP_VERSION=1.0.0
```

### 8. 🐛 Troubleshooting

#### Database Connection Issues
1. Check MongoDB URI in backend/.env
2. Ensure MongoDB service is running
3. Run `npm run test-db` to verify connection

#### CORS Issues
1. Verify FRONTEND_URL in backend/.env
2. Check VITE_API_URL in frontend/.env

#### Port Conflicts
- Backend default: 5003
- Frontend default: 3000
- Change ports in respective .env files if needed

### 9. 📁 Project Structure
```
amal-academy/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation
│   ├── seeders/         # Database seeders
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # Reusable components
│   │   ├── contexts/    # React contexts
│   │   ├── services/    # API services
│   │   └── styles/      # CSS styles
│   └── public/          # Static assets
```

### 10. 🎯 Next Steps
1. ✅ Run database seeder
2. ✅ Start both servers
3. ✅ Test login functionality
4. ✅ Browse courses with real data
5. ✅ Test admin panel
6. 🔄 Add more courses/content
7. 🚀 Deploy to production

### 11. 📞 Support
If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure both servers are running
4. Check database connection

---
**Happy Learning! 🎓**
