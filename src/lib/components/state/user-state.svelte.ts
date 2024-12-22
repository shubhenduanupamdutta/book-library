import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

interface UserStateProps {
	session: Session | null;
	supabase: SupabaseClient | null;
	user: User | null;
}

export class UserState {
	session = $state<Session | null>(null);
	supabase = $state<SupabaseClient | null>(null);
	user = $state<User | null>(null);

	constructor(data: UserStateProps) {
		this.updateState(data);
	}

	// To update the state of the user upon any change
	updateState(data: UserStateProps) {
		this.session = data.session;
		this.supabase = data.supabase;
		this.user = data.user;
	}

    async logout() {
        await this.supabase?.auth.signOut();
    }
}

// To make sure that the user state is the same across the app
const USER_STATE_KEY = Symbol('USER_STATE');

// To make sure that that user state isn't different upon new instantiation
export function setUserState(data: UserStateProps) {
	return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
	return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}

// const userState = new UserState({session, supabase, user});
