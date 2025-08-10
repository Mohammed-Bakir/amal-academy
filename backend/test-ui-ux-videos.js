import fetch from 'node-fetch';

async function testUIUXVideos() {
    try {
        // Get UI/UX course
        const response = await fetch('http://localhost:5003/api/courses/slug/ui-ux-design');
        const data = await response.json();

        if (data.success) {
            console.log('Course ID:', data.course._id);

            // Test videos API
            const videosResponse = await fetch(`http://localhost:5003/api/videos/course/${data.course._id}/public`);
            const videosData = await videosResponse.json();

            console.log('Videos Response:', videosData.success ? `${videosData.videos.length} videos` : 'Failed');
            if (!videosData.success) {
                console.log('Videos Error:', videosData.message);
            } else {
                videosData.videos.forEach(video => {
                    console.log(`- ${video.title} (${video.slug})`);
                });
            }
        } else {
            console.log('Course Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testUIUXVideos();