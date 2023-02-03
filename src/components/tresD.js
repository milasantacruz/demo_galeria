import React, {useState,useEffect} from 'react';
import Demo from "../components/demoScene3"
import space from "../images/space.png"
import a from "../images/a.png"
import d from "../images/d.png"
import "./tresD.scss"
const TresD = () => {


    return (
        <div>
            <div className="ui">

               <div 
               className="space"
                >
                    <img 
                    src={space} 
                    alt="space key" 
                    height={30}
                    />
                    <h1 className ="emo"> ▶️ / ⏸️</h1>
               </div>
               <div className="a" 
               >
                    <img 
                    src={a}
                    alt="a key" 
                    width={32}
                    />
                    <h1 className ="emo">⏪</h1>
               </div>
               <div className="d" 
               >
                    <img 
                    src={d}
                    alt="d key" 
                    width={32}
                    />
                    <h1 className ="emo">⏩</h1>
               </div>
               
            </div>
             <Demo  />    
        </div>
    );
}

export default TresD;
