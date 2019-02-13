import { LitElement, html } from 'lit-element';

export default class LazyLoad extends LitElement {
  static get properties() {
    return {
      source: { type: String },
      text: { type: String },
    };
  }

  get imgWrapper() {
    return Array.from(this.shadowRoot.children).find(el => el.nodeName === 'FIGURE');
  }

  connectedCallback() {
    super.connectedCallback();

    const loadImage = () => {
      const imageElement = Array.from(this.imgWrapper.children).find(el => el.nodeName === 'IMG');

      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => this.imgWrapper.classList.add('loaded'), 100);
        });

        imageElement.addEventListener('error', () => console.log('error'));
      }
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(this);
        }
      });
    };

    const createObserver = () => {
      const options = {
        root: null,
        threshold: '0',
      };

      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(this);
    };

    if (window.IntersectionObserver) {
      createObserver();
    } else {
      loadImage();
    }
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
      <figure class="image__wrapper">
        <img class="image__item" src="${this.source}" alt="${this.text}" />
      </figure>
    `;
  }
}
