import latinize from 'latinize';
import Accordion from '../../Blocks/Accordion/Accordion';

const FilterByCategory = ({
  availableFilterOptions,
  filterCategory,
  filterTitle,
  firstLineOfMultiLineFilterTitle,
  selectFilterOption,
  yearsCategory,
}) => {
  // // extracting the filter option letters into an array
  // const filterOptionCategories = []
  // availableFilterOptions[filterCategory].map(({ category }) => {
  //     filterOptionCategories.push(category);
  // });

  // sort filterOptions alphabetically
  // except the years
  if (filterCategory !== yearsCategory) {
    availableFilterOptions[filterCategory].sort((a, b) =>
      // sort names in lowercase and with removed diacritics
      latinize(a.category.toLowerCase()) > latinize(b.category.toLowerCase())
        ? 1
        : -1
    );
  }
  // else if (filterCategory === yearsCategory){
  //     availableFilterOptions[filterCategory].sort(
  //         (a, b) => (
  //             a < b)
  //             ? 1 : -1
  //         )
  // }

  return (
    <div id={`filterAccordion-${filterCategory}`} className='filterAccordion'>
      {/* to style multi-line filter title, e.g. for Edition Characteristics */}
      <Accordion
        title={filterTitle}
        firstLineOfMultiLineTitle={firstLineOfMultiLineFilterTitle}
      >
        {availableFilterOptions[filterCategory].map((filterOption) => (
          <div
            key={filterOption.category}
            id={filterOption.category}
            className={`filterOption ${
              filterOption.isActive && 'filterOptionActive'
            } ${filterOption.isSelected && 'filterOptionSelected'}`}
            onClick={() => selectFilterOption(filterOption, filterCategory)}
          >
            {filterOption.category}
            {filterOption.firstNameCategory &&
              ', ' + filterOption.firstNameCategory}
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterByCategory;
