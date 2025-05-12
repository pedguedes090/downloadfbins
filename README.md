# 🌟 Social Media Downloader

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

A beautiful and powerful web application for downloading videos from Facebook and images/videos from Instagram with a friendly pink-milk theme.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-documentation) • [Development](#development)

</div>

## ✨ Features

- 🎥 Download Facebook videos in HD/SD quality
- 📸 Download Instagram videos and images
- 🎨 Beautiful pink-milk themed UI
- 👀 Preview media before downloading
- 💾 Local storage with automatic cleanup
- ⚡ RESTful API endpoints
- 🔄 Auto-delete files after 5 minutes
- 📱 Fully responsive design

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-media-downloader.git
cd social-media-downloader
```

2. Install dependencies:
```bash
npm install
```

## 💻 Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter a Facebook video URL or Instagram post URL and click the download button

4. Preview and download your media

## 📚 API Documentation

The application provides RESTful API endpoints for integration with other applications.

### Base URL
```
http://localhost:3000
```

### Facebook Video Download
- **Endpoint**: `/api/facebook`
- **Method**: `POST`
- **Body**: 
```json
{
    "url": "facebook_video_url"
}
```
- **Response**:
```json
{
    "success": true,
    "data": {
        "url": "original_facebook_url",
        "duration_ms": 189632,
        "sd": "sd_video_url",
        "hd": "hd_video_url",
        "title": "video_title",
        "thumbnail": "thumbnail_url",
        "filename": "local_filename.mp4",
        "localUrl": "/downloads/local_filename.mp4",
        "expiresIn": "5 minutes"
    }
}
```

### Instagram Content Download
- **Endpoint**: `/api/instagram`
- **Method**: `POST`
- **Body**: 
```json
{
    "url": "instagram_post_url"
}
```
- **Response**:
```json
{
    "success": true,
    "data": {
        "results_number": 1,
        "post_info": {
            "owner_username": "username",
            "owner_fullname": "fullname",
            "is_verified": false,
            "is_private": false,
            "likes": 6,
            "is_ad": false
        },
        "media_details": [
            {
                "type": "video|image",
                "dimensions": {
                    "height": "1080",
                    "width": "1920"
                },
                "video_view_count": 1000,
                "url": "media_url",
                "thumbnail": "thumbnail_url",
                "filename": "local_filename.mp4",
                "localUrl": "/downloads/local_filename.mp4",
                "expiresIn": "5 minutes"
            }
        ]
    }
}
```

## 🛠️ Development

For development with auto-reload:
```bash
npm run dev
```

## 📦 Dependencies

- [express](https://www.npmjs.com/package/express) - Web framework
- [fb-downloader-scrapper](https://www.npmjs.com/package/fb-downloader-scrapper) - Facebook video downloader
- [instagram-url-direct](https://www.npmjs.com/package/instagram-url-direct) - Instagram media downloader
- [axios](https://www.npmjs.com/package/axios) - HTTP client
- [cors](https://www.npmjs.com/package/cors) - CORS middleware
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables

## 🔧 Configuration

The application can be configured using environment variables:

```env
PORT=3000
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/social-media-downloader/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
Made with ❤️ by [Your Name]
</div> 