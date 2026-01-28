# House of Blooms - API Contracts

## Overview
Backend integration for handling customer inquiries and sending notifications to business owner.

## Current State (Frontend Only)
- Contact form saves to browser localStorage
- WhatsApp/Instagram links work via direct URLs
- Gallery filters work on frontend

## Backend Requirements

### 1. Database Models

#### Inquiry Model
```python
{
  id: UUID
  name: string (required)
  email_or_phone: string (required)
  product_type: string (optional)
  message: string (required)
  timestamp: datetime
  status: string (default: "new")
}
```

### 2. API Endpoints

#### POST /api/inquiries
- **Purpose**: Save customer inquiry and send email notification
- **Request Body**:
```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "product": "Crochet Flowers",
  "message": "I want to order..."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Thank you! We'll contact you soon",
  "inquiry_id": "uuid"
}
```
- **Backend Actions**:
  1. Save to MongoDB
  2. Send email to krushnakanani23@gmail.com with inquiry details
  
#### GET /api/inquiries
- **Purpose**: Retrieve all inquiries (for business owner)
- **Response**: Array of inquiry objects

### 3. Email Notification
- **To**: krushnakanani23@gmail.com
- **Subject**: "New Order Inquiry - House of Blooms"
- **Content**:
  - Customer Name
  - Contact (Email/Phone)
  - Product Interest
  - Message
  - Timestamp

### 4. Frontend Changes
- Update Contact.jsx to call POST /api/inquiries instead of localStorage
- Keep WhatsApp links as-is (direct links work perfectly)
- Show success toast after submission

## Implementation Plan
1. Install email package (if needed)
2. Create inquiry model in backend
3. Create POST /api/inquiries endpoint
4. Integrate email sending
5. Update frontend Contact component
6. Test flow end-to-end
