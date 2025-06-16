import './image_carousel.css';
import { useState } from 'react';

const ImageCarouselComponent = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='row' style={{marginTop:'30px'}} data-testid='product-gallery'>
    <div className='col-sm-1' style={{ marginLeft:'7%' }}>
      <div style={{ display:'flex', flexDirection:'column'}}>
        {images.map((src, index) => (
          <div
            className={`item ${index === activeIndex ? 'active' : ''}`}
            key={index}
            style={{
            }}
            onClick={ () => goToSlide(index) }
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              style={{ maxHeight: '400px', maxWidth: '100%', display:'block' }}
            />
          </div>
        ))}
      </div>
    </div>
    <div className="col-sm-6 carousel slide" style={{ position: 'relative', width: '600px',display:'inline-block', marginTop:'50px' }}>
      <ol className="carousel-indicators">
        {images.map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => goToSlide(index)}
            style={{
              display: 'inline-block',
              borderRadius: '50%',
              backgroundColor: index === activeIndex ? '#333' : '#ccc',
              cursor: 'pointer',
            }}
          />
        ))}
      </ol>

      <div className="carousel-inner">
        {images.map((src, index) => (
          <div
            className={`item ${index === activeIndex ? 'active' : ''}`}
            key={index}
            style={{
              display: index === activeIndex ? 'block' : 'none',
              textAlign: 'center',
            }}
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              style={{ maxWidth: '400px', height:'400px', display:'block', margin:'0 auto' }}
            />
          </div>
        ))}
      </div>

      <button onClick={prevSlide} style={controlStyle('left')}>
        ‹
      </button>
      <button onClick={nextSlide} style={controlStyle('right')}>
        ›
      </button>
    </div>
    </div>
  );
};

const controlStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '20px',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  border: 'none',
  fontSize: '24px',
  padding: '8px 12px',
  cursor: 'pointer',
  zIndex: 10,
});

export default ImageCarouselComponent;

