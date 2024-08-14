import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactFlow, {addEdge} from 'react-flow-renderer';
import Card from './Card';

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [elements, setElements] = useState([]);
  const [inputText, setInputText] = useState('');

  const addCard = () => {
    const initialX = 100;
    const initialY = 100;
    const newCard = {
      id: `card-${cards.length}`,
      text: inputText || 'This is a dummy text for card',
      position: { 
        x: initialX + (cards.length * offset) % (window.innerWidth - 200), 
        y: initialY
      },
  
    };
    
     

    setCards([...cards, newCard]);
    setElements([...elements, newCard]);
    setInputText('');
  };

  

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const moveCard = (id, x, y) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, position: { x, y } } : card
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
       <input
        className='text-black my-6 mr-[10px] p-[5px]'
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text for card"
        />
        <button onClick={addCard} className='text-black'>Add Card</button>
      <div className='z-0 border border-blue-800 w-[1250px] h-[80vh] overflow-scroll relative my-10  mx-32'>
       
        <ReactFlow elements={elements} onConnect={onConnect}>
          {cards.map((card) => (
            <Card key={card.id} card={card} moveCard={moveCard} className="mx-10 "  />
          ))}
        </ReactFlow>
      </div>
    </DndProvider>
  );
};

export default Canvas;
