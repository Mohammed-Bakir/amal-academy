import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize,
    FiSkipBack, FiSkipForward, FiSettings, FiBookmark, FiEdit3,
    FiDownload, FiList, FiCheck, FiLock, FiArrowLeft, FiArrowRight
} from 'react-icons/fi'
import { useLanguage } from '@contexts/LanguageContext'
import { useAuth } from '@contexts/AuthContext'
import LoadingSpinner from '@components/common/LoadingSpinner'
import VideoPlayerComponent from '@components/video/VideoPlayer'
import Header from '@components/layout/Header'
import api from '@services/api'

// Most compatible video placeholder for all lessons
const PLACEHOLDER_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

// Mock course data with video lessons
const mockCourseData = {
    1: {
        id: 1,
        title: { en: 'Introduction to Programming', ar: 'مقدمة في البرمجة' },
        lessons: [
            {
                id: 1,
                title: { en: 'Welcome to Programming', ar: 'مرحباً بك في البرمجة' },
                duration: 300, // 5 minutes in seconds
                videoUrl: PLACEHOLDER_VIDEO_URL,
                completed: false,
                notes: '',
                bookmarks: [],
                resources: [
                    { name: 'Lesson Slides', url: '/api/placeholder/slides1.pdf' },
                    { name: 'Code Examples', url: '/api/placeholder/code1.zip' }
                ]
            },
            {
                id: 2,
                title: { en: 'Setting up Development Environment', ar: 'إعداد بيئة التطوير' },
                duration: 900, // 15 minutes
                videoUrl: PLACEHOLDER_VIDEO_URL,
                completed: false,
                notes: '',
                bookmarks: [],
                resources: [
                    { name: 'Installation Guide', url: '/api/placeholder/guide.pdf' }
                ]
            },
            {
                id: 3,
                title: { en: 'Your First Program', ar: 'برنامجك الأول' },
                duration: 1500, // 25 minutes
                videoUrl: PLACEHOLDER_VIDEO_URL,
                completed: false,
                notes: '',
                bookmarks: [],
                resources: [
                    { name: 'Starter Code', url: '/api/placeholder/starter.zip' }
                ]
            }
        ]
    }
}

