import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true
})

export function signUploadParams(params: Record<string, any>) {
	return cloudinary.utils.api_sign_request(params, cloudinary.config().api_secret as string)
}

export { cloudinary }