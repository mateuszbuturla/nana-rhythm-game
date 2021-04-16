using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace nanaGame.Screens.Menu
{
    class Button
    {

        Vector2 position;
        Texture2D texture;

        public Button(Texture2D texture, Vector2 position)
        {
            this.texture = texture;
            this.position = position;
        }

        public void Draw(SpriteBatch _spriteBatch)
        {
            _spriteBatch.Begin();
            _spriteBatch.Draw(texture, position, Color.White);
            _spriteBatch.End();
        }
    }
}
