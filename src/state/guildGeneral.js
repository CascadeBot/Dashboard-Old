import { writable } from 'svelte/store';
import { query } from 'svelte-apollo';
import { gql } from "apollo-boost";

const GUILDS_QUERY = gql`
  query {
    Guild {
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
  data: {},
  error: false
};

function guildGeneralStore() {
	const { subscribe, set, update } = writable(defaultState);

	return {
    subscribe,
    fetch: async (client) => {
      try {
        const res = await query(client, { query: GUILDS_QUERY }).result();
        update(() => {
          const val = {};
          val.data = res.data.Guilds;
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

export const guilds = guildGeneralStore();
