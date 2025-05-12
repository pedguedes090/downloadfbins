// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Show loading spinner
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Show error message
function showError(message) {
    alert(message);
}

// Format time remaining
function formatTimeRemaining(minutes) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

// Download Facebook video
async function downloadFacebook() {
    const url = document.getElementById('fbUrl').value.trim();
    if (!url) {
        showError('Please enter a Facebook video URL');
        return;
    }

    showLoading();
    try {
        const response = await fetch('/api/facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }

        // Display preview
        const previewContainer = document.getElementById('fbPreview');
        previewContainer.innerHTML = `
            <video controls>
                <source src="${data.data.localUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>Title: ${data.data.title}</p>
            <div class="download-options">
                <a href="${data.data.localUrl}" download="${data.data.filename}" class="download-btn">
                    <i class="fas fa-download"></i> Download Video
                </a>
                <div class="expiry-notice">
                    <i class="fas fa-clock"></i> File will be deleted in ${data.data.expiresIn}
                </div>
            </div>
        `;
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Download Instagram content
async function downloadInstagram() {
    const url = document.getElementById('igUrl').value.trim();
    if (!url) {
        showError('Please enter an Instagram post URL');
        return;
    }

    showLoading();
    try {
        const response = await fetch('/api/instagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }

        // Display preview
        const previewContainer = document.getElementById('igPreview');
        previewContainer.innerHTML = '';

        data.data.media_details.forEach((media, index) => {
            const mediaElement = media.type === 'video' 
                ? `<video controls>
                    <source src="${media.localUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                   </video>`
                : `<img src="${media.localUrl}" alt="Instagram image">`;

            previewContainer.innerHTML += `
                <div class="media-item">
                    ${mediaElement}
                    <div class="download-options">
                        <a href="${media.localUrl}" download="${media.filename}" class="download-btn">
                            <i class="fas fa-download"></i> Download ${media.type}
                        </a>
                        <div class="expiry-notice">
                            <i class="fas fa-clock"></i> File will be deleted in ${media.expiresIn}
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
} 