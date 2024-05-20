import  { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../index.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    return (
        <div className=' text-white'>
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide className='banner-1'>
            <div>
                <div className='p-12 h-[266px] text-center'>
                    <h3 className='text-5xl font-semibold mb-5'>Explore the World of Knowledge</h3>
                    <p className='font-medium'>Your haven for literature, learning, and leisure. Dive into a world of endless possibilities, where every page holds a new adventure, and every word sparks imagination.</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='banner-2 text-center'>
            <div>
                <div className='p-12 h-[266px]'>
                    <h3 className='text-5xl font-semibold mb-5'>FREE AND DISCOUNTED BESTSELLERS</h3>
                    <p className='font-medium'>Your haven for literature, learning, and leisure. Dive into a world of endless possibilities, where every page holds a new adventure, and every word sparks imagination.</p>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='banner-3 text-center'>
            <div>
                <div className='p-12 h-[266px]'>
                    <h3 className='text-5xl font-semibold mb-5'>LOTS OF EBOOKS. 100 % FREE</h3>
                    <p className='font-medium'>Your haven for literature, learning, and leisure. Dive into a world of endless possibilities, where every page holds a new adventure, and every word sparks imagination.</p>
                </div>
            </div>
        </SwiperSlide>
       
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );

        </div>
    );
};

export default Banner;