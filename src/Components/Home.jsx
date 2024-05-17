import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
const Home = () => {

    const [categories,setCategories] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(data  => {
            setCategories(data)
        })
    },[])

    console.log(categories);
    return (
        <div>
           <div>
            <h3 className="text-start px-20 font-semibold text-4xl my-12">Categories</h3>
                <div>
                    <Swiper
                        style={{'padding-left': '80px', 'padding-right': '80px' }}
                        slidesPerView={3}
                        spaceBetween={20}
                        freeMode={true}
                        navigation={true}
                        loop={true}
                        modules={[FreeMode, Navigation]}
                        className="mySwiper"
                    >
                        
                        {
                        categories.map(item => {
                            return <SwiperSlide  key={item._id}><Categories  item={item}></Categories></SwiperSlide>
                        })
                        }
                        
                    </Swiper>
                   
                </div>
           </div>
        </div>
    );
};

export default Home;