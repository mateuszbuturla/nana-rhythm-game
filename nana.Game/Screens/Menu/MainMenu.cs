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
using nanaGame.GameObjects.Background;
using nanaGame.GameObjects.Logo;

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

            var playButtonTexture = GlobalVar.Content.Load<Texture2D>("mainMenuPlayButton");
            var multiplayerButtonTexture = GlobalVar.Content.Load<Texture2D>("mainMenuMultiplayerButton");
            var editorButtonTexture = GlobalVar.Content.Load<Texture2D>("mainMenuEditorButton");
            var settingsButtonTexture = GlobalVar.Content.Load<Texture2D>("mainMenuSettingsButton");
            var exitButtonTexture = GlobalVar.Content.Load<Texture2D>("mainMenuExitButton");
            var buttonTextureWidth = playButtonTexture.Width;

            var scale = utils.GetScale();

            var uiBackground = new UiBackground()
            {
                scale = scale,
            };

            var playButton = new Button(playButtonTexture, "Play")
            {
                position = new Vector2(0, gameHeight - (300 * scale.Y)),
                scale = scale,
            };
            playButton.Click += PlayButtonClick;

            var multiplayerButton = new Button(multiplayerButtonTexture, "Multiplayer")
            {
                position = new Vector2(buttonTextureWidth * scale.X, gameHeight - (300 * scale.Y)),
                scale = scale,
            };
            playButton.Click += PlayButtonClick;

            var editorButton = new Button(editorButtonTexture, "Editor")
            {
                position = new Vector2(buttonTextureWidth * scale.X * 2, gameHeight - (300 * scale.Y)),
                scale = scale,
            };
            editorButton.Click += EditorButtonClick;

            var settingsButton = new Button(settingsButtonTexture, "Settings")
            {
                position = new Vector2(buttonTextureWidth * scale.X * 3, gameHeight - (300 * scale.Y)),
                scale = scale,
            };
            settingsButton.Click += SettignsButtonClick;

            var exitButton = new Button(exitButtonTexture, "Exit")
            {
                position = new Vector2(buttonTextureWidth * scale.X * 4, gameHeight - (300 * scale.Y)),
                scale = scale,
            };
            exitButton.Click += ExitButtonClick;

            var logo = new MainMenuLogo()
            {
                position = new Vector2(gameWidth / 2, gameHeight / 2),
                scale = scale,
            };

            _components = new List<Component>()
            {
                uiBackground,
                logo,
                playButton,
                multiplayerButton,
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
            GlobalVar.NanaScreens.ChangeScene(NanaScreensTypes.BeatmapSelection);
        }

        private void EditorButtonClick(object sender, EventArgs e)
        {
            
        }

        private void SettignsButtonClick(object sender, EventArgs e)
        {
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
