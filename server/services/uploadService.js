const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (base64String, folder = 'book-images') => {
	try {
		const result = await cloudinary.uploader.upload(base64String, {
			folder,
			resource_type: 'image',
		});
		return result.secure_url;
	} catch (error) {
		throw new Error(`Image upload failed: ${error.message}`);
	}
};

module.exports = { uploadImage };
