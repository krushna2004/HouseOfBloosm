# How to Add New Products to House of Blooms 🌸

## Quick Guide - Add Products in 3 Steps

### Step 1: Upload Product Images

You have several **FREE** options to host your product images:

#### Option A: ImgBB (Recommended - Easiest)
1. Go to https://imgbb.com/
2. Click "Start uploading"
3. Upload your product photo
4. Copy the **Direct Link** (ends with .jpg or .png)
5. Save this URL

#### Option B: Imgur
1. Go to https://imgur.com/
2. Click "New post"
3. Upload your image
4. Right-click image → "Copy image address"
5. Save this URL

#### Option C: Cloudinary (Professional)
1. Sign up at https://cloudinary.com/ (FREE tier)
2. Upload images to Media Library
3. Copy the image URL
4. Save this URL

---

### Step 2: Add Product to Your Code

Open the file: **`/app/frontend/src/data/mock.js`**

Find the `productImages` array and add your new product:

```javascript
export const productImages = [
  // ... existing products ...
  
  // ADD YOUR NEW PRODUCT HERE:
  {
    id: 20,  // Next available number (currently 19 products)
    url: 'https://i.ibb.co/YOUR-IMAGE-URL.jpg',  // Your ImgBB URL
    title: 'Purple Lavender Bouquet',  // Product name
    category: 'Crochet Flowers',  // Choose: 'Crochet Flowers', 'Resin Art', 'Hand-Painted Sarees', or 'Bouquet Collection'
    description: 'Beautiful purple lavender bouquet with green stems',  // Short description
    price: 299  // Price in Rupees (no ₹ symbol)
  }
];
```

**Full Example:**
```javascript
export const productImages = [
  {
    id: 1,
    url: 'https://customer-assets.emergentagent.com/job_fervent-bhabha-1/artifacts/xrt9km5j_image.png',
    title: 'Pink Rose Stems',
    category: 'Crochet Flowers',
    description: 'Handcrafted pink rose stems with green leaves',
    price: 199
  },
  // ... more products ...
  {
    id: 20,  // 👈 NEW PRODUCT
    url: 'https://i.ibb.co/abc123/lavender.jpg',
    title: 'Purple Lavender Bouquet',
    category: 'Crochet Flowers',
    description: 'Beautiful purple lavender bouquet',
    price: 299
  }
];
```

---

### Step 3: Save and Update

#### If Running Locally (on your computer):
- Save the `mock.js` file
- Refresh your browser
- Your new product will appear!

#### If Deployed on Vercel:
1. Save the `mock.js` file
2. Commit to GitHub:
   ```bash
   git add frontend/src/data/mock.js
   git commit -m "Added new product: Purple Lavender"
   git push
   ```
3. Vercel will automatically redeploy (2-3 minutes)
4. New product appears on your website!

---

## Complete Step-by-Step Example

### Adding "Blue Rose Resin Necklace" - ₹399

**Step 1: Upload Image**
- Go to https://imgbb.com/
- Upload `blue-rose-necklace.jpg`
- Get URL: `https://i.ibb.co/xyz123/blue-rose.jpg`

**Step 2: Edit mock.js**
```javascript
export const productImages = [
  // ... existing 19 products ...
  
  {
    id: 20,
    url: 'https://i.ibb.co/xyz123/blue-rose.jpg',
    title: 'Blue Rose Resin Necklace',
    category: 'Resin Art',
    description: 'Stunning blue rose preserved in clear resin pendant',
    price: 399
  }
];
```

**Step 3: Deploy**
- Push to GitHub
- Wait 2 minutes
- Check your website! 🎉

---

## Product Categories

You MUST use one of these 4 categories (exactly as written):

1. `'Crochet Flowers'` - All crochet flower items
2. `'Resin Art'` - Resin jewelry, keychains, phone cases
3. `'Hand-Painted Sarees'` - Sarees with hand-painted designs
4. `'Bouquet Collection'` - Bouquets and gift boxes

---

## Quick Reference Checklist

When adding a new product, make sure you have:

- [ ] Product photo uploaded to ImgBB/Imgur
- [ ] Image URL copied
- [ ] Next ID number (last product + 1)
- [ ] Product title
- [ ] Correct category (one of the 4 above)
- [ ] Product description
- [ ] Price (number only, no ₹)
- [ ] Saved mock.js file
- [ ] Pushed to GitHub (if deployed)

---

## Tips for Product Photos

✅ **Good Photos:**
- Clear, well-lit images
- White or clean background
- Product is centered
- High resolution (at least 800x800px)
- Square format works best

❌ **Avoid:**
- Blurry images
- Dark/shadowy photos
- Multiple products in one image
- Text/watermarks on the image

---

## Pricing Guidelines

Current pricing structure:

| Category | Price Range |
|----------|------------|
| Crochet Flowers | ₹150 - ₹299 |
| Resin Art | ₹199 - ₹499 |
| Hand-Painted Sarees | ₹1,999 - ₹2,499 |
| Bouquet Collection | ₹599 - ₹799 |

Adjust as needed for your products!

---

## Troubleshooting

### "Image not showing on website"
- Check the image URL works (paste in browser)
- Make sure URL starts with `https://`
- ImgBB/Imgur might have blocked hotlinking (try different service)

### "Product not appearing"
- Check for typos in category name
- Make sure you saved the file
- Clear browser cache (Ctrl + F5)
- Check browser console for errors (F12)

### "Website not updating after GitHub push"
- Check Vercel deployment status
- Make sure push was successful
- Redeploy manually from Vercel dashboard

---

## Need to Delete a Product?

1. Open `/app/frontend/src/data/mock.js`
2. Find the product by its title
3. Delete the entire product object (including { })
4. Save and push to GitHub

**Example:**
```javascript
// DELETE THIS:
{
  id: 15,
  url: '...',
  title: 'Old Product',
  category: 'Resin Art',
  description: '...',
  price: 299
},  // 👈 Delete the comma too!
```

---

## Need to Update Price?

1. Open `/app/frontend/src/data/mock.js`
2. Find the product
3. Change the `price: 299` number
4. Save and push to GitHub

---

## Advanced: Add New Category (Optional)

If you want to add a 5th category (e.g., "Accessories"):

**Step 1:** Edit `/app/frontend/src/components/Gallery.jsx`
```javascript
const categories = [
  'All', 
  'Crochet Flowers', 
  'Resin Art', 
  'Hand-Painted Sarees', 
  'Bouquet Collection',
  'Accessories'  // 👈 Add your new category
];
```

**Step 2:** Add products with this category in `mock.js`
```javascript
{
  id: 21,
  url: '...',
  title: 'Hair Clip',
  category: 'Accessories',  // 👈 New category
  description: 'Floral hair clip',
  price: 149
}
```

---

## Summary

**To add products daily:**
1. ✅ Take good product photo
2. ✅ Upload to ImgBB.com
3. ✅ Copy image URL
4. ✅ Edit `mock.js` file
5. ✅ Add product details
6. ✅ Push to GitHub
7. ✅ Wait 2 minutes for auto-deploy

**That's it! 🌸**

No database management needed - everything is in one simple file!

---

## Future: Add Database (Optional)

If you want to manage products through an admin panel instead of editing code:

1. Add MongoDB backend (you already have it!)
2. Create admin panel page
3. Upload images and add products through a form
4. No code editing needed

Let me know if you want this feature! 🚀
