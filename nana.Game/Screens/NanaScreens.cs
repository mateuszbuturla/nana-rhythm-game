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

        public NanaScreens (Game1 game)
        {
            menu = new MainMenu(game);
        }

        public void Draw (GameTime gameTime)
        {
            switch(currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Draw(gameTime);
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
