import React from "react";
import Carousel, { consts } from "react-elastic-carousel";

import styles from "../styles/Home.module.scss";

import Image from "next/image";

const breakPoints = [{ width: 400, itemsToShow: 1 }];

export default function Slider() {
  return (
    <Carousel breakPoints={breakPoints}>
      <div className={styles.image}>
        <Image
          src="https://images6.alphacoders.com/784/784070.jpg"
          width={600}
          height={450}
        />
      </div>
      <div className={styles.image}>
        <Image
          src="https://images6.alphacoders.com/784/784070.jpg"
          width={600}
          height={450}
        />
      </div>
    </Carousel>
  );
}
