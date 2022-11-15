import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generatePrevMarkupBtn(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons} #icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          `;
  }

  _generateFwdMarkupBtn(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //page 1 with other pages
    if (curPage === 1 && numPages > 1)
      return this._generateFwdMarkupBtn(curPage);
    //last page
    if (curPage === numPages && numPages > 1)
      return this._generatePrevMarkupBtn(curPage);
    //other page
    if (curPage < numPages) {
      return (
        this._generateFwdMarkupBtn(curPage) +
        this._generatePrevMarkupBtn(curPage)
      );
    }
    //page 1 no more pages
    return ``;
  }
}

export default new PaginationView();
