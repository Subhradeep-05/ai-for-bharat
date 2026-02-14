const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Force reload environment variables
dotenv.config({ path: "./.env" });

console.log("📧 Email Service Loading...");
console.log(
  "EMAIL_USER from process.env:",
  process.env.EMAIL_USER ? "✅ Found" : "❌ Missing",
);
console.log(
  "EMAIL_PASSWORD from process.env:",
  process.env.EMAIL_PASSWORD ? "✅ Found" : "❌ Missing",
);

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// Email templates
const emailTemplates = {
  "application-confirmation": (data) => ({
    subject: `Application Confirmation: ${data.schemeName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .application-id { background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
          .application-id h2 { color: #2e7d32; margin: 0; }
          .details { margin: 20px 0; }
          .detail-item { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
          .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Received! 🎉</h1>
          </div>
          <div class="content">
            <p>Dear ${data.userName},</p>
            <p>Thank you for applying for <strong>${data.schemeName}</strong>. Your application has been successfully submitted.</p>
            
            <div class="application-id">
              <h2>Application ID: ${data.applicationId}</h2>
            </div>
            
            <div class="details">
              <h3>Application Details:</h3>
              <div class="detail-item">
                <strong>Scheme:</strong> ${data.schemeName}
              </div>
              <div class="detail-item">
                <strong>Applied Date:</strong> ${data.appliedDate}
              </div>
              <div class="detail-item">
                <strong>Status:</strong> Pending Review
              </div>
            </div>
            
            <div class="details">
              <h3>Scheme Benefits:</h3>
              <div class="detail-item">
                ${data.schemeDetails?.benefit || "As per scheme guidelines"}
              </div>
            </div>
            
            <div class="details">
              <h3>Next Steps:</h3>
              <ol>
                <li>Your application will be reviewed within 7-10 working days</li>
                <li>You may be contacted for additional documents if needed</li>
                <li>Track your application status on your dashboard</li>
              </ol>
            </div>
            
            <div class="footer">
              <p>For assistance, contact: ${data.schemeDetails?.helpline || "helpdesk@gov.in"}</p>
              <p>Website: <a href="${data.schemeDetails?.website || "#"}">${data.schemeDetails?.website || "Official Website"}</a></p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
  // Add these to your emailTemplates object
  "document-uploaded": (data) => ({
    subject: `Document Uploaded: ${data.documentName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-pending { background: #fff3e0; padding: 10px; border-radius: 5px; color: #ef6c00; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Document Uploaded! 📄</h1>
        </div>
        <div class="content">
          <p>Dear ${data.userName},</p>
          <p>Your document <strong>${data.documentName}</strong> has been successfully uploaded.</p>
          
          <div class="status-pending">
            <strong>Status:</strong> Pending Verification
          </div>
          
          <p>Our team will verify your document within 24-48 hours. You will receive another email once it's verified.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard/documents" class="button">View Documents</a>
          </div>
          
          <div class="footer">
            <p>Upload Date: ${data.uploadDate}</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  }),

  "document-verified": (data) => ({
    subject: `Document Verified: ${data.documentName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-verified { background: #e8f5e9; padding: 10px; border-radius: 5px; color: #2e7d32; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        .button { display: inline-block; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Document Verified! ✅</h1>
        </div>
        <div class="content">
          <p>Dear ${data.userName},</p>
          <p>Your document <strong>${data.documentName}</strong> has been verified successfully.</p>
          
          <div class="status-verified">
            <strong>Status:</strong> Verified
          </div>
          
          <p>You can now use this document for scheme applications that require it.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard/documents" class="button">View Documents</a>
          </div>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  }),

  "document-rejected": (data) => ({
    subject: `Document Rejected: ${data.documentName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-rejected { background: #ffebee; padding: 10px; border-radius: 5px; color: #c62828; }
        .reason-box { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #f44336; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        .button { display: inline-block; padding: 10px 20px; background: #f44336; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Document Rejected ❌</h1>
        </div>
        <div class="content">
          <p>Dear ${data.userName},</p>
          <p>Your document <strong>${data.documentName}</strong> has been rejected.</p>
          
          <div class="status-rejected">
            <strong>Status:</strong> Rejected
          </div>
          
          ${
            data.rejectionReason
              ? `
          <div class="reason-box">
            <strong>Reason for rejection:</strong>
            <p>${data.rejectionReason}</p>
          </div>
          `
              : ""
          }
          
          <p>Please upload a new document with the correct information.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/dashboard/documents" class="button">Upload New Document</a>
          </div>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  }),
  // Add to your emailTemplates object
  "document-verification": (data) => ({
    subject: `Action Required: Verify Your Document - ${data.documentName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff9933 0%, #138808 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .document-info { background: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ff9933; }
        .verify-button { display: inline-block; padding: 15px 30px; background: #138808; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .verify-button:hover { background: #0f6e06; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
        .warning { color: #ff4444; font-size: 0.9em; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Document Verification Required 📄</h1>
        </div>
        <div class="content">
          <p>Dear ${data.userName},</p>
          <p>You have uploaded a document that requires verification. Please click the button below to confirm that this document belongs to you.</p>
          
          <div class="document-info">
            <h3>Document Details:</h3>
            <p><strong>Document:</strong> ${data.documentName}</p>
            <p><strong>Uploaded on:</strong> ${data.uploadDate}</p>
            <p><strong>Document Type:</strong> ${data.documentType}</p>
            ${data.referenceNumber ? `<p><strong>Reference No:</strong> ${data.referenceNumber}</p>` : ""}
          </div>
          
          <div style="text-align: center;">
            <a href="${data.verificationLink}" class="verify-button">✓ Verify My Document</a>
          </div>
          
          <p class="warning">⚠️ This link will expire in 48 hours for security reasons.</p>
          
          <p>If you did not upload this document, please ignore this email or contact support immediately.</p>
          
          <div class="footer">
            <p>This is an automated message from Saarthi AI. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  }),

  "document-verified-success": (data) => ({
    subject: `Document Verified Successfully - ${data.documentName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #138808 0%, #0f6e06 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-icon { color: #138808; font-size: 48px; text-align: center; margin-bottom: 20px; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Document Verified! ✅</h1>
        </div>
        <div class="content">
          <div class="success-icon">✓</div>
          <p>Dear ${data.userName},</p>
          <p>Your document <strong>${data.documentName}</strong> has been successfully verified.</p>
          <p>You can now use this document for scheme applications that require it.</p>
          <div class="footer">
            <p>Thank you for using Saarthi AI.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  }),
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email credentials not configured. Skipping email send.");
      return {
        success: false,
        message: "Email service not configured",
        mock: true,
      };
    }

    const templateConfig = emailTemplates[template](data);

    const mailOptions = {
      from: `"Saarthi AI" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: templateConfig.subject,
      html: templateConfig.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
