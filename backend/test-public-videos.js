import fetch from 'node-fetch';

async function testPublicVideos() {
    try {
        // Test getting videos for the course without auth
        const response = await fetch('http://localhost:5003/api/videos/course/6886cfb0d9b7cdac38c8be99/public');
        const data = await response.json();
        console.log('Public Videos Response:', JSON.stringify(data, null, 2));

        if (data.success && data.videos.length > 0) {
            console.log('\nFirst video details:');
            console.log('- Title:', data.videos[0].title);
            console.log('- Slug:', data.videos[0].slug);
            console.log('- ID:', data.videos[0]._id);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testPublicVideos();