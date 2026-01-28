# Quick Deployment Instructions 🚀

## Fastest Way to Deploy for FREE (20 minutes)

### Step 1: Download Your Code (2 minutes)

You have two options to get your code:

#### Option A: Using Emergent Export (If Available)
- Look for "Download" or "Export" button in Emergent
- Download the ZIP file
- Extract to your computer

#### Option B: Manual Download
Ask me to create a downloadable package, and I'll prepare all files for you.

---

### Step 2: Deploy Backend on Railway (8 minutes)

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub (FREE)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - OR use "Empty Project" and upload your `backend` folder

3. **Add Environment Variables**
   Click "Variables" and add:
   ```
   MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
   DB_NAME=houseofblooms
   CORS_ORIGINS=*
   SENDER_EMAIL=krushnakanani23@gmail.com
   ```

4. **Get Your Backend URL**
   - Railway will give you a URL like: `https://backend-production-xxxx.up.railway.app`
   - **COPY THIS URL** - you'll need it for the frontend!

---

### Step 3: Deploy Frontend on Vercel (5 minutes)

1. **Create Vercel Account**
   - Go to https://vercel.com/
   - Sign up with GitHub (FREE)

2. **Import Project**
   - Click "Add New" → "Project"
   - Upload your `frontend` folder (or connect GitHub repo)

3. **Configure Build Settings**
   - **Framework**: Create React App
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
   - **Install Command**: `yarn install`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     Name: REACT_APP_BACKEND_URL
     Value: https://your-backend-url.railway.app
     ```
   (Use the Railway URL from Step 2)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `https://houseofblooms.vercel.app`

---

### Step 4: Setup MongoDB Atlas (5 minutes)

1. **Create MongoDB Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up (FREE)

2. **Create FREE Cluster**
   - Choose "Shared" (FREE tier)
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Add new database user
   - Save username and password

4. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

5. **Update Railway**
   - Go back to Railway
   - Update `MONGO_URL` with your MongoDB connection string
   - Railway will auto-redeploy

---

### Step 5: Add to Instagram Bio! 🎉

- Go to Instagram → Edit Profile
- Add your Vercel URL: `https://houseofblooms.vercel.app`
- Save!

---

## Troubleshooting

### Frontend can't connect to backend?
- Check REACT_APP_BACKEND_URL is correct
- Check CORS_ORIGINS=* in Railway
- Redeploy frontend on Vercel

### Backend not starting?
- Check MONGO_URL is correct
- Check all environment variables are set
- Check Railway logs for errors

### MongoDB connection error?
- Check connection string has correct password
- Check IP whitelist (set to 0.0.0.0/0 for all access)
- Check database user has read/write permissions

---

## Files You Need

### Frontend Folder:
```
frontend/
├── src/
├── public/
├── package.json
├── craco.config.js
├── tailwind.config.js
└── .env.example
```

### Backend Folder:
```
backend/
├── server.py
├── requirements.txt
└── .env.example
```

---

## Total Costs: $0 (Completely FREE!)

- ✅ Vercel: FREE forever
- ✅ Railway: 500 hours/month FREE (more than enough)
- ✅ MongoDB Atlas: 512MB FREE forever

---

## Need Help?

If you get stuck on any step, let me know which step and I'll provide detailed help!

The process is really straightforward - thousands of developers use this exact setup for free production apps! 🌸
