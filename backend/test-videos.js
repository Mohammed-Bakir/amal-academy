import fetch from 'node-fetch';

async function testVideos() {
    try {
        // Test getting videos for the course
        const response = await fetch('http://localhost:5003/api/videos/course/6886b2682c734d66c9f7459d', {
            headers: {
                'Authorization': 'Bearer test-token' // We'll need proper auth
            }
        });
        const data = await response.json();
        console.log('Videos Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testVideos();