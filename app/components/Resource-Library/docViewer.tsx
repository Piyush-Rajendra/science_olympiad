import React from 'react';


interface DocViewerProps {
    pdfUrl: string;
}

const DocViewer: React.FC<DocViewerProps> = ({ pdfUrl }) => {
    return (
<div className="w-screen h-screen border border-gray-300 rounded-lg overflow-hidden mx-auto">
    <iframe 
        src={pdfUrl}
        className="w-full h-full border-none" 
        title="PDF Viewer" 
    />
</div>
    );
};

export default DocViewer;
