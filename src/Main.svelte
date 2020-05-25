<script>
  import { Router, Link, Route } from "svelte-routing";
  import { onDestroy } from 'svelte';

  import ApolloClient from 'apollo-boost';
  import { setClient, query } from 'svelte-apollo';
  import { gql } from "apollo-boost";

  import App from "./App.svelte"

  const client = new ApolloClient({ uri: `${WEB.API_URL}/graphql`,  credentials: 'include' });
  setClient(client);

  const USER_QUERY = gql`
    query {
      Me {
        Discord {
          username
        }
        Patreon {
          linked
          tier
        }
      }
    }
  `

  let userRequest = null;
  const unsub = query(client, { query: USER_QUERY }).subscribe((promise) => {
    userRequest = promise;
  });
  onDestroy(unsub);

  userRequest.catch((err) => {
    window.location = `${WEB.API_URL}/auth/login`
  });
</script>


<template>
  {#await userRequest}
    Loading...
  {:then {data}}
    <App user={data.Me}/>
  {/await}
</template>
