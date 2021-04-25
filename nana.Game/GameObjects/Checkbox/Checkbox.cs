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
            checkedTexture = utils.LoadTextureFromFile("assets/checkboxChecked.png");
            unCheckedTexture = utils.LoadTextureFromFile("assets/checkbox.png");
            UpdateTexture();
            size = new Vector2(currentTexture.Width / 2, currentTexture.Height / 2);
        }

        public override void DrawObject(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Draw(currentTexture, new Vector2(realPosition.X, realPosition.Y + size.Y / 2), new Rectangle(0, 0, currentTexture.Width, currentTexture.Height), Color.White, 0, size, new Vector2(scale.X, scale.X), SpriteEffects.None, 1);
            GlobalVar.SpriteBatch.DrawString(font, label, new Vector2(realPosition.X + 25, realPosition.Y + 5), Color.White);
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

        public override void UpdateObject(GameTime gameTime)
        {
        }
    }
}
