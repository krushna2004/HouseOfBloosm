# Step-by-Step: Export House of Blooms from Emergent to GitHub 🌸

## Step 1: Connect GitHub to Emergent

1. **In Emergent Interface:**
   - Look at the top-right corner of the screen
   - Click on your **profile icon** or **settings**
   - Find and click **"Connect GitHub"** or **"GitHub Integration"**

2. **Authorize Emergent:**
   - You'll be redirected to GitHub
   - Click **"Authorize Emergent"**
   - Log in to GitHub if prompted
   - Grant permissions

3. **Return to Emergent:**
   - You'll be redirected back to Emergent
   - You should see a success message

---

## Step 2: Push Your Code to GitHub

1. **Look for "Save to GitHub" Button:**
   - In your chat interface, look for a button that says:
     - **"Save to GitHub"** OR
     - **"Push to GitHub"** OR
     - **"Export to GitHub"**
   - It's usually at the top or bottom of the interface

2. **Configure the Push:**
   When you click "Save to GitHub", you'll see options:
   
   ```
   Repository Name: house-of-blooms (or choose your own)
   Branch: main (or create new branch)
   Commit Message: "Initial commit - House of Blooms website"
   ```

3. **Click "PUSH TO GITHUB"**
   - Emergent will create a new repository on your GitHub
   - It will push all your code (frontend + backend)
   - Wait for the success message

---

## Step 3: View Your Code on GitHub

1. **Go to GitHub.com:**
   - Open https://github.com in your browser
   - Log in to your account

2. **Find Your Repository:**
   - You should see a new repository called `house-of-blooms` (or whatever you named it)
   - Click on it to open

3. **Verify the Files:**
   You should see folders like:
   ```
   house-of-blooms/
   ├── frontend/
   ├── backend/
   ├── README.md
   ├── DEPLOYMENT_GUIDE.md
   └── QUICK_DEPLOY.md
   ```

---

## Step 4: Download ZIP (Optional)

If you want a local copy:

1. **In your GitHub repository:**
   - Click the green **"Code"** button
   - Select **"Download ZIP"**
   - Extract the ZIP file on your computer

---

## Step 5: Deploy to Vercel (Frontend)

### Option A: Direct from GitHub (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click **"Sign Up"** with GitHub

2. **Import Repository:**
   - Click **"Add New"** → **"Project"**
   - You'll see your `house-of-blooms` repository
   - Click **"Import"**

3. **Configure Project:**
   - **Root Directory**: Click "Edit" and select `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
   - **Install Command**: `yarn install`

4. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Add:
     ```
     Name: REACT_APP_BACKEND_URL
     Value: https://your-backend.railway.app (we'll get this in Step 6)
     ```
   - For now, you can use: `http://localhost:8001`

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - You'll get a URL like: `https://house-of-blooms.vercel.app`

---

## Step 6: Deploy to Railway (Backend)

1. **Go to Railway:**
   - Visit https://railway.app
   - Click **"Login"** with GitHub

2. **Create New Project:**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your `house-of-blooms` repository

3. **Configure Root Directory:**
   - After importing, click on the service
   - Go to **"Settings"**
   - Set **"Root Directory"** to `backend`

4. **Add Environment Variables:**
   - Click **"Variables"** tab
   - Add these one by one:
     ```
     MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
     DB_NAME=houseofblooms
     CORS_ORIGINS=*
     SENDER_EMAIL=krushnakanani23@gmail.com
     ```

5. **Get Backend URL:**
   - Railway will automatically give you a URL
   - Click on **"Settings"** → **"Domains"**
   - Copy the URL (like: `https://backend-production-xxxx.up.railway.app`)

6. **Update Vercel:**
   - Go back to Vercel
   - Update the `REACT_APP_BACKEND_URL` environment variable
   - Paste your Railway backend URL
   - Redeploy the frontend

---

## Step 7: Setup MongoDB Atlas (Database)

1. **Create Account:**
   - Go to https://mongodb.com/cloud/atlas/register
   - Sign up (FREE)

2. **Create Cluster:**
   - Select **"Shared"** (FREE tier)
   - Choose region (select closest to you)
   - Click **"Create Cluster"** (takes 3-5 minutes)

3. **Setup Database User:**
   - Go to **"Database Access"** (left sidebar)
   - Click **"Add New Database User"**
   - Username: `houseofblooms`
   - Password: Create a strong password (SAVE THIS!)
   - Database User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

4. **Whitelist IP Address:**
   - Go to **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

5. **Get Connection String:**
   - Go to **"Database"** (left sidebar)
   - Click **"Connect"** on your cluster
   - Select **"Connect your application"**
   - Copy the connection string:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
     ```
   - Replace `<username>` with: `houseofblooms`
   - Replace `<password>` with your actual password

6. **Update Railway:**
   - Go to Railway
   - Find the `MONGO_URL` variable
   - Update it with your MongoDB connection string
   - Railway will automatically redeploy

---

## Step 8: Test Your Website! 🎉

1. **Open Your Vercel URL:**
   - Visit `https://house-of-blooms.vercel.app` (or your URL)
   - Check if the gallery loads
   - Test the WhatsApp buttons
   - Try the category filters

2. **If Something Doesn't Work:**
   - Check Vercel logs for errors
   - Check Railway logs for backend errors
   - Verify all environment variables are correct

---

## Step 9: Add to Instagram Bio

1. **Copy Your Vercel URL**
2. **Go to Instagram:**
   - Open Instagram app
   - Go to your profile (@house.of_blooms)
   - Click **"Edit Profile"**
   - Paste URL in the **"Website"** field
   - Click **"Done"**

---

## Summary of URLs You'll Have:

```
Frontend: https://house-of-blooms.vercel.app
Backend:  https://backend-production-xxxx.up.railway.app
Database: MongoDB Atlas (connected via connection string)
```

---

## Total Time: ~30 minutes
## Total Cost: $0 (Completely FREE!)

---

## Troubleshooting

### "Save to GitHub" button not visible?
- Make sure GitHub is connected
- Look in settings/integrations
- Try refreshing the page

### Frontend showing errors?
- Check `REACT_APP_BACKEND_URL` in Vercel
- Make sure it points to your Railway URL
- Redeploy frontend after updating

### Backend not connecting to database?
- Check MongoDB connection string
- Verify password is correct (no special characters issues)
- Check IP whitelist includes 0.0.0.0/0

### WhatsApp buttons not working?
- They should work fine - they're just links!
- Test on mobile device

---

## Need Help?

If you get stuck at any step, let me know:
1. Which step are you on?
2. What error message do you see?
3. Screenshot if possible

I'll help you troubleshoot! 🌸
