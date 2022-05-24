import { SupabaseClient, User } from '@supabase/supabase-js';
import { createContext } from 'react';
import { supabase } from './supabaseClient';

type SupabaseContext = {
  sb: SupabaseClient;
  user: User | null;
};

export const UserContext = createContext<SupabaseContext>({
  sb: supabase,
  user: null,
});
