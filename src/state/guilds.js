import { writable } from 'svelte/store';
import { query } from 'svelte-apollo';
import { gql } from "apollo-boost";

const GUILDS_QUERY = gql`
  query {
    Guilds {
      id
      Meta {
        name
        iconURL
        memberCount
      }
    }
  }
`

const defaultState = {
  loading: true,
  data: [],
  error: false
};

function guildsStore() {
	const { subscribe, set, update } = writable(defaultState);

	return {
    subscribe,
    fetch: async (client) => {
      try {
        const res = await query(client, { query: GUILDS_QUERY }).result();
        set({
          data: res.data.Guilds,
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

export const guilds = guildsStore();
