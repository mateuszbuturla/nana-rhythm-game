using Raylib_cs;
using nanaGame.Screens;

namespace nanaGame
{
    static class Program
    {
        public static void Main()
        {
            Raylib.InitWindow(800, 480, "NaNa Rhythm Game");

            ScreensManager.Draw();

            Raylib.CloseWindow();
        }
    }
}