<script lang="ts">
    // let text = "";
    // $: upper = text.toUpperCase();

    let text = $state("");
    const upper = $derived(text.toUpperCase());
</script>

<div>
    <input type="text" bind:value={text} />
    <p>{text}</p>
    <p>{upper}</p>
</div>
