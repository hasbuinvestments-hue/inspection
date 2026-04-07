/**
 * Intelligent Image Compression Utility
 * Resizes and compresses images using the Canvas API.
 */
const ImageProcessor = {
    /**
     * Compresses a file into a high-quality JPEG blob.
     * @param {File} file The original file from input[type="file"]
     * @param {Object} options { maxWidth, maxHeight, quality }
     * @returns {Promise<File>} A Promise that resolves to the compressed File object
     */
    async compress(file, { maxWidth = 1200, maxHeight = 1200, quality = 0.7 } = {}) {
        // Only compress images
        if (!file.type.startsWith('image/')) return file;
        
        // Don't compress small images (e.g. icons, < 200KB)
        if (file.size < 200 * 1024) return file;

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                
                img.onload = () => {
                    // Calculate new dimensions while keeping aspect ratio
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= (maxWidth / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= (maxHeight / height);
                            height = maxHeight;
                        }
                    }

                    // Create canvas and draw image
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to Blob (JPEG format for best compression)
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error("Compression failed: Canvas empty"));
                            return;
                        }
                        
                        // Create a new File from the blob
                        const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        
                        // Only return compressed if it's actually smaller
                        resolve(compressedFile.size < file.size ? compressedFile : file);
                    }, 'image/jpeg', quality);
                };
                
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    }
};

window.ImageProcessor = ImageProcessor;

/**
 * Activity Tracker Utility
 * Records system events to the activity log.
 */
const ActivityTracker = {
    /**
     * Records an action in the system logs.
     * @param {string} actionType The type of action (e.g., 'inspection_start')
     * @param {string} description Human-readable description
     * @param {Object} metadata Extra context (business name, zone, etc.)
     */
    async log(actionType, description, metadata = {}) {
        // Only log if we have a profile (user is logged in)
        if (!window.CURRENT_PROFILE) return;

        // Reuse the auth client that already holds the active session
        // Fall back to creating one if _authSupabase isn't available yet
        const client = window._authSupabase ||
            window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);

        try {
            await client
                .from('system_activity_logs')
                .insert({
                    user_id:     window.CURRENT_USER?.id,
                    user_name:   window.CURRENT_PROFILE.full_name,
                    action_type: actionType,
                    description: description,
                    zone:        window.CURRENT_PROFILE.zone || 'Global',
                    metadata:    metadata
                });
        } catch (err) {
            // Never let logging crash the app
            console.warn('Activity log failed silently:', err.message);
        }
    }
};

window.ActivityTracker = ActivityTracker;
