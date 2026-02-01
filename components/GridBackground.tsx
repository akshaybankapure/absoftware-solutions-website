import React from 'react';

const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Subtle Radial Fade to focus center */}
            <div className="absolute inset-0 bg-brand-dark [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,#050505_100%)]"></div>

            {/* Optional: subtle noise grain for texture (premium feel) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default GridBackground;
