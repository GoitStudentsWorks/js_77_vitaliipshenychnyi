import { getCategoriesList } from "./API-main-gallary";
import refs from "./refs";

function createMarkupCategoriesList(categories) {
    return categories.map(({list_name}) =>
    `<li class="category-list-item"><button type="button" class="category">${list_name}</button></li>`).join("");
}

const listFillingError = '<li class="category-list-item"><p class="categories-err">The list of categories is empty</p></li>';

// рендеринг списку категорій
getCategoriesList().then(async resp => {
    const categories = resp.data;
        if (categories.length === 0) {
            refs.categoriesList.innerHTML = listFillingError;
                return;
    }
    const markup = `<li class="category-list-item first-elem-js"><button type="button" class="category all-categories">All categories</button></li>` + createMarkupCategoriesList(categories);
    refs.categoriesList.innerHTML=markup;
    }).catch(err => {
        refs.categoriesList.innerHTML = listFillingError;
    })
refs.categoriesList.addEventListener("click", onCategoryClick);
function onCategoryClick(evt) {
    const categoryName = evt.target;
    const listOfCategories = [...evt.currentTarget.children];
    if (!(categoryName.classList.contains("category") && categoryName.classList.contains("all-categories"))) {
        for (i = 0; i < listOfCategories.length; i++){
            if (listOfCategories[i].classList.contains("first-elem-js")) {
                listOfCategories[i].firstChild.classList.remove("all-categories");
            }
        }
    }  
}