using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;
using System.IO;
using System.Collections.Generic;

namespace nanaGame.Utils
{
    class NanaUtils
    {
        public Texture2D LoadTextureFromFile(string filename)
        {
            using (var stream = File.OpenRead(filename))
            {
                return Texture2D.FromStream(GlobalVar.Graphic.GraphicsDevice, stream);
            }
        }

        public Vector2 GetScale ()
        {
            var scaleX = (float)GlobalVar.Graphic.GraphicsDevice.Viewport.Width / 1920;
            var scaleY = (float)GlobalVar.Graphic.GraphicsDevice.Viewport.Height / 1080;

            return new Vector2(scaleX, scaleY);
        }

        public string[] RemoveFromStringArrayByIndex (string[] array, int index)
        {
            var tempList = new List<string>(array);
            tempList.RemoveAt(index);
            return tempList.ToArray();
        }
    }
}
