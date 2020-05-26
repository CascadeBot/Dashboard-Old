<script>
  import { setContext } from 'svelte';
  import { user } from "./state/user";
  import App from "./App.svelte"

  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';

  const client = new ApolloClient({ uri: `${WEB.API_URL}/graphql`,  credentials: 'include' });
  setClient(client);

  user.fetch(client);
  setContext("user", user);

  $: if ($user.error) {
    window.location = `${WEB.API_URL}/auth/login`
  }
</script>


<template>
  {#if $user.loading}
    Loading...
  {:else}
    <App/>
  {/if}
</template>
