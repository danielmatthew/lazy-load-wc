import { LitElement, html } from 'lit-element';

export default class ImageSpinner extends LitElement {
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

        @keyframes ripple {
          0% {
            top: 28px;
            left: 28px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: -1px;
            left: -1px;
            width: 58px;
            height: 58px;
            opacity: 0;
          }
        }
      </style>
      <div class="ripple">
        <div class="ripple__circle"></div>
        <div class="ripple__circle ripple__inner-circle"></div>
      </div>
    `;
  }
}
