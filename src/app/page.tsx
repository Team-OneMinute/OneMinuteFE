"use client"

import { useRef, useEffect } from 'react';
import { register, SwiperContainer } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/navigation";
import Swiper from "swiper/types/swiper-class";
import styles from "./page.module.css";

register();

export default function Home() {
  const swiperElRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    function onSwiperSlideChange(event: CustomEvent<[e: Swiper]>) {
      console.log("realIndex", event.detail[0].realIndex);
    }

    const ref = swiperElRef?.current;
    // swiper@v11.xから 「prefix `swiper` + swiper-element.d.ts内のcustomEvent名」を結合させたイベント名を指定する必要がある
    // @ts-ignore
    ref?.addEventListener("swiperslidechange", onSwiperSlideChange);
    return () => {
      // @ts-ignore
      ref?.removeEventListener("swiperslidechange", onSwiperSlideChange);
    };
  }, [swiperElRef]);

  return (
    <div>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        initial-slide="0"
        centered-slides="false"
        speed="400"
        class={styles.swiper}
      >
        <swiper-slide key="1">1</swiper-slide>
        <swiper-slide key="2">2</swiper-slide>
        <swiper-slide key="3">3</swiper-slide>
        <swiper-slide key="4">4</swiper-slide>
        <swiper-slide key="5">5</swiper-slide>
      </swiper-container>
    </div>
  );
};
