import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import MentionItem from './MentionItem';
import '../css/post.css';

interface Mention {
  id: number;
  name: string;
}

interface Props {

}

const PostInput: React.FC<Props> = ({ ...props }) => {
  const [text, setText] = useState<string>('');
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [mentionData, setMentionData] = useState<Mention[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1); // Track selected option index
  const [posts, setPosts] = useState<{ author: string, content: string; timestamp: string }[]>([]); // Store posted content and timestamp
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Updating mentions based on "@" symbol
    const parts = newText.split('@');
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1];
      setSearchText(lastPart);
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setSearchText('');
    }
  };

  const getTimeDifference = (timestamp: string): string => {
    const postDate = new Date(timestamp);
    const currentDate = new Date();
  
    const timeDifference = Math.abs(currentDate.getTime() - postDate.getTime());
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  
    if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    } else {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    }
  };
  

  // Simulating fetching mentions (replace with actual data fetching)
  const fetchMentions = (search: string) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Albert' },
        { id: 2, name: 'Bobby' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
        { id: 5, name: 'Eva' },
        { id: 6, name: 'Fiona' },
        { id: 7, name: 'Grace' },
        { id: 8, name: 'Hannah' },
        { id: 9, name: 'Ivy' },
        { id: 10, name: 'Jack' },
        { id: 11, name: 'Katie' },
        { id: 12, name: 'Liam' },
        { id: 13, name: 'Mia' },
        { id: 14, name: 'Nathan' },
        { id: 15, name: 'Olivia' },
        { id: 16, name: 'Peter' },
        { id: 17, name: 'Quinn' },
        { id: 18, name: 'Rachel' },
        { id: 19, name: 'Sam' },
        { id: 20, name: 'Tina' },
        { id: 21, name: 'Uma' },
        { id: 22, name: 'Victor' },
        { id: 23, name: 'Wendy' },
        { id: 24, name: 'Xavier' },
        { id: 25, name: 'Yvonne' },
        { id: 26, name: 'Zara' },
       
      ].filter((mention) => mention.name.toLowerCase().includes(search.toLowerCase()));
      setMentionData(mockData);
    }, 1000);
  };

  useEffect(() => {
    if (searchText) {
      fetchMentions(searchText);
    }
  }, [searchText]); // Fetching mentions when searchText changes

  const handleMentionSelect = (mention: Mention) => {
    const newText = text.replace(
      `@${searchText}`,
      `${mention.name} ` // Replacing mention name in braces to mark it
    );
    setText(newText);
    setSearchText('');
    setIsOpen(false);
  };

  const handleDelete = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Backspace' && text.endsWith(`@${searchText}`)) {
      setSearchText('');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Enter' && selectedOptionIndex !== -1) {
      handleMentionSelect(mentionData[selectedOptionIndex]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedOptionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault(); 
      setSelectedOptionIndex((prevIndex) =>
        prevIndex < mentionData.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePost = () => {
    // Generating a random index to select a name from the list of authors
    const randomIndex = Math.floor(Math.random() * authorNames.length);
    const randomAuthorName = authorNames[randomIndex];
  
    // Store the posted content, author name, and timestamp
    const newPost = {
      author: randomAuthorName,
      content: text,
      timestamp: new Date().toLocaleString(), // Getting current timestamp
    };
    setPosts([...posts, newPost]);
  
    // Clear text area after posting
    setText('');
  };

  const authorNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
    'Katherine',
    'Liam',
    'Mia',
    'Nathan',
    'Olivia',
    'Peter',
    'Quinn',
    'Rachel',
    'Sam',
    'Tina',
    'Uma',
    'Victor',
    'Wendy',
    'Xavier',
    'Yvonne',
    'Zara',
    'Adam',
    'Beth',
    'Caleb',
    'Diana',
    'Ethan',
    'Fiona',
    'Gavin',
    'Hannah',
    'Isaac',
    'Jasmine',
    'Kyle',
    'Lily',
    'Michael',
    'Nora',
    'Oscar',
    'Penelope',
    'Quentin',
    'Rose',
    'Samantha',
    'Theo',
    'Violet',
    'William',
    'Xander',
  ];
  const generateImageURL = (author: string): string => {
    const initial = author.charAt(0).toLowerCase();
    return `https://picsum.photos/50/50?random=${initial.charCodeAt(0)}`;
  };


  useEffect(() => {
    if (inputRef.current) {
      if (text.includes('@')) {
        inputRef.current.classList.add('bold-mention');
      } else {
        inputRef.current.classList.remove('bold-mention');
      }
    }
  }, [text]);

  return (
    <div className="post-input block">
      <div className="">
        <div className=''>
          <textarea
            ref={inputRef}
            value={text}
            className='border border-red-500 mt-10 px-4 py-3 h-32 w-1/2 '
            onChange={handleTextChange}
            placeholder='Create a post...'
            onKeyDown={handleDelete}
            {...props}
          />
        </div>
        <div className='ml-48'>
          <button onClick={handlePost} className='ml-96  mt-5 bg-blue-600 text-white px-3 rounded-md text-xl '>Post</button>
        </div>
      </div>
      {isOpen && (
        <div className="mentions-dropdown">
          <ol
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            tabIndex={0} 
          >
            {mentionData.length > 0 &&
              mentionData.map((mention, index) => (
                <div className="bg-black text-white ml-96 w-1/4 hover:bg-red-600" key={mention.id}>
                  <MentionItem
                    mention={mention}
                    onSelect={handleMentionSelect}
                    isSelected={selectedOptionIndex === index}
                  />
                </div>
              ))
            }
          </ol>
        </div>
      )}

       <div className="posted-content mx-96 mt-5">
       {posts.map((post, index) => (
        <div key={index} className="post border mx-5 bg-red-200 flex p-2 items-center">
         <div className="pl-10">
         <img
          alt="author-avatar"
          className="rounded-full w-10 h-10"
          src={generateImageURL(post.author)}
        />
        </div>

          <div className="px-10">
            <p>{post.author}</p>
          </div>
        
          <div className="px-10">
            <p>{getTimeDifference(post.timestamp)}</p>
          </div>
        
        </div>
      ))}

      </div>
    </div>
  );
};

export default PostInput;
