import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VListItem, VListItemTitle, VNavigationDrawer } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    'v-list-item': VListItem,
    'v-list-item-title': VListItemTitle,
    'v-navigation-drawer': VNavigationDrawer
});
