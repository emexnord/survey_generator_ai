'use client'

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Service {
    title: string;
    description: string[];
}

interface AnimatedServiceDisplayProps {
    services: Service[];
}

const AnimatedServiceDisplay: React.FC<AnimatedServiceDisplayProps> = ({ services }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftIndicator, setShowLeftIndicator] = useState(false);
    const [showRightIndicator, setShowRightIndicator] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftIndicator(scrollLeft > 0);
            setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll whitespace-nowrap gap-4 py-4 px-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="inline-block bg-white/10 backdrop-blur-sm w-80 flex-shrink-0 p-6 rounded-xl shadow-lg"
                    >
                        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black ">{service.title}</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {service.description.map((desc, descIndex) => (
                                <li key={descIndex} className="text-sm text-gray-300">{desc}</li>
                            ))}
                        </ul>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-1 mt-5 rounded-full hover:opacity-90 transition">
                            Get Now
                        </button>
                    </div>
                ))}
            </div>
            {showLeftIndicator && (
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-lg transition-opacity duration-300"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
            )}
            {showRightIndicator && (
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full shadow-lg transition-opacity duration-300"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            )}

        </div>
    );
};

export default AnimatedServiceDisplay;