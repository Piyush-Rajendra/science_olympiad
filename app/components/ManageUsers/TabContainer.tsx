import { useState } from 'react';
import Tab from './Tab';
import TabContent from './TabContent';

export default function TabContainer({ setActiveTab }) { // Accept setActiveTab as a prop
  const [activeTab, setLocalActiveTab] = useState<'Admins' | 'Event Supervisors'>('Admins');

  const handleTabClick = (tab) => {
    setLocalActiveTab(tab);
    setActiveTab(tab); // Update the active tab in ManageUsers
  };

  return (
    <div className="container ml-5 p-4 pr-20">
      <div className="flex mb-0">
        <Tab 
          label="Admins"
          isActive={activeTab === 'Admins'}
          onClick={() => handleTabClick('Admins')}
        />
        <Tab 
          label="Event Supervisors"
          isActive={activeTab === 'Event Supervisors'}
          onClick={() => handleTabClick('Event Supervisors')}
          extraPadding="pl-6"
        />
      </div>
      <div className="w-full border-b border-gray-300 ml-2" />
      <TabContent activeTab={activeTab} />
    </div>
  );
}
