using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using nanaGame.Utils;

namespace nanaGame.GameObjects.Button
{
    public class Button : Component
    {
        private MouseState _currentMouse;
        private bool _isHovering;
        private MouseState _previousMouse;
        private Texture2D _texture;
        private string label;

        public event EventHandler Click;

        public bool Clicked { get; private set; }

        public Color PenColour { get; set; }

        public Vector2 scale { get; set; }

        public Vector2 size;

        public Rectangle Rectangle
        {
            get
            {
                return new Rectangle((int)realPosition.X, (int)realPosition.Y, (int)size.X, (int)size.Y);
            }
        }

        public Button(Texture2D texture, string label = null)
        {
            _texture = texture;
            this.label = label;
            size = new Vector2(_texture.Width / 2, _texture.Height / 2);
        }

        public override void DrawObject(GameTime gameTime)
        {
            var colour = Color.White;

            if (_isHovering)
                colour = Color.Gray;

            GlobalVar.SpriteBatch.Draw(_texture, realPosition, new Rectangle(0, 0, _texture.Width, _texture.Height), colour, 0, new Vector2(0, 0), scale, SpriteEffects.None, 1);
            if (label != null)
            {
                Vector2 fontSize = new Vector2(0, 0);
                fontSize = GlobalVar.MainFont.MeasureString(label);

                GlobalVar.SpriteBatch.DrawString(GlobalVar.MainFont, label, new Vector2(realPosition.X + _texture.Width * scale.X / 2 - fontSize.X / 2, realPosition.Y + _texture.Height * scale.Y / 2 - fontSize.Y / 2), Color.White);
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
                    Click?.Invoke(this, new EventArgs());
                }
            }
        }
    }
}
