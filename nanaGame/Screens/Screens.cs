using Raylib_cs;

namespace nanaGame.Screens
{
    class ScreensManager
    {
        public static void Draw ()
        {
            ScreensEnum currentScreen = ScreensEnum.BEATMAP_SELECTION;

            while (!Raylib.WindowShouldClose())
            {
                ChangeScreen(ref currentScreen);
                Raylib.BeginDrawing();
                Raylib.ClearBackground(Color.BLACK);
                switch(currentScreen)
                {
                    case ScreensEnum.MAIN_MENU:
                        Raylib.DrawText("Main menu", 12, 12, 20, Color.WHITE);
                        break;
                    case ScreensEnum.BEATMAP_SELECTION:
                        Raylib.DrawText("Beatmap selection", 12, 12, 20, Color.WHITE);
                        break;
                    case ScreensEnum.GAME:
                        Raylib.DrawText("Game", 12, 12, 20, Color.WHITE);
                        break;
                }

                Raylib.EndDrawing();
            }
        }

        public static void ChangeScreen (ref ScreensEnum currentScreen)
        {
            if (Raylib.IsKeyDown(KeyboardKey.KEY_ONE))
            {
                currentScreen = ScreensEnum.MAIN_MENU;
            }
            if (Raylib.IsKeyDown(KeyboardKey.KEY_TWO))
            {
                currentScreen = ScreensEnum.BEATMAP_SELECTION;
            }
            if (Raylib.IsKeyDown(KeyboardKey.KEY_THREE))
            {
                currentScreen = ScreensEnum.GAME;
            }
        }
    }
}
