<script>
  import { Link } from "svelte-routing";
  import { getContext } from 'svelte';
  import { getClient, query } from 'svelte-apollo';
  import { gql } from "apollo-boost";

  import SelectItem from "../components/layout/select/SelectItem.svelte";
  import SelectWrapper from "../components/layout/select/SelectWrapper.svelte";
  import AddServerCard from "../components/layout/select/AddServerCard.svelte";

  const client = getClient()

  const GUILDS_QUERY = gql`
    query {
      Guilds{
        id
        Meta{
          name
        }
      }
    }
  `
  const guildsReq = query(client, { query: GUILDS_QUERY })

  const servers = [{
    id: "1",
    name: "Cascade's Official Server",
    iconUrl: "https://cdn.discordapp.com/icons/488394590458478602/5bcbf789aa2e2a15eb2f457da397da4d.webp",
    memberCount: 42
  }, {
    id: "2",
    name: "Flares Conversation Corner",
    iconUrl: null,
    memberCount: 16
  }, {
    id: "3",
    name: "Zach heyde",
    iconUrl: "https://cdn.discordapp.com/icons/502281380466655233/d3a45025868cd68453839ee610098e53.webp",
    memberCount: 152
  }, {
    id: "2",
    name: "Flares Conversation Corner Flares Conversation Corner Flares Conversation Corner Flares Conversation Corner",
    iconUrl: null,
    memberCount: 16
  }, {
    id: "3",
    name: "Zach heyde",
    iconUrl: "https://cdn.discordapp.com/icons/502281380466655233/d3a45025868cd68453839ee610098e53.webp",
    memberCount: 152
  }]

  let isBigList;
  $: isBigList = servers.length > 5
</script>

<template>
  <div class="page-select">
    <!--
    {#await $guildsReq}
      Loading Guilds
    {:then res}
      {#if res.data.Guilds == null}
        has no guilds
      {/if}
    {:catch error}
      <pre>{error}</pre>
    {/await}
    -->
    <h1 class="h2">Select your server</h1>
    <SelectWrapper {isBigList}>
      {#each servers as {id, name, iconUrl, memberCount}}
        <SelectItem {isBigList} {id} {name} {iconUrl} {memberCount}/>
      {/each}
    </SelectWrapper>
    <AddServerCard {isBigList}/>
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
