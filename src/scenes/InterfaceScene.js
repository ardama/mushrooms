

export default class InterfaceScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'InterfaceScene',
    });
    
    this.uiDepth = 10000
  }
  
  preload() {}
  
  create() {
    this.scene.bringToTop();
    
  }
  
  update(time, delta) {}
  
  
  
  initializeInterfaceElements = () => {
    this.renderInventoryElement()
  }
  
  
  renderInventoryElement = () => {
    const background = this.add.graphics({ x: 20, y: 20 });
    background.fillStyle('0xaaaaaa', 1);
    background.fillRect(0, 0, 300, 100);
    background.setDepth(this.uiDepth);
  }
  
  
}
