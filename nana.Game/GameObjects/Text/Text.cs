using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace nanaGame.GameObjects.Text
{
    public class Text : Component
    {
        string text;
        SpriteFont font;
        Color color;


        public Text(string text, Vector2 position, SpriteFont font, Color color, Component parent = null)
        {
            this.text = text;
            this.font = font;
            this.color = color;
            this.parent = parent;
            this.position = position;
        }

        public override void DrawObject(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.DrawString(font, text, realPosition, color);
        }

        public override void UpdateObject(GameTime gameTime)
        {
            
        }
    }
}