import React, { useState } from 'react';
import DocViewer from './docViewer';

const GeneralRules = () => {
  const [activeTab, setActiveTab] = useState(1);
   const pdfUrl = '../images/Science_Olympiad_Div_C_Rules_2025.pdf'

  // Function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
      <div className="container mx-auto px-4 py-6">
        {/* Tab Content */}
        <div className="content-tabs mt-6">
          {activeTab === 1 && (
            <div className="content active-content flex items-center justify-center bg-gray-100">
              <DocViewer pdfUrl={pdfUrl} />
            </div>
          )}
          {activeTab === 2 && (
            <div className="content active-content">
              <h2 className="text-xl font-bold mb-4">FAQ</h2>
              <p className="text-gray-600">This is where the FAQ content will go.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default GeneralRules;