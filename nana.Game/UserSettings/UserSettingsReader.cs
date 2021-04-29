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

        public UserSettingEntity FindSetting(List<UserSettingEntity> settings, UserSettingEnum setting)
        {
            UserSettingEntity toReturn = null;

            for (int i = 0; i < settings.Count; i++)
            {
                if (settings[i].Setting == setting)
                {
                    toReturn = settings[i];
                    break;
                }
            }
            return toReturn;
        }

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
                    using (FileStream fs = File.Create(settingsFilePath))
                    {
                        byte[] newSettings = new UTF8Encoding(true).GetBytes("SHOW_HIT_NOTES_ACCURACY=1\nSHOW_PERFECT_NOTE_ACCURACY=1");
                        fs.Write(newSettings, 0, newSettings.Length);
                    };
                }

                return settings;
            }
        }
    }
}
