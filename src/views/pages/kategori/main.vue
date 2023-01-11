<template>
    <div>
        <v-container grid-list-xs fluid>
            <List></List>
        </v-container>
    </div>
</template>

<script>
import List from "./list/index.vue";
export default {
    data() {
        return {
            pages: "list",
        };
    },
    mounted() {

    },
    components: { List },
};
</script>

<style>

</style>