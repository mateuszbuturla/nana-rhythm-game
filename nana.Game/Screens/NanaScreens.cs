﻿using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using nanaGame.Screens.Menu;

namespace nanaGame.Screens
{
    public class NanaScreens
    {
        private NanaScreensTypes currentScene = NanaScreensTypes.MainMenu;
        private MainMenu menu;
        private BeatmapSelection beatmapSelection;

        public NanaScreens (Game1 game)
        {
            menu = new MainMenu(game);
            beatmapSelection = new BeatmapSelection(game);
        }

        public void ChangeScene(NanaScreensTypes scene)
        {
            currentScene = scene;
        }

        public void Draw (GameTime gameTime)
        {
            switch(currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Draw(gameTime);
                    break;
                case NanaScreensTypes.Game:
                    beatmapSelection.Draw(gameTime);
                    break;
                case NanaScreensTypes.BeatmapSelection:
                    
                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }

        public void Update (GameTime gameTime)
        {
            switch (currentScene)
            {
                case NanaScreensTypes.MainMenu:
                    menu.Update(gameTime);
                    break;
                case NanaScreensTypes.Game:
                    beatmapSelection.Update(gameTime);
                    break;
                case NanaScreensTypes.BeatmapSelection:

                    break;
                case NanaScreensTypes.ResultScreen:
                    break;
            }
        }
    }
}
