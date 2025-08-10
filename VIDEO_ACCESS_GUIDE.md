# 🎥 Video Access Guide - Amal Academy

## How to Access Course Videos

### 🚀 **Quick Access Steps:**

1. **Start Your Servers** (if not already running):
   ```bash
   # Backend (Terminal 1)
   cd backend && npm run dev

   # Frontend (Terminal 2) 
   cd frontend && npm run dev
   ```

2. **Visit the Application**: http://localhost:3000

3. **Login with Test Account**:
   - **Email**: `admin@amalacademy.com`
   - **Password**: `admin123`
   
   OR
   
   - **Email**: `ahmad@amalacademy.com` 
   - **Password**: `instructor123`

### 📚 **Access Videos Through Courses:**

#### **Method 1: From Courses Page**
1. Go to **Courses** page: http://localhost:3000/courses
2. Click on any course card (JavaScript, React, or UI/UX Design)
3. Click **"Start Learning"** button
4. You'll be taken directly to the first video!

#### **Method 2: From Course Detail Page**
1. Go to **Courses** page: http://localhost:3000/courses
2. Click on a course card to view details
3. In the **Curriculum** tab, click on any lesson with a ▶️ play icon
4. Free preview lessons are available to everyone
5. Enrolled users can access all lessons

#### **Method 3: Direct Video URLs**
After seeding, you can access videos directly:

**JavaScript Course Videos:**
- http://localhost:3000/watch/javascript-fundamentals/[VIDEO_ID]

**React Course Videos:**
- http://localhost:3000/watch/react-development/[VIDEO_ID]

**UI/UX Course Videos:**
- http://localhost:3000/watch/ui-ux-design/[VIDEO_ID]

### 🎬 **Sample Videos Available:**

1. **JavaScript Fundamentals Course:**
   - Welcome to JavaScript (5 min) - FREE PREVIEW
   - Variables and Data Types (15 min)
   - Functions and Scope (20 min)

2. **React Development Course:**
   - React Components (30 min) - FREE PREVIEW
   - State and Props (25 min)

3. **UI/UX Design Course:**
   - Design Principles (35 min) - FREE PREVIEW

### 🔧 **Video Player Features:**

✅ **Custom Controls:**
- Play/Pause
- Volume control
- Fullscreen mode
- Playback speed (0.5x to 2x)
- Skip forward/backward (10 seconds)

✅ **Learning Features:**
- Progress tracking
- Bookmarks
- Note-taking
- Lesson playlist
- Auto-advance to next lesson

✅ **Responsive Design:**
- Works on desktop and mobile
- Touch-friendly controls
- Adaptive video quality

### 🐛 **Troubleshooting:**

**Videos Not Loading?**
1. Check if both servers are running
2. Verify you're logged in
3. Check browser console for errors
4. Try refreshing the page

**Can't Access Lessons?**
1. Make sure you're logged in
2. Free preview lessons should work for everyone
3. Other lessons require enrollment (automatic for logged-in users)

**Database Issues?**
```bash
cd backend
npm run seed  # Re-run the seeder
```

### 🎯 **Next Steps:**

1. **Test the video player** with different courses
2. **Try the learning features** (notes, bookmarks)
3. **Check mobile responsiveness**
4. **Test user progress tracking**

---

**Enjoy your enhanced video learning experience! 🎓✨**