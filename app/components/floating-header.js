import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  blog: service(),
  fastboot: service(),
  value: 0,
  classNameBindings: [':floating-header', 'floating:floating-active'],
  init() {
    this._super(...arguments);

    if(get(this, 'fastboot.isFastBoot')) {
      return;
    }

    set(this, 'lastScrollY', window.scrollY);
    set(this, 'lastWindowHeight', window.innerHeight);
    set(this, 'lastDocumentHeight', $(document).height());

    this.update();
  },

  didInsertElement() {
    let scrollEvent = () => {
      set(this, 'lastScrollY', window.scrollY);
      this.requestTick();
    };
    set(this, 'scrollEvent', scrollEvent);
    window.addEventListener('scroll', scrollEvent, {passive: true});

    window.addEventListener('resize', () => {
      set(this, 'lastWindowHeight', window.innerHeight);
      set(this, 'lastDocumentHeight', $(document).height());
      this.requestTick();
    }, false);
  },

  didDestroyElement() {
    let scrollEvent = this.scrollEvent;

    if(scrollEvent) {
      set(this, 'scrollEvent', null);
      window.removeEventListener('scroll', scrollEvent);
    }
  },

  requestTick() {
      if (!this.ticking) {
          requestAnimationFrame(() => {
            this.update();
          });
      }
      set(this, 'ticking', true);
  },

  update() {
    // debugger
    var title = document.querySelector('.post-full-title');
    var lastScrollY = this.lastScrollY;

    var trigger = title.getBoundingClientRect().top + window.scrollY;
    var triggerOffset = title.offsetHeight + 35;
    var progressMax = this.lastDocumentHeight - this.lastWindowHeight;

    // show/hide floating header
    if (lastScrollY >= trigger + triggerOffset) {
        set(this, 'floating', true);
    } else {
        set(this, 'floating', false);
    }

    set(this, 'max', progressMax);
    set(this, 'value', this.lastScrollY);

    set(this, 'ticking', false);
  }
})
