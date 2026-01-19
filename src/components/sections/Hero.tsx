import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useResumeDownload } from '../../hooks/useResumeDownload';

interface HeroProps {
  onAnimationComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAnimationComplete }) => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {  isDownloading, error } = useResumeDownload();
  const [showError, setShowError] = useState(false);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href =
      'https://drive.google.com/uc?export=download&id=1VWQmo9KR_dD9uTlbALIArRiCD4oxPaxW';
    link.setAttribute('download', 'Walid_Rahman_Rajdee_Resume.pdf');
    link.setAttribute('target', '_blank'); // Opens in new tab if download is blocked
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Show error message temporarily
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Hide error after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  // GSAP Hero Animation Timeline
  useEffect(() => {
    if (!heroRef.current || prefersReducedMotion) {
      // If reduced motion is preferred, just make everything visible immediately
      if (heroRef.current) {
        gsap.set(heroRef.current.querySelectorAll('.animate-element'), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }
      onAnimationComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onAnimationComplete?.(),
      });

      // Set initial states
      gsap.set('.hero-badge', { opacity: 0, y: -20 });
      gsap.set('.hero-title', { opacity: 0, y: 30 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
      gsap.set('.hero-description', { opacity: 0, y: 20 });
      gsap.set('.hero-buttons', { opacity: 0, y: 20 });
      gsap.set('.hero-image', { opacity: 0, scale: 0.8 });
      gsap.set('.floating-icon', { opacity: 0, scale: 0 });

      // Animation sequence
      tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
        .to(
          '.hero-title',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          '.hero-subtitle',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          '.hero-description',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          '.hero-buttons',
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          '.hero-image',
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
          },
          '-=0.6'
        )
        .to(
          '.floating-icon',
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(2)',
          },
          '-=0.4'
        );

      // Continuous floating animation for icons
      gsap.to('.floating-icon-1', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.floating-icon-2', {
        y: -8,
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to('.floating-icon-3', {
        y: -12,
        duration: 1.8,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onAnimationComplete]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      role="banner"
      aria-label="Hero section - Introduction and main call to action"
    >
      <div className="container mx-auto px-6 py-20 max-w-full w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-full overflow-x-hidden">
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            {/* Welcome Badge */}
            <div
              className="hero-badge animate-element inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6"
              role="status"
              aria-label="Current availability status"
            >
              <span
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                aria-hidden="true"
              ></span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for work
              </span>
            </div>

            {/* Name and Title */}
            <h1 className="hero-title animate-element text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I'm <span className="text-blue-600">Walid Rahman Rajdee</span>
            </h1>

            <h2 className="hero-subtitle animate-element text-2xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-6">
              MERN Stack Developer •{' '}
              <span className="text-blue-600">Frontend Specialist</span>
            </h2>

            <p className="hero-description animate-element text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl lg:mx-0 mx-auto">
              I build scalable web applications with the **MERN** stack. My core
              expertise lies in crafting **high-performance React interfaces**
              that are clean, responsive, and user-centric. I bridge the gap
              between complex backend architecture and seamless user
              experiences.
            </p>

            {/* Action Buttons */}
            <div className="hero-buttons animate-element flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleResumeDownload}
                disabled={isDownloading}
                className={`px-8 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 focus-ring ${
                  isDownloading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white glow-effect'
                }`}
                aria-label="Download my resume as PDF"
                aria-describedby={showError ? 'download-error' : undefined}
              >
                {isDownloading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Downloading...
                  </span>
                ) : (
                  'Download Resume'
                )}
              </button>
              <button
                onClick={() => {
                  window.location.hash = 'contact';
                }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300 focus-ring"
                aria-label="Navigate to contact section to get in touch"
              >
                Get In Touch
              </button>
            </div>

            {/* Error Message */}
            {showError && (
              <div
                id="download-error"
                className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                role="alert"
                aria-live="polite"
              >
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {error} - Please try again or contact me directly.
                </p>
              </div>
            )}
          </div>

          {/* Hero Image */}
          {/* Hero Image */}
          <div className="lg:w-1/2 flex justify-center overflow-hidden sm:overflow-visible">
            <div className="relative">
              {/* Profile Image */}
              <div
                className="hero-image animate-element w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-2"
                role="img"
                aria-label="Professional profile photo of Walid Rahman Rajdee"
              >
                <img
                  src="/assets/profile.png"
                  alt="Walid Rahman Rajdee - MERN Stack Developer"
                  className="w-full h-full object-cover rounded-full bg-white dark:bg-gray-900"
                />
              </div>

              {/* Floating Tech Icons */}
              {/* 1. The "Big" React Icon - Top Right */}
              <div
                className="floating-icon floating-icon-1 absolute -top-6 -right-6 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center hidden sm:block"
                title="React.js Specialist"
              >
                <svg
                  className="w-10 h-10 text-[#61DAFB] animate-[spin_15s_linear_infinite]"
                  viewBox="-11.5 -10.23174 23 20.46348"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
              </div>

              {/* 2. Tailwind/CSS Icon - Left Middle */}
              <div
                className="floating-icon floating-icon-2 absolute top-1/2 -left-10 w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hidden sm:block"
                title="Tailwind CSS"
              >
                <svg
                  className="w-8 h-8 text-[#38BDF8]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg>
              </div>

              {/* 3. JavaScript/Node Icon - Bottom Left */}
              <div
                className="floating-icon floating-icon-3 absolute -bottom-6 left-1/4 w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hidden sm:block"
                title="JavaScript Expert"
              >
                <svg
                  className="w-8 h-8 text-[#F7DF1E]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0V0zm22.034 18.268c-.175-1.117-.829-1.921-1.968-2.317-.604-.191-1.222-.245-1.841-.218-.456.02-.911.11-1.341.272.235.45.426.917.57 1.402.131.423.218.857.26 1.296.536-.184 1.054-.42 1.547-.704.148-.088.293-.184.433-.287.114-.144.201-.307.254-.482.046-.144.062-.294.046-.444zm-11.832.228c.032.551.152 1.092.355 1.61.263.666.69 1.254 1.238 1.706.745.584 1.673.884 2.613.844 1.139-.01 2.215-.558 2.9-1.482.261-.34.464-.72.6-1.127.136-.39.204-.8.204-1.211 0-.613-.153-1.215-.443-1.748-.48-.887-1.334-1.492-2.319-1.642-.321-.051-.645-.077-.97-.077-.736 0-1.458.214-2.071.613-.672.433-1.196 1.055-1.503 1.791-.144.341-.211.706-.204 1.073z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
