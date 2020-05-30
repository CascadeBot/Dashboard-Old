<script>
  import { getContext } from "svelte";

  import SelectItem from "../components/layout/select/SelectItem.svelte";
  import SelectWrapper from "../components/layout/select/SelectWrapper.svelte";
  import AddServerCard from "../components/layout/select/AddServerCard.svelte";

  let servers = getContext("guilds");

  let isBigList = false;
  $: if (!$servers.loading) {
    isBigList = $servers.data.length > 5
  }
</script>

<template>
  <div class="page-select">
    <h1 class="h2">Select your server</h1>
    <SelectWrapper {isBigList}>
      {#if $servers.loading}
        <SelectItem skeleton={true}></SelectItem>
        <SelectItem skeleton={true}></SelectItem>
        <SelectItem skeleton={true}></SelectItem>
      {:else}
        {#each $servers.data as {id, Meta}}
          <SelectItem {isBigList} {id} name={Meta.name} iconUrl={Meta.iconURL} memberCount={Meta.memberCount}/>
        {/each}
      {/if}
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
