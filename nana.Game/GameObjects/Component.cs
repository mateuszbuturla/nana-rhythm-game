using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace nanaGame.GameObjects
{
    public abstract class Component
    {

        public Vector2 position;
        public abstract void Draw(GameTime gameTime, SpriteBatch spriteBatch);

        public abstract void Update(GameTime gameTime);
    }
}
