# House of Blooms - Free Deployment Guide 🌸

This guide will help you deploy your House of Blooms website for FREE using Vercel (frontend), Railway (backend), and MongoDB Atlas (database).

## Overview

Your website has:
- **Frontend**: React app (deployable on Vercel/Netlify - FREE)
- **Backend**: FastAPI (deployable on Railway - FREE tier)
- **Database**: MongoDB (MongoDB Atlas - FREE tier)

## Step-by-Step Deployment

### Part 1: Setup MongoDB Atlas (FREE - Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a FREE account
3. Create a FREE cluster (M0 - 512MB storage)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Save this - you'll need it later!

### Part 2: Deploy Backend on Railway (FREE)

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub (FREE)
3. Click "New Project" → "Deploy from GitHub repo"
4. Upload your `/app/backend` folder
5. Add Environment Variables:
   ```
   MONGO_URL=your_mongodb_atlas_connection_string
   DB_NAME=houseofblooms
   CORS_ORIGINS=*
   SENDER_EMAIL=krushnakanani23@gmail.com
   ```
6. Railway will give you a URL like: `https://your-backend.railway.app`
7. **IMPORTANT**: Copy this backend URL!

### Part 3: Deploy Frontend on Vercel (FREE - Recommended)

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub (FREE)
3. Click "Add New" → "Project"
4. Import your `/app/frontend` folder
5. Configure:
   - **Framework Preset**: Create React App
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
   - **Install Command**: `yarn install`

6. Add Environment Variable:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```
   (Use the Railway backend URL from Part 2)

7. Click "Deploy"
8. You'll get a FREE URL like: `https://houseofblooms.vercel.app`

#### Option B: Deploy via Netlify (Alternative)

1. Go to [Netlify.com](https://www.netlify.com/)
2. Sign up (FREE)
3. Drag and drop your `/app/frontend` folder
4. Configure build settings:
   - **Build command**: `yarn build`
   - **Publish directory**: `build`
5. Add environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```
6. Deploy!

### Part 4: Update Instagram Bio

Once deployed, add your Vercel/Netlify URL to your Instagram bio:
- Instagram: @house.of_blooms
- Website: `https://houseofblooms.vercel.app` (or your custom URL)

---

## Alternative: Frontend-Only Deployment (Simpler)

If you want the SIMPLEST free deployment (no backend setup), we can:
1. Remove the contact form backend integration
2. Keep only WhatsApp links (which already work!)
3. Deploy frontend only on Vercel - takes 5 minutes

**This means:**
- ✅ Gallery works
- ✅ WhatsApp ordering works
- ✅ Instagram links work
- ❌ Contact form won't save to database (but you're using WhatsApp anyway!)

---

## How to Download Your Code

### Method 1: Download from Emergent (If available)

1. Look for "Download Code" or "Export" button in Emergent interface
2. Download the ZIP file
3. Extract it on your computer

### Method 2: Copy Files Manually

I can help you create a downloadable package with all necessary files.

---

## Important Files Checklist

Before deploying, make sure you have:

### Frontend Files:
- ✅ `/app/frontend/src/` (all React components)
- ✅ `/app/frontend/package.json`
- ✅ `/app/frontend/public/`
- ✅ `/app/frontend/craco.config.js`
- ✅ `/app/frontend/tailwind.config.js`

### Backend Files:
- ✅ `/app/backend/server.py`
- ✅ `/app/backend/requirements.txt`
- ✅ `/app/backend/.env.example` (create this)

---

## Environment Variables Reference

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=houseofblooms
CORS_ORIGINS=*
SENDER_EMAIL=krushnakanani23@gmail.com
```

---

## Costs Summary

| Service | Cost | What You Get |
|---------|------|--------------|
| **Vercel** | FREE | Frontend hosting, CDN, SSL, Custom domain |
| **Railway** | FREE | 500 hours/month, Backend hosting |
| **MongoDB Atlas** | FREE | 512MB database |
| **Total** | **$0** | Complete website! |

---

## Custom Domain (Optional)

Want `houseofblooms.com` instead of `.vercel.app`?

1. Buy domain from Namecheap (~$10/year)
2. Add to Vercel (FREE)
3. Vercel handles SSL automatically (FREE)

---

## Need Help?

If you get stuck:
1. Check Vercel documentation
2. Check Railway documentation
3. Ask me for specific help with any step!

---

## Quick Start (Fastest Way)

1. **5 min**: Create MongoDB Atlas FREE account → Get connection string
2. **10 min**: Deploy backend on Railway with MongoDB URL
3. **5 min**: Deploy frontend on Vercel with backend URL
4. **Done!** Add URL to Instagram bio

**Total time: ~20 minutes for completely FREE deployment!**

---

Good luck with your deployment! 🌸✨
