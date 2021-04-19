﻿using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System.Collections.Generic;
using nanaGame.GameObjects;
using nanaGame.GameObjects.Container;
using nanaGame.GameObjects.Text;
using nanaGame.GameObjects.Checkbox;
using nanaGame.Utils;

namespace nanaGame.Screens.Settings
{

    public class SettingsPanel : Container
    {
        private NanaUtils utils;
        private SpriteFont font;
        Texture2D backgroundTexture;
        public bool isShow = false;
        int openSpeed = 45;

        public Vector2 scale { get; set; }

        public SettingsPanel()
        {
            utils = new NanaUtils();

            font = GlobalVar.Content.Load<SpriteFont>("Font");

            backgroundTexture = new Texture2D(GlobalVar.Graphic.GraphicsDevice, 700, 1080);
            Color[] data = new Color[700 * 1080];
            for (int i = 0; i < data.Length; i++) data[i] = Color.Black;
            backgroundTexture.SetData(data);

            position = new Vector2(-700 * scale.X, 0);
            
            if (isShow)
            {
                position = new Vector2(0, 0);
            }

            Init();
        }

        private void Init ()
        {
            var graphicDevice = GlobalVar.Graphic.GraphicsDevice;
            var scale = utils.GetScale();

            var settingsTabelText = new Text("Settings", font, Color.White, this)
            {
                originalPosition = new Vector2(25, 50),
            };

            var hitHittedNotesAccuracyCheckbox = new Checkbox("Show hit notes accuracy", parent: this)
            {
                scale = scale,
                originalPosition = new Vector2(25, 120),
            };

            _components = new List<Component>()
            {
                settingsTabelText,
                hitHittedNotesAccuracyCheckbox
            };
        }

        public override void Draw(GameTime gameTime)
        {
            GlobalVar.SpriteBatch.Draw(backgroundTexture, position, new Rectangle(0,0, backgroundTexture.Width, backgroundTexture.Height), Color.White * 0.8f, 0, new Vector2(0,0), scale, SpriteEffects.None, 1);
            foreach (var component in _components)
            {
                component.Draw(gameTime);
            }
        }

        public override void Update(GameTime gameTime)
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

            foreach (var component in _components)
            {
                component.Update(gameTime);
            }
        }

        public void Toggle ()
        {
            isShow = !isShow;
        }
    }
}