const VideoPlayer = () => {
    const { courseSlug, videoSlug } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { isArabic } = useLanguage()
    const { user } = useAuth()

    const videoRef = useRef(null)
    const [course, setCourse] = useState(null)
    const [currentLesson, setCurrentLesson] = useState(null)
    const [loading, setLoading] = useState(true)

    // Video player state
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [showControls, setShowControls] = useState(true)
    const [showSettings, setShowSettings] = useState(false)

    // Learning features state
    const [showNotes, setShowNotes] = useState(false)
    const [notes, setNotes] = useState('')
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true)

                // Fetch course details by slug using proxy
                const courseResponse = await fetch(`/api/courses/slug/${courseSlug}`)
                const courseResponseData = await courseResponse.json()
                if (courseResponseData.success) {
                    const courseData = courseResponseData.course

                    // Fetch course videos using proxy for public access
                    let videosResponse;
                    try {
                        // Use proxy for public video access to avoid CORS issues
                        const videoUrl = `/api/videos/course/${courseData._id}/public`;
                        console.log('Fetching videos from:', videoUrl);
                        const response = await fetch(videoUrl);
                        const videosData = await response.json();
                        console.log('Videos API response:', videosData);
                        videosResponse = { data: videosData };
                    } catch (error) {
                        console.log('Failed to fetch videos:', error.message)
                        // Fallback to empty videos
                        videosResponse = { data: { success: false, videos: [] } };
                    }

                    if (videosResponse.data.success) {
                        const videos = videosResponse.data.videos

                        // Structure the data similar to mockCourseData
                        const structuredCourse = {
                            id: courseData._id,
                            title: {
                                en: courseData.title,
                                ar: courseData.titleArabic || courseData.title
                            },
                            lessons: videos.map(video => ({
                                id: video._id,
                                slug: video.slug,
                                title: {
                                    en: video.title,
                                    ar: video.titleArabic || video.title
                                },
                                duration: video.duration,
                                videoUrl: video.videoUrl,
                                completed: false, // TODO: Get from user progress
                                notes: '',
                                bookmarks: [],
                                resources: video.attachments || []
                            }))
                        }

                        setCourse(structuredCourse)

                        // Find current lesson by slug
                        console.log('Looking for video:', videoSlug)
                        console.log('Available lessons:', structuredCourse.lessons.map(l => ({ id: l.id, slug: l.slug, title: l.title.en })))
                        const lesson = structuredCourse.lessons.find(l => l.slug === videoSlug || l.id === videoSlug)
                        console.log('Found lesson:', lesson)
                        if (lesson) {
                            setCurrentLesson(lesson)
                            setNotes(lesson.notes || '')
                            setBookmarks(lesson.bookmarks || [])
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch course data:', error)
                // Fallback to mock data
                const courseData = mockCourseData[courseSlug]
                if (courseData) {
                    setCourse(courseData)
                    const lesson = courseData.lessons.find(l => l.slug === videoSlug || l.id === parseInt(videoSlug))
                    if (lesson) {
                        setCurrentLesson(lesson)
                        setNotes(lesson.notes || '')
                        setBookmarks(lesson.bookmarks || [])
                    }
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCourseData()
    }, [courseSlug, videoSlug])

    // Video event handlers
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        const time = pos * duration
        if (videoRef.current) {
            videoRef.current.currentTime = time
            setCurrentTime(time)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const changePlaybackRate = (rate) => {
        setPlaybackRate(rate)
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
        }
        setShowSettings(false)
    }

    const skipTime = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds
        }
    }

    const addBookmark = () => {
        const bookmark = {
            id: Date.now(),
            time: currentTime,
            note: `Bookmark at ${formatTime(currentTime)}`
        }
        setBookmarks([...bookmarks, bookmark])
    }

    const goToLesson = (lessonSlug) => {
        navigate(`/watch/${courseSlug}/${lessonSlug}`)
    }

    const markAsComplete = () => {
        // Handle lesson completion
        console.log('Lesson marked as complete')
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <LoadingSpinner size="large" />
            </div>
        )
    }

    if (!course || !currentLesson) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        {isArabic ? 'الدرس غير موجود' : 'Lesson Not Found'}
                    </h2>
                    <button
                        onClick={() => navigate(`/courses/${courseSlug}`)}
                        className="btn btn-primary"
                    >
                        {isArabic ? 'العودة للدورة' : 'Back to Course'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 64px)' }}>
                {/* Video Player Section */}
                <div className="flex-1 flex flex-col">
                    {/* Video Container */}
                    <div className="flex-1 min-h-0">
                        <VideoPlayerComponent
                            videoUrl={currentLesson.videoUrl}
                            onTimeUpdate={(time) => {
                                setCurrentTime(time)
                                // TODO: Save progress to backend
                            }}
                            onEnded={() => {
                                // TODO: Mark lesson as completed
                                markAsComplete()
                            }}
                            className="w-full h-full"
                            autoPlay={false}
                        />
                    </div>

                    {/* Lesson Info */}
                    <div className="bg-gray-900 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <button
                                    onClick={() => navigate(`/courses/${courseSlug}`)}
                                    className="btn btn-ghost btn-sm text-gray-400 hover:text-white"
                                >
                                    <FiArrowLeft className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
                                    {isArabic ? 'العودة للدورة' : 'Back to Course'}
                                </button>
                                <h2 className="text-xl font-semibold">
                                    {currentLesson.title[isArabic ? 'ar' : 'en']}
                                </h2>
                            </div>
                            <button
                                onClick={markAsComplete}
                                className="btn btn-primary btn-sm"
                            >
                                <FiCheck className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {isArabic ? 'تحديد كمكتمل' : 'Mark Complete'}
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-400">
                            <span>{course.title[isArabic ? 'ar' : 'en']}</span>
                            <span>•</span>
                            <span>{formatTime(currentLesson.duration)}</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 bg-gray-900 flex flex-col">
                    {/* Sidebar Tabs */}
                    <div className="flex border-b border-gray-700">
                        <button
                            onClick={() => setShowPlaylist(true)}
                            className={`flex-1 px-4 py-3 text-sm font-medium ${showPlaylist ? 'text-primary-400 border-b-2 border-primary-400' : 'text-gray-400'
                                }`}
                        >
                            <FiList className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                            {isArabic ? 'قائمة الدروس' : 'Playlist'}
                        </button>
                        <button
                            onClick={() => setShowPlaylist(false)}
                            className={`flex-1 px-4 py-3 text-sm font-medium ${!showPlaylist ? 'text-primary-400 border-b-2 border-primary-400' : 'text-gray-400'
                                }`}
                        >
                            <FiEdit3 className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                            {isArabic ? 'الملاحظات' : 'Notes'}
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto">
                        {showPlaylist ? (
                            /* Playlist */
                            <div className="p-4">
                                <h3 className="font-semibold mb-4">
                                    {course.title[isArabic ? 'ar' : 'en']}
                                </h3>
                                <div className="space-y-2">
                                    {course.lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            onClick={() => goToLesson(lesson.id)}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${lesson.id === currentLesson.id
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">
                                                    {index + 1}. {lesson.title[isArabic ? 'ar' : 'en']}
                                                </span>
                                                {lesson.completed && (
                                                    <FiCheck className="w-4 h-4 text-green-400" />
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {formatTime(lesson.duration)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Resources */}
                                {currentLesson.resources.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-medium mb-3">
                                            {isArabic ? 'الموارد' : 'Resources'}
                                        </h4>
                                        <div className="space-y-2">
                                            {currentLesson.resources.map((resource, index) => (
                                                <a
                                                    key={index}
                                                    href={resource.url}
                                                    className="flex items-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                                                >
                                                    <FiDownload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                                    <span className="text-sm">{resource.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Notes */
                            <div className="p-4">
                                <h3 className="font-semibold mb-4">
                                    {isArabic ? 'ملاحظاتي' : 'My Notes'}
                                </h3>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder={isArabic ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...'}
                                    className="w-full h-40 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-primary-500"
                                />

                                {/* Bookmarks */}
                                {bookmarks.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-medium mb-3">
                                            {isArabic ? 'الإشارات المرجعية' : 'Bookmarks'}
                                        </h4>
                                        <div className="space-y-2">
                                            {bookmarks.map((bookmark) => (
                                                <div
                                                    key={bookmark.id}
                                                    onClick={() => {
                                                        if (videoRef.current) {
                                                            videoRef.current.currentTime = bookmark.time
                                                        }
                                                    }}
                                                    className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="text-sm text-primary-400">
                                                        {formatTime(bookmark.time)}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {bookmark.note}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer