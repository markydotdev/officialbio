import { supabase } from './supabaseClient';

export const addSocialToDb = async (
  provider: string,
  enabled: boolean,
  name: string,
  userId: string
) => {
  const dbUpdate = async (external) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(external)
      .eq('id', userId);
  };

  switch (provider) {
    case 'twitch':
      const twitchObj = {
        twitch: {
          id: userId,
          enabled: enabled,
          name: name,
        },
      };
      dbUpdate(twitchObj);
      break;
    case 'discord':
      const discordObj = {
        discord: {
          id: userId,
          enabled: enabled,
          name: name,
        },
      };
      dbUpdate(discordObj);
    default:
      break;
  }

  return;
};
