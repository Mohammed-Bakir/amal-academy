import fetch from 'node-fetch';

async function testCoursesAPI() {
    try {
        const response = await fetch('http://localhost:5003/api/courses');
        const data = await response.json();
        console.log('Courses API Response:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log(`\nFound ${data.courses.length} courses:`);
            data.courses.forEach(course => {
                console.log(`- ${course.title} (${course.slug})`);
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testCoursesAPI();