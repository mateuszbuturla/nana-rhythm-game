using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using nanaGame.Screens.Menu;

namespace nanaGame.Screens
{
    class NanaScreens
    {
        private NanaScreensTypes currentScene = NanaScreensTypes.MainMenu;
        private MainMenu menu;

        public NanaScreens (Game1 game, GraphicsDevice graphicsDevice, ContentManager content)
        {
            menu = new MainMenu(game, graphicsDevice, content);
        }

        public void Draw (GameTime gameTime, SpriteBatch spriteBatch)
        {
            switch(currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Draw(gameTime, spriteBatch);
                    break;
                case NanaScreensTypes.Game:
                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }

        public void Update (GameTime gameTime)
        {
            switch (currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Update(gameTime);
                    break;
                case NanaScreensTypes.Game:
                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }
    }
}
