import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  className = '',
  typingSpeed = 50,
  startDelay = 500
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, typingSpeed);
      }
    };

    // Start typing after the delay
    timeoutId = setTimeout(typeNextChar, startDelay);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, typingSpeed, startDelay]); // Dependencies array

  return (
    <p className={className}>
      {displayedText}
      <span className="typing-cursor">|</span>
    </p>
  );
};

export default TypingText; 