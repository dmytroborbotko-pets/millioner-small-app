import Image from "next/image";
import React from "react";
import thumbsUpImage from "./thumbsUp.png";
import styles from "./thumbsUp.module.css";

const ThumbsUp = () => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={thumbsUpImage}
        alt="Thumbs Up"
        fill
        priority
        sizes="(max-width: 375px) 250px, (max-width: 480px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 600px"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default ThumbsUp;
