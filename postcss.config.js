// this postcss process my css with javascript pliugins, it takes my raw css and pass it through a pipeline of plugins

import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default{
  plugins: [tailwindcss(), autoprefixer()],
};