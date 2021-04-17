using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;
using System.IO;

namespace nanaGame.Utils
{
    class NanaUtils
    {
        public Texture2D LoadTextureFromFile(string filename, GraphicsDevice GraphicsDevice)
        {
            using (var stream = File.OpenRead(filename))
            {
                return Texture2D.FromStream(GraphicsDevice, stream);
            }
        }


        public Vector2 GetScale (GraphicsDevice graphicsDevice)
        {
            var scaleX = (float) graphicsDevice.Viewport.Width / 1920;
            var scaleY = (float)graphicsDevice.Viewport.Height / 1080;

            return new Vector2(scaleX, scaleY);
        }
    }
}
