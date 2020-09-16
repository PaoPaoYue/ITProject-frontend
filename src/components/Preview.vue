<template>
    <v-card
        class="pa-3"
        max-width="1000"
        outlined
        tile
        >
        <v-list-item three-line>
            <!--Text Part of this card-->
        <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <!--Image Part of this card-->
        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
        <v-btn text>Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'Preview',
};
</script>