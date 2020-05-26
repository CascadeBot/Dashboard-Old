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
  data: []
};

function guildsStore() {
	const { subscribe, set, update } = writable(defaultState);

	return {
    subscribe,
    call: async (client) => {
      const res = await query(client, { query: GUILDS_QUERY }).result();
      update(() => {
        const val = {};
        val.data = res.data.Guilds;
        val.loading = false;
        return val;
      })
    },
		reset: () => set(defaultState)
	};
}

export const guilds = guildsStore();
