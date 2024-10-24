<script lang="ts">
    import Test from "./pages/Test.svelte";
    import Home from "./pages/Home.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import Router from "svelte-spa-router";
    const routes = {
        "/": Home,
        "/test": Test,
        "*": NotFound,
    };
</script>

<main>
    <Router {routes} />
</main>

<style>
</style>
