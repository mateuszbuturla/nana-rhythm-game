using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.Collections.Generic;
using nanaGame.GameObjects;
using nanaGame.GameObjects.Text;
using nanaGame.Utils;
using System;

namespace nanaGame.GameObjects.Checkbox
{

    public class Checkbox : Component
    {
        public bool isChecked;

        private string label;

        private NanaUtils utils;

        Component parent;

        public Vector2 position;
        public Vector2 originalPosition { get; set; }

        Texture2D currentTexture;
        Texture2D checkedTexture;
        Texture2D unCheckedTexture;
        SpriteFont font;

        public Vector2 scale { get; set; }

        public Vector2 size;

        public Checkbox(string label, bool isChecked = false, Component parent = null)
        {
            utils = new NanaUtils();
            this.isChecked = isChecked;
            this.label = label;
            this.parent = parent;
            font = GlobalVar.Content.Load<SpriteFont>("Font");
            checkedTexture = utils.LoadTextureFromFile("assets/checkboxChecked.png", GlobalVar.Graphic.GraphicsDevice);
            unCheckedTexture = utils.LoadTextureFromFile("assets/checkbox.png", GlobalVar.Graphic.GraphicsDevice);
            UpdateTexture();
            size = new Vector2(currentTexture.Width / 2, currentTexture.Height / 2);
        }

        public override void Draw(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Draw(currentTexture, new Vector2(position.X, position.Y + size.Y / 2), new Rectangle(0, 0, currentTexture.Width, currentTexture.Height), Color.White, 0, size, new Vector2(scale.X, scale.X), SpriteEffects.None, 1);
            GlobalVar.SpriteBatch.DrawString(font, label, new Vector2(position.X + 25, position.Y + 5), Color.White);
        }

        private void UpdateTexture ()
        {
            if (isChecked)
            {
                currentTexture = checkedTexture;
            }
            else
            {
                currentTexture = unCheckedTexture;
            }
        }

        public override void Update(GameTime gameTime)
        {
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
