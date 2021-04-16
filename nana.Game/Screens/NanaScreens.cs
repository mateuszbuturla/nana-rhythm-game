using Microsoft.Xna.Framework.Graphics;
using nanaGame.Utils;

namespace nanaGame.Screens
{
    class NanaScreens
    {
        private NanaUtils utils;
        private SpriteBatch _spriteBatch;
        private GraphicsDevice _graphicsDevice;
        private NanaScreensTypes currentScene = NanaScreensTypes.MainMenu;

        public NanaScreens (GraphicsDevice _graphicsDevice)
        {
            this.utils = new NanaUtils();
            this._spriteBatch = new SpriteBatch(_graphicsDevice);
            this._graphicsDevice = _graphicsDevice;
        }

        public void draw ()
        {
            switch(currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    break;
                case NanaScreensTypes.Game:
                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }
    }
}
