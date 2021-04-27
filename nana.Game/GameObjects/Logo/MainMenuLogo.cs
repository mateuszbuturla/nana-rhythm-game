using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace nanaGame.GameObjects.Logo
{

    public class MainMenuLogo : Component
    {

        private Texture2D logoTexture;
        private Texture2D logoBackgroundTexture;

        public Vector2 scale { get; set; }

        public MainMenuLogo()
        {
            logoTexture = GlobalVar.Content.Load<Texture2D>("logo");
            logoBackgroundTexture = GlobalVar.Content.Load<Texture2D>("logoBackground");
        }

        public override void DrawObject(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Draw(logoBackgroundTexture, new Vector2(realPosition.X - (logoBackgroundTexture.Width / 2 - 120) * scale.X, realPosition.Y - logoBackgroundTexture.Height / 2 * scale.Y), new Rectangle(0, 0, logoBackgroundTexture.Width, logoBackgroundTexture.Height), Color.White * 0.7f, 0, new Vector2(0.5f, 0.5f), new Vector2(scale.X, scale.X), SpriteEffects.None, 1);
            GlobalVar.SpriteBatch.Draw(logoTexture, new Vector2(realPosition.X - logoTexture.Width / 2 * scale.X, realPosition.Y - logoTexture.Height / 2 * scale.Y), new Rectangle(0, 0, logoTexture.Width, logoTexture.Height), Color.White, 0, new Vector2(0.5f, 0.5f), new Vector2(scale.X, scale.X), SpriteEffects.None, 1);
        }

        public override void UpdateObject(GameTime gameTime)
        {
            
        }
    }
}
