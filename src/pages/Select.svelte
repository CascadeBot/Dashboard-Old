<script>
  import { Link } from "svelte-routing";
  import { onDestroy } from 'svelte';
  import { getClient, query } from 'svelte-apollo';
  import { gql } from "apollo-boost";

  import SelectItem from "../components/layout/select/SelectItem.svelte";
  import SelectWrapper from "../components/layout/select/SelectWrapper.svelte";
  import AddServerCard from "../components/layout/select/AddServerCard.svelte";

  const GUILDS_QUERY = gql`
    query {
      Guilds {
        id
        Meta {
          name
          iconURL
          memberCount
        }
      }
    }
  `

  let servers = [];
  const getData = (res) => {
    servers = res.data.Guilds;
  };

  let serverPromise;
  let unsub = query(getClient(), { query: GUILDS_QUERY }).subscribe((prom) => {
    serverPromise = prom;
    serverPromise.then(getData);
  });

  onDestroy(unsub);

  let isBigList;
  $: isBigList = servers.length > 5
</script>

<template>
  <div class="page-select">
    <h1 class="h2">Select your server</h1>
    {#await serverPromise}
      <p>Loading servers</p>
    {:then res}
    <SelectWrapper {isBigList}>
      {#each servers as {id, Meta}}
        <SelectItem {isBigList} {id} name={Meta.name} iconUrl={Meta.iconURL} memberCount={Meta.memberCount}/>
      {/each}
    </SelectWrapper>
    <AddServerCard {isBigList}/>
    {/await}
  </div>
</template>

<style lang="scss">
  .page-select {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 4rem;
    max-width: 100%;

    h1 {
      margin-bottom: 3rem;
    }
  }
</style>
