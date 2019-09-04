import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
    <div className="grid-card">
        <ContentLoader
            height={474}
            width={360}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="90" y="35" rx="4" ry="4" width="180" height="6" />
            <rect x="120" y="55" rx="3" ry="3" width="120" height="6" />
            <rect x="90" y="250" rx="3" ry="3" width="180" height="6" />
            <rect x="120" y="270" rx="3" ry="3" width="120" height="6" />
            <rect x="20" y="430" rx="3" ry="3" width="100" height="6" />
            <rect x="240" y="430" rx="3" ry="3" width="100" height="6" />
            <rect x="20" y="450" rx="3" ry="3" width="100" height="6" />
            <rect x="240" y="450" rx="3" ry="3" width="100" height="6" />
            <circle cx="180" cy="220" r="120" />
        </ContentLoader>
    </div>
);
