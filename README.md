# Social Media Downloader

A beautiful web application for downloading videos from Facebook and images/videos from Instagram with a friendly pink-milk theme.

## Features

- Download Facebook videos
- Download Instagram videos and images
- Beautiful pink-milk themed UI
- Preview media before downloading
- Local storage of downloaded files
- RESTful API endpoints for integration with other applications

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter a Facebook video URL or Instagram post URL and click the download button

## API Endpoints

### Facebook Video Download
- **URL**: `/api/facebook`
- **Method**: `POST`
- **Body**: 
```json
{
    "url": "facebook_video_url"
}
```

### Instagram Content Download
- **URL**: `/api/instagram`
- **Method**: `POST`
- **Body**: 
```json
{
    "url": "instagram_post_url"
}
```

## Dependencies

- express
- fb-downloader-scrapper
- instagram-url-direct
- axios
- cors
- dotenv

## Development

For development with auto-reload:
```bash
npm run dev
```

## License

MIT 