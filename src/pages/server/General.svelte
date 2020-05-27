<script>
  import { getContext, setContext } from 'svelte';

  import Section from "../../components/layout/Section.svelte"
  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"
  import Button from "../../components/Button.svelte"

  let { guildData, guildGeneral } = getContext("current");
  let servers = getContext("guilds");
  guildGeneral.fetch();

  let originalState = {
    embed: false,
    deleteAfter: false,
    mentionPrefix: false,
    first_render: true
  };
  let boolSettings;

  function resetBoolSettings() {
    boolSettings = {...originalState};
  }

  const matches = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
  let isModified = false;

  $: if (!$guildGeneral.loading) {
    if (originalState.first_render) {
      originalState = {};
      originalState.embed = $guildGeneral.data.useEmbedForMessages;
      originalState.deleteAfter = $guildGeneral.data.deleteCommand;
      originalState.mentionPrefix = $guildGeneral.data.mentionPrefix;
      resetBoolSettings();
    }

    isModified = !matches(originalState, boolSettings);
  }
  resetBoolSettings();
</script>

<template>
  {#if ($guildGeneral.loading || $guildData.loading || $servers.loading)}
    loading ...
  {:else}
    <Section>
      <Breadcrumb parts={[$guildData.Meta.name, "General"]} />
      <Headline>General settings</Headline>
      <Toggle bind:state={boolSettings.embed}>Show embedded messages</Toggle>
      <Toggle bind:state={boolSettings.deleteAfter}>Delete message after command</Toggle>
      <Toggle bind:state={boolSettings.mentionPrefix}>Show prefix when mentioning the bot</Toggle>
      <br>
      {#if isModified}
        <Button>Save</Button>
        <Button type="no-border" on:click={resetBoolSettings}>Reset</Button>
      {/if}
    </Section>
  {/if}
</template>
