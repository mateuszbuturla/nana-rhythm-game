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
using nanaGame.Beatmap;
using nanaGame.GameObjects.Text;
using nanaGame.GameObjects.Container;

namespace nanaGame.Screens.Menu
{
    public class BeatmapSelection : Scene
    {
        Game1 game;
        NanaUtils utils;
        private List<Component> _components = new List<Component>();
        private List<BeatmapEntity> beatmaps;
        SpriteFont font;
        BeatmapsContainer beatmapContainer;

        public BeatmapSelection(Game1 game) : base(game)
        {
<<<<<<< Updated upstream
            beatmaps = new BeatmapReader().GetBeatmapsData();
            BeatmapsState.Beatmaps = beatmaps;
            font = GlobalVar.Content.Load<SpriteFont>("Font");

            var i = 1;
            foreach (BeatmapEntity beatmap in beatmaps)
=======
            beatmapContainer = new BeatmapsContainer() {
                position = new Vector2(200, 200),
            };

            font = GlobalVar.Content.Load<SpriteFont>("Font");

            _components.Add(beatmapContainer);
            /*
            List<BeatmapEntity> beatmaps = BeatmapsState.Beatmaps;

            for (int i = 0; i < beatmaps.Count; i++)
>>>>>>> Stashed changes
            {
                Console.WriteLine(i);
                BeatmapEntity beatmap = beatmaps[i];

                var newBeatmap = new Text(beatmap.Title, font, Color.White)
                {
                    originalPosition = new Vector2(100, i * 100),
                };
                _components.Add(newBeatmap);
<<<<<<< Updated upstream
                i++;
            }
=======
            }*/
>>>>>>> Stashed changes
        }

        public override void Draw(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Begin();
            foreach (var component in _components)
            {
                component.Draw(gameTime);
            }
            GlobalVar.SpriteBatch.End();
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
