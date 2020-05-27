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
    useEmbedForMessages: false,
    deleteCommand: false,
    mentionPrefix: false,
    first_render: true
  };
  let boolSettings;

  function resetBoolSettings() {
    boolSettings = {...originalState};
  }

  function resetFromState() {
    originalState = {};
    originalState.useEmbedForMessages = $guildGeneral.data.useEmbedForMessages;
    originalState.deleteCommand = $guildGeneral.data.deleteCommand;
    originalState.mentionPrefix = $guildGeneral.data.mentionPrefix;
    resetBoolSettings();
  }

  async function saveChanges() {
    guildGeneral.mutate(boolSettings).then((res) => {
      resetFromState();
    }).catch(e => {
      console.error(e);
      alert("failed to save");
    });
  }

  const matches = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);
  let isModified = false;

  $: if (!$guildGeneral.loading) {
    if (originalState.first_render) {
      resetFromState();
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
      <Toggle bind:state={boolSettings.useEmbedForMessages}>Show embedded messages</Toggle>
      <Toggle bind:state={boolSettings.deleteCommand}>Delete message after command</Toggle>
      <Toggle bind:state={boolSettings.mentionPrefix}>Show prefix when mentioning the bot</Toggle>
      <br>
      {#if isModified}
        <Button on:click={saveChanges}>Save</Button>
        <Button type="no-border" on:click={resetBoolSettings}>Reset</Button>
      {/if}
    </Section>
  {/if}
</template>
