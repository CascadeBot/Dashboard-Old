import { writable } from 'svelte/store';
import { query } from 'svelte-apollo';
import { gql } from "apollo-boost";

const USER_QUERY = gql`
query {
  Me {
    Discord {
      username
    }
    Patreon {
      linked
      tier
    }
  }
}
`

const defaultState = {
  loading: true,
  data: {},
  error: false
};

function userStore() {
	const { subscribe, set, update } = writable(defaultState);

	return {
    subscribe,
    fetch: async (client) => {
      try {
        const res = await query(client, { query: USER_QUERY }).result();
        set({
          data: res.data.Me,
          loading: false,
          error: false
        })
      } catch (e) {
        set({
          ...defaultState,
          error: e
        })
      }
    },
		reset: () => set(defaultState)
	};
}

export const user = userStore();
