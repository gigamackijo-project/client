import axios from 'axios';
import React, { useState } from 'react';

function HeartIcon({ productId }) {
  const [isFilled, setIsFilled] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);

  const handleLikeClick = async (id) => {
    if (!likeClicked) {
      try {
        await axios.put(`http://localhost:8000/product/likeCount/${id}`);
        console.log('좋아요 수 증가 성공');
        setLikeClicked(true);
      } catch (error) {
        console.error('좋아요 실패', error);
      }
    }
  };

  const toggleHeart = () => {
    if (!likeClicked) {
      setIsFilled(!isFilled);
      handleLikeClick(productId);
    }
  };

  return (
    <i className={`fa fa-heart${isFilled ? ' text-danger' : ''}`} onClick={toggleHeart}></i>
  );
}

export default HeartIcon;