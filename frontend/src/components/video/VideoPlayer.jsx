import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize,
    FiSkipBack, FiSkipForward, FiSettings
} from 'react-icons/fi'

const VideoPlayer = ({
    videoUrl,
    onTimeUpdate,
    onProgress,
    onEnded,
    className = "",
    autoPlay = false
}) => {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const controlsTimeoutRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [showControls, setShowControls] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const [isBuffering, setIsBuffering] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleTimeUpdate = () => {
            const time = video.currentTime
            setCurrentTime(time)
            onTimeUpdate?.(time)
        }

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
        }

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleEnded = () => {
            setIsPlaying(false)
            onEnded?.()
        }

        const handleWaiting = () => setIsBuffering(true)
        const handleCanPlay = () => setIsBuffering(false)

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1)
                const progress = (bufferedEnd / video.duration) * 100
                onProgress?.(progress)
            }
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('loadedmetadata', handleLoadedMetadata)
        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)
        video.addEventListener('ended', handleEnded)
        video.addEventListener('waiting', handleWaiting)
        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('progress', handleProgress)

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
            video.removeEventListener('ended', handleEnded)
            video.removeEventListener('waiting', handleWaiting)
            video.removeEventListener('canplay', handleCanPlay)
            video.removeEventListener('progress', handleProgress)
        }
    }, [onTimeUpdate, onProgress, onEnded])

    useEffect(() => {
        if (autoPlay && videoRef.current) {
            videoRef.current.play()
        }
    }, [autoPlay])

    // Handle controls visibility with proper timeout
    const showControlsWithTimeout = () => {
        setShowControls(true)

        // Clear existing timeout
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
        }

        // Set new timeout to hide controls after 3 seconds of inactivity
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false)
            }
        }, 3000)
    }

    const handleMouseMove = () => {
        showControlsWithTimeout()
    }

    const handleMouseLeave = () => {
        // Clear timeout when mouse leaves
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
        }

        // Hide controls after a short delay if playing
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false)
            }, 1000)
        }
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current)
            }
        }
    }, [])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div
            ref={containerRef}
            className={`relative bg-black group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                className="w-full h-full"
                onClick={togglePlay}
                style={{ objectFit: 'contain' }}
                preload="metadata"
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support video playback
            </video>

            {/* Loading Spinner */}
            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Play Button Overlay */}
            {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4 transition-all duration-200"
                    >
                        <FiPlay className="w-12 h-12 text-white ml-1" />
                    </button>
                </div>
            )}

            {/* Video Controls */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={() => {
                    setShowControls(true)
                    if (controlsTimeoutRef.current) {
                        clearTimeout(controlsTimeoutRef.current)
                    }
                }}
                onMouseLeave={handleMouseLeave}
            >
                {/* Progress Bar */}
                <div
                    className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-primary-600 rounded-full transition-all duration-100"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={togglePlay} className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
                            {isPlaying ? <FiPause className="w-6 h-6 text-white" /> : <FiPlay className="w-6 h-6 text-white" />}
                        </button>

                        <button onClick={() => skipTime(-10)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
                            <FiSkipBack className="w-5 h-5 text-white" />
                        </button>

                        <button onClick={() => skipTime(10)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
                            <FiSkipForward className="w-5 h-5 text-white" />
                        </button>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button onClick={toggleMute} className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
                                {isMuted ? <FiVolumeX className="w-5 h-5 text-white" /> : <FiVolume2 className="w-5 h-5 text-white" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 accent-primary-600"
                            />
                        </div>

                        <span className="text-sm text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded"
                            >
                                <FiSettings className="w-5 h-5 text-white" />
                            </button>

                            {showSettings && (
                                <div className="absolute bottom-12 right-0 bg-gray-800 rounded-lg p-2 min-w-32">
                                    <div className="text-sm font-medium mb-2 text-white">
                                        Playback Speed
                                    </div>
                                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                        <button
                                            key={rate}
                                            onClick={() => changePlaybackRate(rate)}
                                            className={`block w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded text-white ${playbackRate === rate ? 'text-primary-400' : ''
                                                }`}
                                        >
                                            {rate}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={toggleFullscreen} className="p-2 hover:bg-white hover:bg-opacity-20 rounded">
                            {isFullscreen ? <FiMinimize className="w-5 h-5 text-white" /> : <FiMaximize className="w-5 h-5 text-white" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer