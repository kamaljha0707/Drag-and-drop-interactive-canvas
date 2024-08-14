import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Modal from 'react-modal';
import 'react-resizable/css/styles.css';

const Card = ({ card, moveCard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialCardPos, setInitialCardPos] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ width: 200, height: 150 });

  const toggleModal = (e) => {
    e.stopPropagation(); 
    setIsOpen(!isOpen);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialCardPos({ x: card.position.x, y: card.position.y });
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const dx = e.clientX - initialMousePos.x;
      const dy = e.clientY - initialMousePos.y;
      moveCard(card.id, initialCardPos.x + dx, initialCardPos.y + dy);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const onResize = (event, { size }) => {
    setCardSize({
      width: size.width,
      height: size.height,
    });
  };

  return (
    <>
      <div
      className='z-10 absolute'
        style={{
          top: card.position.y,
          left: card.position.x,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
      >
        <ResizableBox
          width={cardSize.width}
          height={cardSize.height}
          minConstraints={[100, 50]}
          maxConstraints={[500, 300]}
          onResize={onResize}
          className='border-[1px] border-black rounded-[7px] bg-gray-600 overflow-hidden'
         
        >
          <div className='p-[10px] w-full h-full box-border'>
            {card.text.slice(0, 20)}...
            <button onClick={toggleModal} className='bg-black border border-white block mt-[10px]'>
              Show More
            </button>
          </div>
        </ResizableBox>
      </div>

      <Modal isOpen={isOpen} onRequestClose={toggleModal} className= "flex justify-center items-center flex-col bg-black h-full w-full text-white">
        <h2 className='text-3xl'>Card Details</h2>
        <p className='text-xl my-12'>{card.text}</p>
        <button className='bg-black border border-white text-white' onClick={toggleModal}>Close</button>
      </Modal>
    </>
  );
};

export default Card;
