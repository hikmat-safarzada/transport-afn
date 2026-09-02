const config = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
    mongo_pass: process.env.MONGO_PASS,
    jwt_secret: process.env.JWT_SECRET,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    client_url: process.env.CLIENT_URL,
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
    next_public_api_url: process.env.NEXT_PUBLIC_API_URL
}

module.exports = {config}