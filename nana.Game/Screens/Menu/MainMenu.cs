using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Content;
using nanaGame.Utils;
using nanaGame.GameObjects;
using System;
using System.Collections.Generic;
using nanaGame.GameObjects.Button;
using nanaGame.Screens.Settings;
using System.Data;
using System.Diagnostics;

namespace nanaGame.Screens.Menu
{
    public class MainMenu : Scene
    {
        Game1 game;
        NanaUtils utils;
        private List<Component> _components;
        private SettingsPanel _settingsPanel;

        public MainMenu (Game1 game) : base(game)
        {
            var graphicsDevice = GlobalVar.Graphic.GraphicsDevice;
            var content = GlobalVar.Content;

            var gameWidth = graphicsDevice.Viewport.Width;
            var gameHeight = graphicsDevice.Viewport.Height;
            this.game = game;
            utils = new NanaUtils();

            var playButtonTexture = utils.LoadTextureFromFile("assets/playButton.png");
            var editorButtonTexture = utils.LoadTextureFromFile("assets/editorButton.png");
            var settingsButtonTexture = utils.LoadTextureFromFile("assets/settingsButton.png");
            var exitButtonTexture = utils.LoadTextureFromFile("assets/exitButton.png");

            var scale = utils.GetScale();

            var playButton = new Button(playButtonTexture)
            {
                position = new Vector2(100, gameHeight / 2),
                scale = scale,
            };
            playButton.Click += PlayButtonClick;

            var editorButton = new Button(editorButtonTexture)
            {
                position = new Vector2(100 + playButtonTexture.Width * scale.X, gameHeight / 2),
                scale = scale,
            };
            editorButton.Click += EditorButtonClick;

            var settingsButton = new Button(settingsButtonTexture)
            {
                position = new Vector2(gameWidth - 100 - exitButtonTexture.Width * scale.X, gameHeight / 2),
                scale = scale,
            };
            settingsButton.Click += SettignsButtonClick;

            var exitButton = new Button(exitButtonTexture)
            {
                position = new Vector2(gameWidth - 100, gameHeight / 2),
                scale = scale,
            };
            exitButton.Click += ExitButtonClick;

            _components = new List<Component>()
            {
                playButton,
                editorButton,
                settingsButton,
                exitButton
            };

            _settingsPanel = new SettingsPanel()
            {
                scale = scale,
            };
        }

        private void PlayButtonClick (object sender, EventArgs e)
        {
           
        }
        private void EditorButtonClick(object sender, EventArgs e)
        {
            Console.WriteLine("test");
          //  var test = new Beatmap();

          //  Console.WriteLine(test);
        }

        private void SettignsButtonClick(object sender, EventArgs e)
        {
            Console.WriteLine("test");
            _settingsPanel.Toggle();
        }

        private void ExitButtonClick(object sender, EventArgs e)
        {
            game.Exit();
        }


        public override void Draw (GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Begin();
            foreach (var component in _components)
            {
                component.Draw(gameTime);
            }
            _settingsPanel.Draw(gameTime);
            GlobalVar.SpriteBatch.End();
        }

        public override void Update(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Update(gameTime);
            }
            _settingsPanel.Update(gameTime);
        }

        public override void PostUpdate(GameTime gameTime)
        {
            // remove sprites if they're not needed
        }
    }
}
