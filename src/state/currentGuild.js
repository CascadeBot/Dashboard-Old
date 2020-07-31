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
    setServers: (guilds) => {
      update(() => {
        return guilds.find(val => val.id == id);
      });
    },
		reset: () => set(defaultState)
	};
}

export function makeCurrentGuildStore(client, id) {
  const { subscribe, set } = writable({
    guildData: guildDataStore(id),
    guildGeneral: makeGuildGeneralStore(client, id)
  });

  return {
    subscribe,
    setId(newid) {
      set({
        guildData: guildDataStore(newid),
        guildGeneral: makeGuildGeneralStore(client, newid)
      })
    }
  }
}
