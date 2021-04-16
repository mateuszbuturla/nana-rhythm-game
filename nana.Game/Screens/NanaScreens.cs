using Microsoft.Xna.Framework.Graphics;
using nanaGame.Screens.Menu;

namespace nanaGame.Screens
{
    class NanaScreens
    {
        public SpriteBatch _spriteBatch;
        private GraphicsDevice _graphicsDevice;
        private NanaScreensTypes currentScene = NanaScreensTypes.MainMenu;
        private MainMenu menu;

        public NanaScreens (GraphicsDevice _graphicsDevice)
        {
            this._spriteBatch = new SpriteBatch(_graphicsDevice);
            this._graphicsDevice = _graphicsDevice;
            this.menu = new MainMenu(_graphicsDevice);
        }

        public void draw ()
        {
            switch(currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Draw();
                    break;
                case NanaScreensTypes.Game:
                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }
    }
}
