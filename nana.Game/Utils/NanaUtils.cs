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
    }
}
