using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Collections.Generic;

namespace nanaGame.GameObjects.Container
{
    public class Container : Component
    {
        public List<Component> _components;

        public Vector2 position { get; set; }

        public override void Draw(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Draw(gameTime);
            }
        }

        public override void Update(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Update(gameTime);
            }
        }
    }
}
