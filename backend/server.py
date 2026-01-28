from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class InquiryCreate(BaseModel):
    name: str
    email: str
    product: Optional[str] = ""
    message: str

class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    product: Optional[str] = ""
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Email sending function
async def send_email_notification(inquiry: Inquiry):
    try:
        # Email configuration
        sender_email = os.environ.get('SENDER_EMAIL', 'noreply@houseofblooms.com')
        receiver_email = 'krushnakanani23@gmail.com'
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"New Order Inquiry - House of Blooms"
        message["From"] = sender_email
        message["To"] = receiver_email
        
        # Email body
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff8f5; border-radius: 10px;">
              <h2 style="color: #fb7185;">🌸 New Order Inquiry - House of Blooms</h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong>Customer Name:</strong> {inquiry.name}</p>
                <p><strong>Contact:</strong> {inquiry.email}</p>
                <p><strong>Product Interest:</strong> {inquiry.product if inquiry.product else 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #fb7185; border-radius: 4px;">
                  {inquiry.message}
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  <strong>Received:</strong> {inquiry.timestamp.strftime('%B %d, %Y at %I:%M %p')}
                </p>
              </div>
              <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                Respond via WhatsApp: +91 9023970291 or +91 9601530514
              </p>
            </div>
          </body>
        </html>
        """
        
        part = MIMEText(html, "html")
        message.attach(part)
        
        # For now, we'll log the email (in production, use SMTP server)
        logger.info(f"Email notification prepared for inquiry: {inquiry.id}")
        logger.info(f"To: {receiver_email}, Subject: {message['Subject']}")
        
        # Note: In production, uncomment below and configure SMTP
        # smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        # smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        # smtp_password = os.environ.get('SMTP_PASSWORD', '')
        # 
        # with smtplib.SMTP(smtp_server, smtp_port) as server:
        #     server.starttls()
        #     server.login(sender_email, smtp_password)
        #     server.sendmail(sender_email, receiver_email, message.as_string())
        
        return True
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False

# Inquiry endpoints
@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(input: InquiryCreate):
    try:
        inquiry_dict = input.model_dump()
        inquiry_obj = Inquiry(**inquiry_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = inquiry_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to database
        await db.inquiries.insert_one(doc)
        
        # Send email notification
        await send_email_notification(inquiry_obj)
        
        logger.info(f"New inquiry created: {inquiry_obj.id}")
        return inquiry_obj
    except Exception as e:
        logger.error(f"Error creating inquiry: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create inquiry")

@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    try:
        # Exclude MongoDB's _id field from the query results
        inquiries = await db.inquiries.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for inquiry in inquiries:
            if isinstance(inquiry['timestamp'], str):
                inquiry['timestamp'] = datetime.fromisoformat(inquiry['timestamp'])
        
        return inquiries
    except Exception as e:
        logger.error(f"Error fetching inquiries: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch inquiries")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()