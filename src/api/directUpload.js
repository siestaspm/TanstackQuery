import axios from 'axios';
import {Config} from 'react-native-config';
export const handleUploadImages = async (images, type) => {
    try {
        const keys = [];
        for (let i = 0; i < images.length; i++) {
            console.log("images", images[i])
            const preSignedURl = await GetPreSignedUrl(type, "image/jpeg");
            try {
                const parameter = {
                    method: "PUT",
                    body: images[i],
                    headers: {
                        'Content-Type': 'image/jpeg',
                    }
                }
                await fetch(preSignedURl.data.presigned_url, parameter)
                keys.push(preSignedURl.data.key)
            } catch (error) {
                console.log('Error uploading to S3:', error);
                return "Failure"
            }
        }
        return keys;
    } catch (error) {
        console.log("Error", error);
        return "Failure"
    }
}

export const GetPreSignedUrl = async (type, content_type) => {
    try {
        const endpoint = `${Config.SL_API_BASE_URL}/xdeal/GetPreSignedUrl`
            const parameter = {
            type: type,
            content_type: content_type,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJuYmYiOjE3NjQzMTk5MDksImV4cCI6MTc2NjkxMTkwOSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.zSqZ5gIsy6Yy9dmU-6GmshUNKGrXQHeqIDKw-QqcLzI',
            user_type: "Member",
            version_number: Config.VERSION_NUMBER,
            country_code: 'PH'
        }
        const response = await axios.post(endpoint, parameter);
        return response;
    } catch (error) {
        console.log("error", error)
        return "Error";
    }
};