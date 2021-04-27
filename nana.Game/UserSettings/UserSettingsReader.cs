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

        public List<UserSettingEntity> GetUserSettings ()
        {
            List<UserSettingEntity> settings = new List<UserSettingEntity>();
            
            try {
                string[] userSettingsFile =  File.ReadAllText(settingsFilePath).Split("\n");

                foreach (string setting in userSettingsFile)
                {
                    string[] splittedSetting = setting.Split('=');

                    UserSettingEnum settingType = (UserSettingEnum)Enum.Parse(typeof(UserSettingEnum), splittedSetting[0], true);

                    settings.Add(new UserSettingEntity(settingType, splittedSetting[1]));
                }

                return settings;
            }
            catch {
                if (!File.Exists(settingsFilePath))
                {
                    using (FileStream fs = File.Create(settingsFilePath));
                }

                return settings;
            }
        }
    }
}
