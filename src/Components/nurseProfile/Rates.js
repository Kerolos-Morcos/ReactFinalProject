import React from 'react';

const MAX_RATING = 5; // Maximum rating value

function Rating({ rate }) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse' // Flip the container horizontally
  };

  // Calculate the number of full stars and half stars
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  // Create an array of star icons to render
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i className="fa-sharp fa-solid fa-star" key={i} style={{ fontSize: "1.4rem", color: "#FFD700",  }} />);
  }
  if (hasHalfStar) {
    stars.push(<i className="fas fa-star-half-alt fa-flip-horizontal" key="half" style={{ fontSize: "1.4rem", color: "#FFD700",   }} />);
  }

  // Fill the remaining space with empty stars
  const remainingStars = MAX_RATING - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<i className="far fa-star" key={i + fullStars + (hasHalfStar ? 1 : 0)} style={{ fontSize: "1.4rem", color: "#FFD700",   }} />);
  }

  return (
    <div style={containerStyle}>
      {stars}
    </div>
  );
};

export default Rating;