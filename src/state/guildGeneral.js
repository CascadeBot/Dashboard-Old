import { writable } from 'svelte/store';
import { query } from 'svelte-apollo';
import { gql } from "apollo-boost";

const GUILD_GENERAL_QUERY = gql`
  query Guild($id: UUID!) {
    Guild(id: $id) {
      Settings {
        mentionPrefix
        deleteCommand
        useEmbedForMessages
      }
    }
  }
`

const defaultState = {
  loading: true,
  data: {},
  error: false
};

function guildGeneralStore(client, id) {
	const { subscribe, set, update } = writable(defaultState);

  let firstTime = true;

	return {
    subscribe,
    fetch: async () => {
      if (!firstTime)
        return;
      try {
        const res = await query(client, {
          query: GUILD_GENERAL_QUERY,
          variables: {
            id
          }
        }).result();
        update(() => {
          const val = {};
          val.data = res.data.Guild.Settings;
          val.loading = false;
          val.error = false;
          return val;
        })
        firstTime = false;
      } catch (e) {
        update(() => {
          console.log(e);
          const val = {...defaultState};
          val.loading = false;
          val.error = e;
          return val;
        })
      }
    },
		reset: () => set(defaultState)
	};
}

export const makeGuildGeneralStore = guildGeneralStore;
