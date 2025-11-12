"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-amber-50 to-purple-100"></div>
        <div className="animated-bg"></div>
        <div className="animated-bg-2"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-purple-500 via-rose-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm animate-slideDown">
            Sangeet Night
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 md:w-24 bg-linear-to-r from-transparent to-purple-400 animate-expand-left"></div>
            <p className="text-xl md:text-2xl text-purple-700 font-serif animate-pulse-subtle">
              ✦
            </p>
            <div className="h-px w-12 md:w-24 bg-linear-to-l from-transparent to-purple-400 animate-expand-right"></div>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            <p className="text-lg md:text-2xl text-[#9a5658] font-semibold animate-slideUp font-[cursive]">
              Prashanth & Nancy
            </p>
            <p className="text-base md:text-lg text-gray-600 italic animate-slideUp-delay-1">
              Join us for an evening of music, dance, and love
            </p>
            <p className="text-base md:text-lg text-gray-700 font-medium animate-slideUp-delay-2">
              Tap the card to reveal the celebration details
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-3xl animate-slideUp-delay-3">
              <span className="animate-bounce-subtle">🎶</span>
              <span className="animate-bounce-subtle delay-100">💃</span>
              <span className="animate-bounce-subtle delay-200">🪩</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto animate-fadeIn">
          <InvitationCard
            title="Sangeet Night"
            image="/images/sangeet-image.png"
            gradient="from-purple-500 via-pink-500 to-rose-500"
            date="November 22, 2025"
            time="7:00 PM"
            venue="Flag's Banquet Liberty Garden"
            description="An evening filled with soulful music, mesmerizing performances, and unforgettable celebrations with our loved ones."
            emoji="🎵"
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
            audioSrc="/music/sangeet-music.mp3"
            videoSrc="/video/sangeet-video.mp4"
            venueLink="https://share.google/F6SFW4f1yEs2wAwrR"
            className="w-full!"
          />
        </div>
      </div>
    </main>
  );
}

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/screen-image.png"
          alt="Sangeet Celebration"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/70 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/30 via-rose-400/30 to-amber-300/30"></div>
      <div className="sparkles">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="relative mb-8">
          <div className="animate-scaleIn relative z-10">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white/95 backdrop-blur-md rounded-[50%] flex items-center justify-center shadow-2xl p-4 overflow-hidden rotate-in">
              <Image
                src="/images/logo.jpg"
                alt="Wedding Logo"
                width={256}
                height={256}
                className="w-full h-full object-contain rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 animate-fadeIn">
          <p className="text-xl md:text-2xl text-white/90 font-serif italic animate-bounce-subtle">
            Get ready to dance the night away
          </p>
        </div>
      </div>
    </div>
  );
}

function InvitationCard({
  title,
  image,
  gradient,
  date,
  time,
  venue,
  description,
  emoji,
  isExpanded,
  onToggle,
  audioSrc,
  videoSrc,
  venueLink,
  className,
}: {
  title: string;
  image: string;
  gradient: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  emoji: string;
  isExpanded: boolean;
  onToggle: () => void;
  audioSrc?: string;
  videoSrc?: string;
  venueLink?: string;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (audioSrc && !audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, [audioSrc]);

  useEffect(() => {
    const audioEl = audioRef.current;
    const videoEl = videoRef.current;

    if (isExpanded) {
      if (videoEl && videoSrc) {
        videoEl.loop = true;
        videoEl.play().catch((err) => console.log("Video play failed:", err));
      }
      if (audioEl) {
        audioEl.play().catch((err) => console.log("Audio play failed:", err));
      }
    } else {
      if (videoEl && videoSrc) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    }
  }, [isExpanded, videoSrc]);

  useEffect(() => {
    const audioEl = audioRef.current;
    const videoEl = videoRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    };
  }, []);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 cursor-pointer animate-slideUp ${
        isExpanded ? "scale-[1.02]" : "hover:scale-[1.02]"
      }`}
      onClick={onToggle}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${
          isExpanded ? "opacity-10" : ""
        }`}
      ></div>

      <div className="relative bg-white rounded-3xl overflow-hidden">
        <div
          className={`relative overflow-hidden transition-all duration-700 ${
            isExpanded ? "h-100" : "h-100"
          }`}
        >
          {videoSrc ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  isExpanded ? "opacity-0 scale-105" : "opacity-100"
                } h-full mx-auto ${className}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized
              />
              <video
                ref={videoRef}
                src={videoSrc}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                muted
                playsInline
                poster={image}
                preload="metadata"
              />
            </>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-110 h-full mx-auto ${className}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          )}
          <div
            className={`absolute inset-0 bg-linear-to-t ${gradient} transition-opacity duration-500 ${
              isExpanded && videoSrc
                ? "opacity-30"
                : isExpanded
                ? "opacity-50"
                : "opacity-60 group-hover:opacity-70"
            }`}
          ></div>

          <div className="absolute inset-0 flex items-end p-6 md:p-8">
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="text-5xl md:text-6xl mb-2 animate-bounce-subtle">
                  {emoji}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {title}
                </h2>
              </div>

              <div className="flex items-center gap-3 ml-4">
                {isExpanded && (audioSrc || videoSrc) && (
                  <div className="flex items-center gap-1 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    <div className="music-bars">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center transition-transform duration-500 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <span className="text-2xl text-white">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 md:p-8 relative bg-white">
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${gradient} opacity-10 rounded-bl-full`}
            ></div>

            <p className="text-gray-600 italic mb-6 text-sm md:text-base animate-fadeIn">
              {description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 animate-slideIn-delay-1">
                <div
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <span className="text-white text-xl">📅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Date
                  </p>
                  <p className="font-bold text-gray-800 text-lg">{date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 animate-slideIn-delay-2">
                <div
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <span className="text-white text-xl">⏰</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Time
                  </p>
                  <p className="font-bold text-gray-800 text-lg">{time}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 animate-slideIn-delay-3">
                <div
                  className={`w-12 h-12 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <span className="text-white text-xl">📍</span>
                </div>
                <div className="sm:w-full w-[74%]">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Venue
                  </p>
                  <p className="font-bold text-gray-800 text-lg">{venue}</p>
                  {venueLink && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        window.open(venueLink, "_blank", "noopener,noreferrer");
                      }}
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>Open Venue Link</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
