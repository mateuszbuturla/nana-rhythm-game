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

namespace nanaGame.Screens.Menu
{
    public class BeatmapSelection : Scene
    {
        private List<Component> _components = new List<Component>();
        SpriteFont font;

        public BeatmapSelection(Game1 game) : base(game)
        {
            font = GlobalVar.Content.Load<SpriteFont>("Font");
            List<BeatmapEntity> beatmaps = BeatmapsState.Beatmaps;

            foreach (BeatmapEntity beatmap in beatmaps)
            {
                var newBeatmap = new Text(beatmap.Title, new Vector2(100, 100), font, Color.White);
                _components.Add(newBeatmap);
            }
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
            
        }

        public override void PostUpdate(GameTime gameTime)
        {
            // remove sprites if they're not needed
        }
    }
}
