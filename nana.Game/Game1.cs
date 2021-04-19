using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.IO;
using nanaGame.Screens;
using nanaGame.Screens.Menu;
using System;
using System.Collections.Generic;
using nanaGame.Beatmap;

namespace nanaGame
{
    public class Game1 : Game
    {
        private SpriteBatch _spriteBatch;
        private GraphicsDeviceManager _graphics;
        private NanaScreens nanaScreens;

        public Game1()
        {
            _graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
        }

        protected override void Initialize()
        {
            // TODO: Add your initialization logic here

            base.Initialize();
        }

        protected override void LoadContent()
        {
            _spriteBatch = new SpriteBatch(GraphicsDevice);

            GlobalVar.SpriteBatch = _spriteBatch;
            GlobalVar.Graphic = _graphics;
            GlobalVar.Content = Content;

            var beatmaps = new BeatmapReader().GetBeatmapsData();
            BeatmapsState.Beatmaps = beatmaps;

            if (beatmaps.Count > 0)
            {
                BeatmapsState.CurrentBeatmapIndex = 0;
                BeatmapsState.CurrentBeatmap = beatmaps[0];
            }

            nanaScreens = new NanaScreens(this);

            // TODO: use this.Content to load your game content here
        }

        protected override void Update(GameTime gameTime)
        {
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
                Exit();

            nanaScreens.Update(gameTime);

            // TODO: Add your update logic here

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            nanaScreens.Draw(gameTime);

            base.Draw(gameTime);
        }
    }
}
