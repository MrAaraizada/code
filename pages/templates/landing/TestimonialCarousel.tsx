import React from 'react';

interface TestimonialCarouselProps {
  children?: React.ReactNode;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default TestimonialCarousel;
