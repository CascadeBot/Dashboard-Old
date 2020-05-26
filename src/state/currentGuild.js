import { writable } from 'svelte/store';

import { makeGuildGeneralStore } from "./guildGeneral"

const defaultState = {
  Meta: {
    name: "..."
  }
}

function guildDataStore(id) {
  const { subscribe, set, update } = writable(defaultState);

	return {
    subscribe,
    setId: (guilds) => {
      update(() => {
        return guilds.find(val => val.id == id);
      });
    },
		reset: () => set(defaultState)
	};
}

export function makeCurrentGuildStore(client, id) {
  return {
    guildData: guildDataStore(id),
    guildGeneral: makeGuildGeneralStore(client, id)
  }
}
