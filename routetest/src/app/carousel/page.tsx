import { useState } from "react";
import img1 from "../assets/download.jpg"
import img2 from "../assets/OIP.jpg";
export default function Carosuel(){
    const pic=[img1.src,img2.src];
        const[curIndex,setIndex]=useState(0);
        const nxtSlide=()=>{
            setIndex((prIndex)=>(prIndex+1)%pic.length);
        };
        const preSlide=()=>{
            setIndex((prIndex)=>(prIndex-1+pic.length)%pic.length);
        };
    return(
        <section id="car">
        <div className="pt-16 p-4  bg-gray-100 h-150 mb-5 mt-5">
            <div className="w-full   h-64">
                <img src={pic[curIndex]} className="w-full h-120 object-cover rounded-lg" alt="Slide"/>
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-transperent text-white rounded-lg">
                    <h1 className="text-xl font-bold">MenThee Technoliges</h1>
                    <button className="bg-blue-400 rounded w-40 h-10">Explore our Services</button>
                </div>
                <button onClick={preSlide} className="absolute top-1/2 left-4 transform -translate-y-1 bg-black text-white p-2 rounded-full">◀</button>
                <button onClick={preSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">▶</button>
                </div>
        </div>
        </section>
        
    );
}