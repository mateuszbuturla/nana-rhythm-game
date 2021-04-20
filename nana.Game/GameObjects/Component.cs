using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace nanaGame.GameObjects
{
    public abstract class Component
    {

        public Vector2 position;
        public Vector2 realPosition;

        public Component parent;

        public void Draw(GameTime gameTime) {
            if (!(parent is null))
            {
                realPosition = new Vector2(parent.position.X + position.X, parent.position.Y + position.Y);
            }
            else
            {
                realPosition = position;
            }
            DrawObject(gameTime);
        }

        public void Update(GameTime gameTime) {
            UpdateObject(gameTime);
        }

        public abstract void DrawObject(GameTime gameTime);

        public abstract void UpdateObject(GameTime gameTime);

    }
}
