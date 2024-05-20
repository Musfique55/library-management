import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import play from '../../public/play-store.png';
import app from '../../public/app-store.png';
const Home = () => {

    const [categories,setCategories] = useState([]);

    useEffect(() =>{
        fetch('https://library-management-server-ten.vercel.app/categories')
        .then(res => res.json())
        .then(data  => {  
            setCategories(data)
        })
    },[])
    
    
    return (
        <div>
           <div>
           
            <h3 className="text-start px-20 font-semibold text-4xl my-12">Categories</h3>
                <div>
                {
            (categories.length === 0) &&   <div className="flex justify-center items-center"><span className="loading block loading-infinity loading-lg"></span></div>
    
           }
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
           {/* app section */}
           <div className="flex mt-28 mb-12 bg-gradient-to-t from-[#FF7854] to-[#FF5079] md:px-12 lg:px-20">
            <div className="w-[616px] h-[550px] relative">
                <img src='https://manybooks.net/themes/custom/mnybks/images/mobile-app-banner/phones.png' alt="" className="absolute  object-cover h-[629px] -top-28"/>
            </div>
            <div className="flex flex-col mt-12 space-y-5">
                <p className="
                text-white text-2xl">Introducing your ereader mobile app!</p>
                <h2 className="text-8xl text-white font-bold">Manybooks</h2>
                <p className="text-white text-3xl">Get The Best Reading Experience</p>
                <p className="text-white text-lg">FREE DOWNLOAD • GENRES • BESTSELLERS • BOOK</p>
                <h5 className="text-white text-3xl font-semibold">NOW AVAILABLE</h5>
                <div className="flex gap-10">
                    <a href="https://play.google.com/store/apps/details?id=net.manybooksapp&pli=1" target="_blank">
                    <button className="flex items-center px-6 py-2 rounded-md bg-black text-white gap-3"><img src={play} alt="" className="w-12"/><div className="text-start">
                        <p className="font-medium">Get it on</p>
                        <h6 className="font-bold text-lg">Google Play</h6>
                        </div></button>
                    </a>
                    <a href="https://apps.apple.com/us/app/manybooks/id1577802689" target="_blank">
                    <button className="flex items-center px-6 py-2 rounded-md bg-black text-white gap-3"><img src={app} alt="" className="w-12"/><div className="text-start">
                        <p className="font-medium">Download on the</p>
                        <h6 className="font-bold text-lg">App Store</h6>
                        </div></button>
                    </a>
                </div>
            </div> 
           </div>
        </div>
    );
};

export default Home;