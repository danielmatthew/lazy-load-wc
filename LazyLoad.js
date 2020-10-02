import { LitElement, html } from 'lit-element';

const isIntersecting = ({ isIntersecting }) => isIntersecting;

export default class LazyLoad extends LitElement {
  static get properties() {
    return {
      source: { type: String },
      alt: { type: String },
      loaded: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  get imgWrapper() {
    return Array.from(this.shadowRoot.children).find(el => el.nodeName === 'FIGURE');
  }

  constructor() {
    super();
    this.handleIntersect = this.handleIntersect.bind(this);
    this.loaded = false;
    this.isIntersecting = false;
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'presentation');
    this.initIntersectionObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnectObserver();
  }

  handleIntersect(entries) {
    if (entries.some(isIntersecting)) {
      this.intersecting = true;
    }
  }

  onLoad() {
    this.loaded = true;
  }

  initIntersectionObserver() {
    if (window.IntersectionObserver) {
      const options = {
        root: null,
        threshold: '0',
      };

      const observer = new IntersectionObserver(this.handleIntersect, options);
      observer.observe(this);
    } else {
      this.loadImage();
    }
  }

  disconnectObserver() {
    this.observer.disconnect();
    this.observer = null;
    delete this.observer;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        .image__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
        }

        .image__wrapper.loaded .image__item {
          visibility: visible;
          opacity: 1;
          border: 0;
        }

        .image__wrapper.loaded .image__spinner {
          display: none;
          width: 100%;
        }

        .image__item {
          width: 100%;
          border-radius: 4px;
          transition: all 0.4s ease-in-out;
          opacity: 0;
          visibility: hidden;
        }
      </style>
      <figure class="image__wrapper ${this.intersecting ? 'loaded' : ''}">
        <img class="image__item" src="${this.source}" alt="${this.alt}" @load="${this.onLoad}" />
      </figure>
    `;
  }
}
