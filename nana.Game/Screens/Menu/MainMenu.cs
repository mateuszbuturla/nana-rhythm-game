using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Content;
using nanaGame.Utils;
using nanaGame.GameObjects;
using System;
using System.Collections.Generic;

namespace nanaGame.Screens.Menu
{
    public class MainMenu : Scene
    {
        Game1 game;
        NanaUtils utils;
        private List<Component> _components;

        public MainMenu (Game1 game, GraphicsDevice graphicsDevice, ContentManager content) : base(game, graphicsDevice, content)
        {
            this.game = game;
            utils = new NanaUtils();

            var playButtonTexture = utils.LoadTextureFromFile("assets/playButton.png", _graphicsDevice);

            var playButton = new Button(playButtonTexture)
            {
                position = new Vector2(200, 400),
                scale = utils.GetScale(graphicsDevice),
            };
            playButton.Click += PlayButtonClick;

            _components = new List<Component>()
            {
                playButton,
            };
        }

        private void PlayButtonClick (object sender, EventArgs e)
        {
           
        }

        public override void Draw (GameTime gameTime, SpriteBatch spriteBatch)
        {
            spriteBatch.Begin();
            foreach (var component in _components)
            {
                component.Draw(gameTime, spriteBatch);
            }
            spriteBatch.End();
        }

        public override void Update(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Update(gameTime);
            }
        }

        public override void PostUpdate(GameTime gameTime)
        {
            // remove sprites if they're not needed
        }
    }
}
