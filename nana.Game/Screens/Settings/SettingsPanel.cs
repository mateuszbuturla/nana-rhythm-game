using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using nanaGame.Screens.Menu;
using System;

namespace nanaGame.Screens.Settings
{

    public class SettingsPanel
    {

        GraphicsDevice _graphicsDevice;
        Texture2D backgroundTexture;
        public bool isShow = false;
        int openSpeed = 45;

        public Vector2 scale { get; set; }

        Vector2 position;

        public SettingsPanel(GraphicsDevice graphicsDevice)
        {
            this._graphicsDevice = graphicsDevice;

            backgroundTexture = new Texture2D(graphicsDevice, 700, 1080);
            Color[] data = new Color[700 * 1080];
            for (int i = 0; i < data.Length; i++) data[i] = Color.Black;
            backgroundTexture.SetData(data);

            position = new Vector2(-700 * scale.X, 0);
            
            if (isShow)
            {
                position = new Vector2(0, 0);
            }
        }

        public void Draw(GameTime gameTime, SpriteBatch spriteBatch)
        {
            spriteBatch.Draw(backgroundTexture, position, new Rectangle(0,0, backgroundTexture.Width, backgroundTexture.Height), Color.White * 0.8f, 0, new Vector2(0,0), scale, SpriteEffects.None, 1);
        }

        public void Update(GameTime gameTime)
        {
            if (isShow && Keyboard.GetState().IsKeyDown(Keys.Escape))
            {
                Toggle();
            }

            if (isShow && position.X < 0)
            {
                position = new Vector2(position.X + openSpeed * scale.X, 0);
            }
            else if (!isShow && position.X > -700 * scale.X)
            {
                position = new Vector2(position.X - openSpeed * scale.X, 0);
            }
        }

        public void Toggle ()
        {
            isShow = !isShow;
        }
    }
}
