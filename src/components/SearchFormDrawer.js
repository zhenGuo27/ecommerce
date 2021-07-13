import $ from "jquery";
import { useEffect } from "react";

const SearchFormDrawer = () => {
  useEffect(()=> {
    search_bar();
  }, []);

  const search_bar=()=> {
    $('.search-trigger').on('click', function () {
        const search = $('.search');

        if (search.is('.search--opened')) {
            search.removeClass('search--opened');
        } else {
            search.addClass('search--opened');
            $('.search__input')[0].focus();
        }
    });
}

  const inputOnChangeHandler = () => {};

  return (
    <div className="search">
      <div className="search__form">
        <form className="search-bar__form" action="#">
          <button className="go-btn search__button" type="submit">
            <i className="icon anm anm-search-l"></i>
          </button>
          <input
            className="search__input"
            type="search"
            name="q"
            value=""
            placeholder="Search entire store..."
            aria-label="Search"
            autoComplete="off"
            onChange={inputOnChangeHandler}
          />
        </form>
        <button type="button" className="search-trigger close-btn">
          <i className="anm anm-times-l"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchFormDrawer;
