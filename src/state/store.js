import { writable, get } from 'svelte/store';

const  {subscribe, set, _update} = writable({
  loggedIn: false
})


// if not in localstorage: request backend to see if login
// if not send to login page
// if yes put in local storage
// if login fucky wucky later yeet out storage and send to login

export const userStore = {
    subscribe,
    set
}
