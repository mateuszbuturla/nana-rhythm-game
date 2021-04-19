using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;

namespace nanaGame.GameObjects.Text
{
    public class Text : Component
    {
        string text;
        SpriteFont font;
        Color color;
        Component parent;

        public Vector2 position;
        public Vector2 originalPosition { get; set; }


        public Text(string text, SpriteFont font, Color color, Component parent = null)
        {
            this.text = text;
            this.font = font;
            this.color = color;
            this.parent = parent;
        }

        public override void Draw(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.DrawString(font, text, position, color);
        }

        public override void Update(GameTime gameTime)
        {
            Console.WriteLine(parent);
            if (!(parent is null))
            {
                position = new Vector2(parent.position.X + originalPosition.X, parent.position.Y + originalPosition.Y);
            }
            else
            {
                position = originalPosition;
            }
        }
    }
}