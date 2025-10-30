import { v2 as cloudinary } from 'cloudinary';

export async function getUploadSignature(req, res) {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = req.body.folder || 'edunexus/uploads';

    const paramsToSign = { timestamp, folder }; // client will also send upload_preset if used
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.json({ timestamp, folder, signature, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to create signature' });
  }
}
