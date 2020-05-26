import { writable } from 'svelte/store';

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

export function makeCurrentGuildStore(id) {
  return {
    guildData: guildDataStore(id)
  }
}
