using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using nanaGame.Utils;

namespace nanaGame.GameObjects.Background
{
    class UiBackground : Component
    {
        private Texture2D image;
        private string currentImagePath;

        public Vector2 scale { get; set; }

        public UiBackground()
        {
            LoadImage();
        }

        private void LoadImage ()
        {
            image = new NanaUtils().LoadTextureFromFile(BeatmapsState.CurrentBeatmap.Path + "/background.png");
            currentImagePath = BeatmapsState.CurrentBeatmap.Path;
        }

        public override void DrawObject(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Draw(image, new Vector2(0,0), new Rectangle(0, 0, image.Width, image.Height), Color.White, 0, new Vector2(0, 0), scale, SpriteEffects.None, 1);
        }

        public override void UpdateObject(GameTime gameTime)
        {
            if (currentImagePath != BeatmapsState.CurrentBeatmap.Path)
            {
                LoadImage();
            }
        }
    }
}
