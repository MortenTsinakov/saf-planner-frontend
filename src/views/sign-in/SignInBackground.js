import { useState, useEffect } from 'react';
import './SignInBackground.css';

/**
 * Creates a background of random lines
 */
const SignInBackground = () => {

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight / 2);
    const nPoints = 30;
    const heightDifference = 100;

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
            setViewportHeight(window.innerHeight / 2);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [viewportWidth, viewportHeight]);

    const generatePath = () => {
        const x_coords = Array.from({ length: nPoints }, (_, i) => i * (viewportWidth / (nPoints - 1)));
        const y_coords = Array.from({ length: nPoints }, () => {
            const minY = viewportHeight - heightDifference;
            const maxY = viewportHeight + heightDifference;
            return Math.random() * (maxY - minY) + minY;
        });
    
        let path = `M ${x_coords[0]} ${y_coords[0]}`;
    
        for (let i = 1; i < x_coords.length - 2; i++) {
            const x1 = x_coords[i - 1];
            const y1 = y_coords[i - 1];
            const x2 = x_coords[i];
            const y2 = y_coords[i];
            const x3 = x_coords[i + 1];
            const y3 = y_coords[i + 1];
            const x4 = x_coords[i + 2];
            const y4 = y_coords[i + 2];
    
            const cx1 = x2 + (x3 - x1) / 3;
            const cy1 = y2 + (y3 - y1) / 3;
            const cx2 = x3 - (x4 - x2) / 3;
            const cy2 = y3 - (y4 - y2) / 3;
    
            path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x3} ${y3}`;
        }
    
        path += ` L ${x_coords[x_coords.length - 1] + 100} ${y_coords[y_coords.length - 1]}`;  // Line to the last point
        path += ` L ${x_coords[x_coords.length - 1] + 100} ${viewportHeight * 2 + 100}`; // Draw down to the bottom
        path += ` L ${x_coords[0]} ${viewportHeight * 2 + 100}`; // Draw a line back to the starting point at the bottom
        path += ` L ${x_coords[0]} ${y_coords[0]}`; // Close the path by returning to the first point

        return path;
    }

    const path1 = generatePath();
    const path2 = generatePath();
    const path3 = generatePath();

    return (
        <div className='sign-in-background'>
            <svg width="100vw" height="100vh" stroke='var(--background-color-lowest)' fill='rgba(250, 163, 7, 0.3)'> 
                <path d={`
                    ${path1}
                `}></path>
                 <path d={`
                    ${path2}
                `}></path>
                 <path d={`
                    ${path3}
                `}></path>
            </svg>
        </div>
    );
}
 
export default SignInBackground;