import { changeStore } from "./changeStore";
import { query, mutate as mutateGQL } from "svelte-apollo";
import { gql } from "apollo-boost";

const GUILD_GENERAL_QUERY = gql`
  query Guild($id: UUID!) {
    Guild(id: $id) {
      Settings {
        mentionPrefix
        deleteCommand
        useEmbedForMessages
        prefix
      }
    }
  }
`;

const GUILD_SETTINGS_UPDATE = gql`
  mutation UpdateGuildSettings($id: UUID!, $input: GuildSettingsInput!) {
    UpdateGuildSettings(id: $id, input: $input) {
      mentionPrefix
      deleteCommand
      useEmbedForMessages
      prefix
    }
  }
`;

// returns object with only keys that are different from source
const diff = (changes, source) => Object.keys(changes).filter(key => changes[key] !== source[key]).reduce((acc, key) => { acc[key] = changes[key]; return acc; }, {})

const defaultChanges = {
  useEmbedForMessages: false,
  deleteCommand: false,
  mentionPrefix: false,
  prefix: ";"
}

function guildGeneralStore(client, id) {
  const store = changeStore(defaultChanges, {
    client,
    id
  });
  const { subscribe, set, update, get, resetChanges, reset} = store;

  return {
    subscribe,
    set,
    update,
    get,
    resetChanges,
    reset,
    fetch: () => fetch(store),
    saveChanges: (newSettings) => saveChanges(store, newSettings),
  };
}

async function fetch({ get, ctx, resetChanges, setFetched }) {
  if (get().fetched) return
  const { client, id } = ctx();
  try {
    const res = await query(client, {
      query: GUILD_GENERAL_QUERY,
      variables: {
        id,
      },
    }).result();
    setFetched({
      ...get().data,
      ...res.data.Guild.Settings
    })
  } catch (e) {
    resetChanges({
      error: e,
    });
  }
  return;
}

async function saveChanges({ get, setFetched, ctx }) {
  const { client, id } = ctx();
  const state = get();
  const res = await mutateGQL(client, {
    mutation: GUILD_SETTINGS_UPDATE,
    variables: {
      id,
      input: diff(state.changes, state.data),
    },
  });
  setFetched({
    ...get().data,
    ...res.data.UpdateGuildSettings
  })
}

export const makeGuildGeneralStore = guildGeneralStore;
