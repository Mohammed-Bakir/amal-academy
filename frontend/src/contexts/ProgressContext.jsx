import React, { createContext, useContext, useReducer } from 'react'

const ProgressContext = createContext()

// Initial state
const initialState = {
    courseProgress: {}, // { courseId: { progress: 75, completedLessons: [...] } }
    watchTime: {}, // { videoId: watchTimeInSeconds }
    bookmarks: {}, // { videoId: [{ timestamp, note }] }
    certificates: [], // [{ courseId, issuedAt, certificateId }]
}

// Action types
const PROGRESS_ACTIONS = {
    UPDATE_COURSE_PROGRESS: 'UPDATE_COURSE_PROGRESS',
    UPDATE_VIDEO_PROGRESS: 'UPDATE_VIDEO_PROGRESS',
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
    ADD_CERTIFICATE: 'ADD_CERTIFICATE',
    RESET_PROGRESS: 'RESET_PROGRESS',
    LOAD_PROGRESS: 'LOAD_PROGRESS',
}

// Reducer
const progressReducer = (state, action) => {
    switch (action.type) {
        case PROGRESS_ACTIONS.UPDATE_COURSE_PROGRESS:
            return {
                ...state,
                courseProgress: {
                    ...state.courseProgress,
                    [action.payload.courseId]: {
                        ...state.courseProgress[action.payload.courseId],
                        ...action.payload.progress,
                    },
                },
            }

        case PROGRESS_ACTIONS.UPDATE_VIDEO_PROGRESS:
            return {
                ...state,
                watchTime: {
                    ...state.watchTime,
                    [action.payload.videoId]: action.payload.watchTime,
                },
            }

        case PROGRESS_ACTIONS.ADD_BOOKMARK:
            const videoBookmarks = state.bookmarks[action.payload.videoId] || []
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    [action.payload.videoId]: [
                        ...videoBookmarks,
                        {
                            id: Date.now(),
                            timestamp: action.payload.timestamp,
                            note: action.payload.note,
                            createdAt: new Date().toISOString(),
                        },
                    ],
                },
            }

        case PROGRESS_ACTIONS.REMOVE_BOOKMARK:
            const updatedBookmarks = state.bookmarks[action.payload.videoId]?.filter(
                bookmark => bookmark.id !== action.payload.bookmarkId
            ) || []
            return {
                ...state,
                bookmarks: {
                    ...state.bookmarks,
                    [action.payload.videoId]: updatedBookmarks,
                },
            }

        case PROGRESS_ACTIONS.ADD_CERTIFICATE:
            return {
                ...state,
                certificates: [
                    ...state.certificates,
                    {
                        ...action.payload,
                        issuedAt: new Date().toISOString(),
                    },
                ],
            }

        case PROGRESS_ACTIONS.LOAD_PROGRESS:
            return {
                ...state,
                ...action.payload,
            }

        case PROGRESS_ACTIONS.RESET_PROGRESS:
            return initialState

        default:
            return state
    }
}

export const ProgressProvider = ({ children }) => {
    const [state, dispatch] = useReducer(progressReducer, initialState)

    // Load progress from localStorage on mount
    React.useEffect(() => {
        const savedProgress = localStorage.getItem('amal-progress')
        if (savedProgress) {
            try {
                const parsedProgress = JSON.parse(savedProgress)
                dispatch({ type: PROGRESS_ACTIONS.LOAD_PROGRESS, payload: parsedProgress })
            } catch (error) {
                console.error('Failed to load progress from localStorage:', error)
            }
        }
    }, [])

    // Save progress to localStorage whenever state changes
    React.useEffect(() => {
        localStorage.setItem('amal-progress', JSON.stringify(state))
    }, [state])

    // Update course progress
    const updateCourseProgress = (courseId, progress) => {
        dispatch({
            type: PROGRESS_ACTIONS.UPDATE_COURSE_PROGRESS,
            payload: { courseId, progress },
        })
    }

    // Update video watch time
    const updateVideoProgress = (videoId, watchTime) => {
        dispatch({
            type: PROGRESS_ACTIONS.UPDATE_VIDEO_PROGRESS,
            payload: { videoId, watchTime },
        })
    }

    // Add bookmark
    const addBookmark = (videoId, timestamp, note = '') => {
        dispatch({
            type: PROGRESS_ACTIONS.ADD_BOOKMARK,
            payload: { videoId, timestamp, note },
        })
    }

    // Remove bookmark
    const removeBookmark = (videoId, bookmarkId) => {
        dispatch({
            type: PROGRESS_ACTIONS.REMOVE_BOOKMARK,
            payload: { videoId, bookmarkId },
        })
    }

    // Add certificate
    const addCertificate = (courseId, certificateId) => {
        dispatch({
            type: PROGRESS_ACTIONS.ADD_CERTIFICATE,
            payload: { courseId, certificateId },
        })
    }

    // Get course progress
    const getCourseProgress = (courseId) => {
        return state.courseProgress[courseId] || { progress: 0, completedLessons: [] }
    }

    // Get video watch time
    const getVideoWatchTime = (videoId) => {
        return state.watchTime[videoId] || 0
    }

    // Get video bookmarks
    const getVideoBookmarks = (videoId) => {
        return state.bookmarks[videoId] || []
    }

    // Check if course is completed
    const isCourseCompleted = (courseId) => {
        const progress = getCourseProgress(courseId)
        return progress.progress >= 100
    }

    // Check if user has certificate for course
    const hasCertificate = (courseId) => {
        return state.certificates.some(cert => cert.courseId === courseId)
    }

    // Get total watch time across all videos
    const getTotalWatchTime = () => {
        return Object.values(state.watchTime).reduce((total, time) => total + time, 0)
    }

    // Get completed courses count
    const getCompletedCoursesCount = () => {
        return Object.values(state.courseProgress).filter(
            progress => progress.progress >= 100
        ).length
    }

    // Reset all progress (for logout)
    const resetProgress = () => {
        dispatch({ type: PROGRESS_ACTIONS.RESET_PROGRESS })
        localStorage.removeItem('amal-progress')
    }

    const value = {
        ...state,
        updateCourseProgress,
        updateVideoProgress,
        addBookmark,
        removeBookmark,
        addCertificate,
        getCourseProgress,
        getVideoWatchTime,
        getVideoBookmarks,
        isCourseCompleted,
        hasCertificate,
        getTotalWatchTime,
        getCompletedCoursesCount,
        resetProgress,
    }

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}

export const useProgress = () => {
    const context = useContext(ProgressContext)
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider')
    }
    return context
}