document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const serchField = document.getElementById('search-field');
    const searchText = serchField.value;

    // clear data 
    serchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    
    if(searchText == ''){
        const error = document.getElementById('inviled-value');
        error.style.display = "block";
    }
    else{
        //load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => displayError(error))
    }
    
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // clear data diffrend waye 
    // searchResult.innerHTML = ''; // way 1
    searchResult.textContent = '';// way 2 ভিতরের সব কনটেন্ট 

    // if(meals.length == 0){
    //     alert('show no result found')
    // }
    // else{
        
    // }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick ="loadMealdetail(${meal.idMeal})" class="card h-100">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <button>Read More.....</button>
            </div>
         </div> 
        `;

        searchResult.appendChild(div)

    })
}

// detail Section 
const loadMealdetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        // async system 

      try{
        const res = await fetch(url) //(await) একটু অপেক্কা করো 
        const data = await res.json();
        displayMealDetail(data.meals[0])
      }
      catch(error){
          console.log(error)
      }


    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetail(data.meals[0]))

}

const displayMealDetail = meal => {
    console.log(meal);
    const meadDetails = document.getElementById('meal-details');
    meadDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    meadDetails.appendChild(div)
}