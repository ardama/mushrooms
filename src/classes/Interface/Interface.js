
export default class Interface {
  constructor(scene) {
    this.scene = scene;
    
    this.elements = {
      inventory: new Inventory(this.scene),
    }
  }
  
  update() {
    
  }
}

class Inventory {
  constructor(scene) {
    this.scene = scene;
    
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene, 100, 100, 300, 40, 0xaaaaaa,
    );
    
    this.scene.add.existing(this.background);
  }
  
  update() {}
}
