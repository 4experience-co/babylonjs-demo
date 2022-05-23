import * as BABYLON from '@babylonjs/core';

class DemoScene {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = this.CreateScene();

    //camera
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      5,
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    
    //light
    const light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.6;
    
    //box
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, this.scene);
    const boxMaterial = new BABYLON.StandardMaterial('boxMaterial', this.scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    box.material = boxMaterial;

    //sun
    const sun = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 2, segments: 32 },
      this.scene
    );
    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', this.scene);
    sunMaterial.emissiveColor = new BABYLON.Color3(1, 1, );
    sun.material = sunMaterial;
    sun.position.y = 10;

    //ground
    const ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 10000, height: 10000 },
      this.scene
    );
    const groundMaterial = new BABYLON.StandardMaterial(
      'groundMaterial',
      this.scene
    );
    groundMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMaterial;
    ground.position.y = -5;
    
    //sky
    const sky = BABYLON.MeshBuilder.CreateBox(
      'skyMaterial',
      { width: 10000, height: 0.1, depth: 10000 },
      this.scene
    );
    const skyMaterial = new BABYLON.StandardMaterial(
      'skyMaterial',
      this.scene
    );
    skyMaterial.emissiveColor = new BABYLON.Color3(0, 0.4, 0.9);
    sky.material = skyMaterial;
    sky.position.y = 10;

    //render loop
    this.engine.runRenderLoop(() => {
      box.rotation.x += 1 / 500;
      box.rotation.y += 1 / 600;
      this.scene.render();
    });
  }

  CreateScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine);
    return scene;
  }
}

export default DemoScene;
