export const fallAnimation = (scene: Phaser.Scene, object: any): void => {
  const showAnimation = scene.tweens.createTimeline();

  showAnimation.add({
    targets: object,
    y: scene.game.canvas.height + object.height + 100,
    duration: 1000,
  });

  showAnimation.play();
};
