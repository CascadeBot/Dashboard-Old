<script>
  import { getContext, setContext } from 'svelte';

  import Section from "../../components/layout/Section.svelte"
  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"
  import Button from "../../components/Button.svelte"
  import Input from "../../components/ui/Input.svelte"
  import Checkbox from "../../components/ui/Checkbox.svelte"

  let { guildData, guildGeneral } = getContext("current");
  let servers = getContext("guilds");
  guildGeneral.fetch();

  async function saveChanges() {
    guildGeneral.saveChanges($guildGeneral).then(() => {
      console.log("saving data");
    }).catch(e => {
      console.error(e);
    });
  }

  let check = false;
</script>

<template>
  {#if ($guildGeneral.loading || $guildData.loading || $servers.loading)}
    loading ...
  {:else}
    <Section>
      <Breadcrumb parts={[$guildData.Meta.name, "General"]} />
      <Headline>General settings</Headline>
      <div class="block">
        <Input id="cascade-prefix" bind:value={$guildGeneral.changes.prefix}>Prefix</Input>
        <Checkbox bind:checked={check}>Case sensitive prefix</Checkbox>
      </div>
      <Toggle bind:state={$guildGeneral.changes.useEmbedForMessages}>Show embedded messages</Toggle>
      <Toggle bind:state={$guildGeneral.changes.deleteCommand}>Delete message after command</Toggle>
      <Toggle bind:state={$guildGeneral.changes.mentionPrefix}>Show prefix when mentioning the bot</Toggle>
      <br>
      {#if $guildGeneral.hasChanges}
        <Button on:click={saveChanges}>Save</Button>
        <Button type="no-border" on:click={guildGeneral.resetChanges}>Reset</Button>
      {/if}
    </Section>
  {/if}
</template>

<style lang="scss">
  .block {
    margin-bottom: 1.5rem;

    > :global(.input-container) {
      margin-bottom: .5rem;
    }
  }
</style>
