using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace nanaGame.Screens
{
    public abstract class Scene
    {
        protected ContentManager _content;

        protected GraphicsDevice _graphicsDevice;

        protected Game1 _game;

        public abstract void Draw(GameTime gameTime);

        public abstract void PostUpdate(GameTime gameTime);

        public Scene(Game1 game)
        {
            _game = game;

            _graphicsDevice = GlobalVar.Graphic.GraphicsDevice;

            _content = GlobalVar.Content;
        }

        public abstract void Update(GameTime gameTime);
    }
}
