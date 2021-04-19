using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.Collections.Generic;
using nanaGame.GameObjects;
using nanaGame.GameObjects.Container;
using nanaGame.GameObjects.Text;
using nanaGame.GameObjects.Checkbox;
using nanaGame.Utils;
using nanaGame.Beatmap;
using System;

namespace nanaGame.Screens.Menu
{

    public class BeatmapsContainer : Container
    {
        private NanaUtils utils;
        private SpriteFont font;

        public Vector2 scale { get; set; }

        public BeatmapsContainer()
        {
            font = GlobalVar.Content.Load<SpriteFont>("Font");

            Init();
        }

        private void Init()
        {
            _components = new List<Component>();

            List<BeatmapEntity> beatmaps = BeatmapsState.Beatmaps;

            for (int i = 0; i < beatmaps.Count; i++)
            {
                BeatmapEntity beatmap = beatmaps[i];
                var newBeatmap = new Text(beatmap.Title, font, Color.White, this)
                {
                    originalPosition = new Vector2(100, (i + 1) * 100),
                };
                _components.Add(newBeatmap);
            }
        }

        public override void Draw(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Draw(gameTime);
            }
        }

        public override void Update(GameTime gameTime)
        {
            foreach (var component in _components)
            {
                component.Update(gameTime);
            }
        }
    }
}
