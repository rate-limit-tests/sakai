import { RubricsElement } from "./rubrics-element.js";
import { html } from "/webcomponents/assets/lit-element/lit-element.js";

export class SakaiRubricStudentComment extends RubricsElement {

  static get properties() {

    return {
      criterion: { type: Object },
    };
  }

  set criterion(value) {

    const oldValue = this._criterion;
    this._criterion = value;
    this._criterion.comments = value.comments && value.comments.indexOf("null") === 0 ? "" : value.comments;
    this.triggerId = `criterion-comment-${value.id}-trigger`;
    this.requestUpdate("criterion", oldValue);
    this.updateComplete.then(() => {

      const triggerEl = document.getElementById(this.triggerId);
      bootstrap.Popover.getInstance(triggerEl)?.hide();

      (new bootstrap.Popover(triggerEl, {
        content: () => this.criterion.comments,
        html: true,
        title: () =>  this.criterion.title,
        placement: "auto",
      }));
    });
  }

  get criterion() {
    return this._criterion;
  }

  handleClose() {
    bootstrap.Popover.getInstance(document.getElementById(this.triggerId))?.hide();
  }

  render() {

    return html`
      <div id="${this.triggerId}"
          tabindex="0"
          style="${this.criterion.comments ? "cursor: pointer;" : ""}"
          class="comment-icon fa fa-2x fa-comments ${this.criterion.comments ? "active" : ""}">
      </div>
    `;
  }
}

const tagName = "sakai-rubric-student-comment";
!customElements.get(tagName) && customElements.define(tagName, SakaiRubricStudentComment);
