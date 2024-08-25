'use client'; // Ensure this is a client component

import { useState } from 'react';
import styles from './DropdownBox.module.css';

const DropdownBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addItem = () => {
    if (text.trim()) {
      setItems([...items, text.trim()]);
      setText('');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggleButton} onClick={toggleDropdown}>
        {isOpen ? 'Hide' : 'Show'} Content
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
          />
          <button className={styles.addButton} onClick={addItem}>
            Add Text
          </button>
          <ul className={styles.itemsList}>
            {items.map((item, index) => (
              <li key={index} className={styles.item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownBox;