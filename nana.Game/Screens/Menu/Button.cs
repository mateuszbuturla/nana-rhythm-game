using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using nanaGame.GameObjects;
using System;
using nanaGame.Utils;

namespace nanaGame.Screens.Menu
{
    public class Button : Component
    {
        private MouseState _currentMouse;
        private bool _isHovering;
        private MouseState _previousMouse;
        private Texture2D _texture;

        public event EventHandler Click;

        public bool Clicked { get; private set; }

        public Color PenColour { get; set; }

        public Vector2 position { get; set; }

        public Vector2 scale { get; set; }

        public Vector2 size;

        public Rectangle Rectangle
        {
            get
            {
                return new Rectangle((int)position.X - (int)size.X / 2, (int)position.Y - (int)size.Y / 2, (int)size.X, (int)size.Y);
            }
        }

        public Button(Texture2D texture)
        {
            _texture = texture;
            size = new Vector2(_texture.Width / 2, _texture.Height / 2);
        }

        public override void Draw(GameTime gameTime, SpriteBatch spriteBatch)
        {
            var colour = Color.White;

            if (_isHovering)
                colour = Color.Gray;

            spriteBatch.Draw(_texture, position, new Rectangle(0,0, _texture.Width, _texture.Height), colour, 0, size, scale, SpriteEffects.None, 1);
        }

        public override void Update(GameTime gameTime)
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
