namespace nanaGame.UserSettings
{
    public enum UserSettingEnum
    {
        SHOW_HIT_NOTES_ACCURACY,
        SHOW_PERFECT_NOTE_ACCURACY
    }

    public class UserSettingEntity
    {
        UserSettingEnum setting;
        string settingValue;

        public UserSettingEntity(UserSettingEnum setting, string settingValue)
        {
            this.setting = setting;
            this.settingValue = settingValue;
        }

        public UserSettingEnum Setting
        {
            get { return setting; }
            set { setting = value; }
        }

        public string Value
        {
            get { return settingValue; }
            set { settingValue = value; }
        }
    }
}
