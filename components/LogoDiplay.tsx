import Image from 'next/image';
import React from 'react';

interface Image {
    src: string;
    alt: string;
}

interface LogoDisplayProps {
    images: Image[];
}

function LogoDisplay({ images }: LogoDisplayProps) {
    return (
        <div className="flex justify-evenly items-center gap-4 bg-white/10 backdrop-blur-sm my-36 mx-8 p-8 rounded-xl">
            {images.map((image, index) => (
                <div key={index} className=" w-36">
                    <Image src={image.src} alt={image.alt} />
                </div>
            ))}
        </div>
    );
}

export default LogoDisplay;
