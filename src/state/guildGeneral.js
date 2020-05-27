import { writable } from "svelte/store";
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

const matches = (obj, source) => {
  return Object.keys(source).every(key => {
    return obj.hasOwnProperty(key) && obj[key] === source[key]
  });
}

// returns object with only keys that are different from source
const diff = (changes, source) => Object.keys(changes).filter(key => changes[key] !== source[key]).reduce((acc, key) => { acc[key] = changes[key]; return acc; }, {})

const defaultChanges = {
  useEmbedForMessages: false,
  deleteCommand: false,
  mentionPrefix: false,
  prefix: ";"
}

const defaultState = {
  loading: true,
  data: {},
  error: false,
  changes: {...defaultChanges},
  hasChanges: false
};

function guildGeneralStore(client, id) {
  const store = writable({...defaultState})
  const { subscribe, set, update } = store
  const ctx = {
    id,
    client,
  };
  let firstTime = true

  return {
    subscribe,
    fetch: async () => {
      if (!firstTime) return
      await fetch(store, ctx)
      firstTime = false
    },
    set: (newStore) => {
      if (newStore.loading == false)
        newStore.hasChanges = !matches(newStore.changes, newStore.data);
      return set(newStore);
    },
    resetChanges: () => {
      update((old) => {
        old.hasChanges = false;
        old.changes = {...old.data};
        return old;
      });
    },
    saveChanges: (newSettings) => saveChanges(store, ctx, newSettings),
    reset: () => reset(store),
  };
}

async function fetch({ set }, { client, id }) {
  try {
    const res = await query(client, {
      query: GUILD_GENERAL_QUERY,
      variables: {
        id,
      },
    }).result();
    set({
      ...defaultState,
      changes: {...res.data.Guild.Settings},
      data: res.data.Guild.Settings,
      loading: false,
    });
  } catch (e) {
    set({
      ...defaultState,
      changes: {...defaultChanges},
      error: e,
    });
  }
  return;
}

async function saveChanges({ update }, {client, id}, store) {
  const res = await mutateGQL(client, {
    mutation: GUILD_SETTINGS_UPDATE,
    variables: {
      id,
      input: diff(store.changes, store.data),
    },
  });
  update((old) => ({
    ...old,
    data: {
      ...old.data,
      ...res.data.UpdateGuildSettings,
    },
    changes: {...res.data.UpdateGuildSettings},
    hasChanges: false
  }));
}

function reset({ subscribe, set, update }) {
  set({
    ...defaultState,
    changes: {...defaultChanges}
  });
  return;
}

export const makeGuildGeneralStore = guildGeneralStore;
