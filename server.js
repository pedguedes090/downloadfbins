const express = require('express');
const cors = require('cors');
const { getFbVideoInfo } = require('fb-downloader-scrapper');
const { instagramGetUrl } = require('instagram-url-direct');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Use /tmp directory for downloads
const downloadsDir = path.join(os.tmpdir(), 'social-media-downloader');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
}

// Serve files from /tmp directory
app.use('/downloads', express.static(downloadsDir));

// Store file deletion timers
const fileTimers = new Map();

// Function to schedule file deletion
function scheduleFileDeletion(filename) {
    // Clear existing timer if any
    if (fileTimers.has(filename)) {
        clearTimeout(fileTimers.get(filename));
    }

    // Set new timer for 5 minutes
    const timer = setTimeout(() => {
        const filePath = path.join(downloadsDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${filename}:`, err);
                } else {
                    console.log(`File ${filename} deleted after 5 minutes`);
                }
            });
        }
        fileTimers.delete(filename);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    fileTimers.set(filename, timer);
}

// Helper function to download file
async function downloadFile(url, filename) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    const filePath = path.join(downloadsDir, filename);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            // Schedule file deletion after successful download
            scheduleFileDeletion(filename);
            resolve(filename);
        });
        writer.on('error', reject);
    });
}

// Facebook download endpoint
app.post('/api/facebook', async (req, res) => {
    try {
        const { url } = req.body;
        const result = await getFbVideoInfo(url);
        
        // Download the video
        const filename = `fb_${Date.now()}.mp4`;
        const downloadedFilename = await downloadFile(result.hd || result.sd, filename);
        
        res.json({
            success: true,
            data: {
                ...result,
                filename: downloadedFilename,
                localUrl: `/downloads/${downloadedFilename}`,
                expiresIn: '5 minutes'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Instagram download endpoint
app.post('/api/instagram', async (req, res) => {
    try {
        const { url } = req.body;
        const result = await instagramGetUrl(url);
        
        const downloadedFiles = [];
        
        // Download all media files
        for (let i = 0; i < result.media_details.length; i++) {
            const media = result.media_details[i];
            const extension = media.type === 'video' ? '.mp4' : '.jpg';
            const filename = `ig_${Date.now()}_${i}${extension}`;
            const downloadedFilename = await downloadFile(media.url, filename);
            downloadedFiles.push({
                ...media,
                filename: downloadedFilename,
                localUrl: `/downloads/${downloadedFilename}`,
                expiresIn: '5 minutes'
            });
        }
        
        res.json({
            success: true,
            data: {
                ...result,
                media_details: downloadedFiles
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Cleanup function to remove all files and timers on server shutdown
process.on('SIGINT', () => {
    console.log('Cleaning up files before shutdown...');
    fileTimers.forEach((timer) => clearTimeout(timer));
    fileTimers.clear();
    
    fs.readdir(downloadsDir, (err, files) => {
        if (err) {
            console.error('Error reading downloads directory:', err);
            process.exit(1);
        }
        
        files.forEach(file => {
            fs.unlink(path.join(downloadsDir, file), err => {
                if (err) console.error(`Error deleting file ${file}:`, err);
            });
        });
        
        process.exit(0);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Temporary files will be stored in: ${downloadsDir}`);
}); 