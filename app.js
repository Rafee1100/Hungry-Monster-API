const searchMeal = () => {
    const mealYouSelect = document.getElementById('search-input').value;
    document.getElementById('meals-item-area').innerText = " ";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealYouSelect}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealsItem(data))
        .catch(err=>alert("Search result did not match.Please try only first letter of the food name"));
}
const searchBtn =document.getElementById('search-button');
searchBtn.addEventListener('click',function(){
    const ingredients = document.getElementById('meal-ingredients-area')
    ingredients.style.display='none';
    searchMeal()
})

const displayMealsItem = data => {
    const mealsContainerDiv = document.getElementById('meals-item-area');
    data.meals.forEach(element => {
        const mealDiv = document.createElement('div');
        mealDiv.className = "meal-Item-Name";

        const mealInfo = `
        <div onclick="mealIngredients(${element.idMeal})">
        <img class="style-image" src="${element.strMealThumb}" alt="">
        <h3 class="meal-name">${element.strMeal}</h3>
        </div>  
        `
        mealDiv.innerHTML = mealInfo;
        mealsContainerDiv.appendChild(mealDiv);
    });
}

const mealIngredients = mealId => {
    const urlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(urlId)
        .then(res => res.json())
        .then(data => recipe(data.meals[0]));
    document.getElementById('meal-ingredients-area').style.display = "inline-block"
}


const recipe = mealsRecipe => {
    const recipeElement = [];

    for (let i = 1; i < 20; i++) {
        const mealIngredientsList = mealsRecipe[`strIngredient${i}`];
        const mealMeasurement = mealsRecipe[`strMeasure${i}`]
        if (mealIngredientsList) {
            recipeElement.push(mealIngredientsList+ "--" + mealMeasurement);
        }
        else {
            break;
        }
    }
    
    const ul = document.createElement('ul');

    for (let i = 0; i < recipeElement.length; i++) {
        const li = document.createElement('li');
        li.innerText = recipeElement[i];
        ul.appendChild(li);
    }


    const mealIngredientsDescription= document.getElementById('meal-ingredients-area');
    mealIngredientsDescription.innerHTML = `
    <img class="style-image-meal" src="${mealsRecipe.strMealThumb}" alt="">
    <h1>${mealsRecipe.strMeal}</h1>
    <h4>Ingredients</h4>
    `
    mealIngredientsDescription.appendChild(ul);
}







