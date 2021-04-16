using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using nanaGame.Utils;

namespace nanaGame.Screens.Menu
{
    class MainMenu
    {
        NanaUtils utils;
        SpriteBatch _spriteBatch;
        GraphicsDevice _graphicsDevice;
        Button playButton;

        public MainMenu (GraphicsDevice _graphicsDevice)
        {
            this.utils = new NanaUtils();
            this._spriteBatch = new SpriteBatch(_graphicsDevice);
            this._graphicsDevice = _graphicsDevice;
            this.playButton = new Button(utils.LoadTextureFromFile("assets/playButton.png", _graphicsDevice), new Vector2(100, 100));
        }

        public void Draw ()
        {
            playButton.Draw(_spriteBatch);
        }
    }
}
