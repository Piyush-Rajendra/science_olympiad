import React from 'react';


interface DocViewerProps {
    pdfUrl: string;
}

const DocViewer: React.FC<DocViewerProps> = ({ pdfUrl }) => {
    return (
        <div className="w-full max-w-3xl h-96 border border-gray-300 rounded-lg overflow-hidden mx-auto">
            <iframe 
                src={pdfUrl}
                className="w-full h-full border-none" 
                title="PDF Viewer" 
            />
        </div>
    );
};

export default DocViewer;
