import React,{useState,useEffect} from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import {Vector3, PointerEventTypes,VideoTexture,StandardMaterial,UniversalCamera,KeyboardEventTypes, setStereoscopicAnaglyphRigMode} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import "./changetexturescene.scss"
import "./tresD.scss"
const DemoScene3 = () => {
    
    var[play,setPlay] = useState(false)
    var anim1=null;
    
    var count = false;
    function handlePlay(){
        count = !count;
        if(count){
            anim1?.play();
        }else{
            anim1?.pause();
        }
        
    }

    var numFramesToPlay = 0;

    const onSceneReady = async scene =>{
        var camera = new UniversalCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.rotation.y=4.5;
        //var camera = new ArcRotateCamera("camera", Tools.ToRadians(-120), Tools.ToRadians(1.5), 5, new Vector3(0, 0, 0), scene);
        //camera.inputs.addMouseWheel();
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
        camera.attachControl(canvas, true);
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        scene.useRightHandedSystem = true
        
        var fort = await SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/milasantacruz/demo_galeria/277282519d41b5f240792060fb2aa7df893f23c8/public/", "newPlace.gltf", scene);

        camera.parent = scene.getMeshByName('Sphere');
        anim1 = scene.animationGroups[1]
        camera.radius = 0;
        camera.alpha = 0.2;
        camera.beta = 1.6;
        anim1.speedRatio = 0.2;
        anim1.pause();
        console.log(scene.getMeshByName('Sphere'));
        for(var mesh of fort.meshes){
            console.log(mesh.name)
        }

         //MATERIALS
        //IVDEO MATERIAL
         var vitMat = new VideoTexture("video", "/static/a1a772f8263c9d215ace9578f02a8026/Wth.mp4", scene,  false,
         false,
         VideoTexture.TRILINEAR_SAMPLINGMODE,
         {
             autoPlay:false,
             autoUpdateTexture:true,
             loop:true
         });
        var mat = new StandardMaterial("mat", scene)
        mat.diffuseTexture = vitMat;
        scene.getMeshByName('Cube_primitive3').material = mat

        //MOUSE ACTIONS
       
        
        var spaceCount = false;
        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
              case KeyboardEventTypes.KEYDOWN:
                console.log("KEY DOWN: ", kbInfo.event);
               // anim1.play(true);
               //  console.log(kbInfo.event.key)

                switch(kbInfo.event.key){
                    case 'd':
                        console.log('d')
                        numFramesToPlay+=1;
                        anim1.goToFrame(numFramesToPlay);
                        break
                    case 'a':
                        console.log('a')
                        numFramesToPlay-=1;
                        anim1.goToFrame(numFramesToPlay);
                        break
                    case 'p':
                        vitMat.video.play();
                        break
                    case ' ':
                        spaceCount = !spaceCount;
                        spaceCount ? anim1.play() : anim1.pause();
                        numFramesToPlay = anim1.targetedAnimations[0].animation.runtimeAnimations[0]?._currentFrame;
                        break
                    default:
                        console.log("deff");
                        
                }
                

                break;
              case KeyboardEventTypes.KEYUP:
                               
                switch(kbInfo.event.key){
                   
                    case 'a':
                        console.log("a");
                        break
                    case 'd':
                        console.log("d");
                        break
                    case ' ':
                        console.log("space");
                        break
                    default:
                                
                        //console.log("KEY UP: ", kbInfo.event.key);
                        console.log(anim1.targetedAnimations[0].animation.runtimeAnimations[0]?._currentFrame);
                        numFramesToPlay = anim1.targetedAnimations[0].animation.runtimeAnimations[0]?._currentFrame;
                        anim1.pause();
                        break;
                }

                break
                default:
                    console.log(" ")

 
            }
         });

       

         scene.onPrePointerObservable.add(function(pointerInfo, eventState){

             // console.log(pointerInfo);
            var event = pointerInfo.event;
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta;
            }
            else if (event.detail) {
                delta = -event.detail;
            }
            if (delta) {
                
            }
            
         },PointerEventTypes.POINTERWHEEL, false)


        
    }
    const onRender = scene => {
   
        
    }
    return (
       <>
        <h1 className ="mobile_play" onClick={handlePlay}>⏯️</h1>
        <SceneComponent antialias onSceneReady={onSceneReady}  className={"sample-canvas"} onRender={onRender} />
       </>
    );
}

export default DemoScene3;
