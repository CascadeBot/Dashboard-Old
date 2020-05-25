<script>
  import Section from "../../components/layout/Section.svelte"
  import Breadcrumb from "../../components/Breadcrumb.svelte"
  import Headline from "../../components/Headline.svelte"
  import Toggle from "../../components/ui/Toggle.svelte"

  //export let id;
</script>

<template>
  <Section>
    <Breadcrumb parts={["Cascade official server", "General"]} />
    <Headline>General settings</Headline>
    <Toggle state={true}>Show embedded messages</Toggle>
    <Toggle>Delete message after command</Toggle>
    <Toggle>Show prefix when mentioning the bot</Toggle>
  </Section>
</template>
