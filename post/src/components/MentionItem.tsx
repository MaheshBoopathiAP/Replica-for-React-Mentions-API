import React from 'react';

interface Mention {
  id: number;
  name: string;
}

interface MentionItemProps {
  mention: Mention;
  onSelect: (mention: Mention) => void;
  isSelected: boolean; // Add isSelected prop
}

const MentionItem: React.FC<MentionItemProps> = ({ mention, onSelect }) => {
  return (
    <li key={mention.id} onClick={() => onSelect(mention)}className='text-xl border'>
      <div className='flex items-center p-1'>

        <div className='px-10'>
          <img
            alt='author-avatar'
            className='rounded-full w-10 h-10'
            src={`https://i.pravatar.cc/150?img=${mention.id}`}
          />
        </div>
        <div className='px-10'>

      {mention.name}
        </div>
        </div>
    </li>
  );
};

export default MentionItem;
