import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import customTheme from './theme';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken1, // #E53935
        secondary: colors.grey.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
