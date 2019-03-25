import Component from '@ember/component';
import layout from '../templates/components/header';

export default Component.extend({
  tagName: 'header',
  classNameBindings: [':site-header', ':outer', 'background:responsive-header-img:no-image'],

  layout,
});
