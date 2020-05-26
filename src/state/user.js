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
    call: async (client) => {
      try {
        const res = await query(client, { query: USER_QUERY }).result();
        update(() => {
          const val = {};
          val.data = res.data.Me;
          val.loading = false;
          val.error
          return val;
        })
      } catch (e) {
        update(() => {
          const val = {...defaultState};
          val.error = e;
          return val;
        })
      }
    },
		reset: () => set(defaultState)
	};
}

export const user = userStore();
