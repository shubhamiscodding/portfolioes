import React, { useState, useRef, useEffect } from 'react';

const FadeInSection = ({ children, className = '', threshold = 0.1, duration = 0.4 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      ref={domRef}
      style={{
        '--animation-duration': `${duration}s`
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
