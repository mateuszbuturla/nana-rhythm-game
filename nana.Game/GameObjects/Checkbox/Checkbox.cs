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

        Texture2D currentTexture;
        Texture2D checkedTexture;
        Texture2D unCheckedTexture;
        SpriteFont font;

        private MouseState _currentMouse;
        private bool _isHovering;
        private MouseState _previousMouse;

        public Vector2 scale { get; set; }

        public Vector2 size;

        public Vector2 checkboxSize;

        public Rectangle Rectangle
        {
            get
            {
                return new Rectangle((int)realPosition.X, (int)realPosition.Y, (int)checkboxSize.X, (int)checkboxSize.Y);
            }
        }

        public Checkbox(string label, bool isChecked = false, Component parent = null)
        {
            utils = new NanaUtils();
            this.isChecked = isChecked;
            this.label = label;
            this.parent = parent;
            font = GlobalVar.Content.Load<SpriteFont>("mainFontSmall");
            checkedTexture = utils.LoadTextureFromFile("assets/checkboxChecked.png");
            unCheckedTexture = utils.LoadTextureFromFile("assets/checkbox.png");
            UpdateTexture();
            size = new Vector2(currentTexture.Width / 2, currentTexture.Height / 2);
            checkboxSize = new Vector2(currentTexture.Width + 25 + font.MeasureString(label).X, currentTexture.Height);
        }

        public override void DrawObject(GameTime gameTime)
        {
            UpdateTexture();

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
            _previousMouse = _currentMouse;
            _currentMouse = Mouse.GetState();

            var mouseRectangle = new Rectangle(_currentMouse.X, _currentMouse.Y, 1, 1);

            _isHovering = false;

            if (mouseRectangle.Intersects(Rectangle))
            {
                _isHovering = true;

                if (_currentMouse.LeftButton == ButtonState.Released && _previousMouse.LeftButton == ButtonState.Pressed)
                {
                    isChecked = !isChecked;
                }
            }
        }
    }
}
