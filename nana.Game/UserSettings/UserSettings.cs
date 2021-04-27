using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using nanaGame.Utils;

namespace nanaGame.UserSettings
{

    class UserSettingsReader
    {
        private string settingsFilePath = Directory.GetCurrentDirectory() + "/settings.cfg";

        public List<String> GetUserSettings ()
        {
            List<String> settings = new List<String>();
            
            try {
                string[] userSettingsFile =  File.ReadAllText(settingsFilePath).Split("\n");

                return settings;
            }
            catch {
                if !(File.Exists(settingsFilePath))
                {
                    using (FileStream fs = File.Create(settingsFilePath));
                }

                return settings;
            }
        }
    }
}
