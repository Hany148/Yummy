
function toload() {

    $(function () {
        $('.loader').fadeOut(5000, function () {
            $('.laoding').slideUp(2500, function () {
                $('body').css('overflow', 'auto')
            })
        });
    })

}
toload();


// side bar 

function openClose() {

    $('#open').on("click", function () {
        theAnimate();

    })
}

function theAnimate() {
    $('#cover').animate({ width: "toggle" }, 500);

    let x = $('#open').attr('src')

    if (x == './images/icons8-menu-50.png') {
        $('#open').attr('src', './images/icons8-x-50.png')
    }
    else {
        $('#open').attr('src', './images/icons8-menu-50.png')
    }

    let li = $('.li-an');

    if (li.css('top') == "300px") {

        $('.li-an').eq(0).animate({ top: '0' }, 500)
        $('.li-an').eq(1).animate({ top: '0' }, 600)
        $('.li-an').eq(2).animate({ top: '0' }, 700)
        $('.li-an').eq(3).animate({ top: '0' }, 800)
        $('.li-an').eq(4).animate({ top: '0' }, 900)



    }
    else {
        $('.li-an').animate({ top: '300px' }, 500)
    }

}

openClose();


// display data genral

let genralData = document.getElementById('genralData');

let searchData = document.getElementById('searchData');

let rowInfo = document.getElementById('rowInfo');

let search = document.getElementById('search');


let areaRow = document.getElementById('areaRow');

let ingredientsRow = document.getElementById('ingredientsRow');

let categoriesData = document.getElementById('categoriesData');



async function getData(mealName = '') {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}


async function displayData(getDataApi, searchMeal, putInnerHTML) {

    let data;
    x = await getDataApi(searchMeal);
    if (x != null) {
        data = await getDataApi(searchMeal);
    }


    let cartona = '';
    for (let i = 0; i < data.length; i++) {
        cartona += `
      <div class="col-sm-12 col-md-4 col-lg-3  tragetInfo topointer">
        <div class="w-100 h-100 div-cover">
            <img class="w-100 rounded-3" src= "${data[i].strMealThumb}" alt="">
            <div class="layer rounded-3">
                <h3 class="ms-2 strMeal"> ${data[i].strMeal}</h3>
            </div>
        </div>
      </div>  `

    }

    putInnerHTML.innerHTML = cartona;

    await displayInfo();
}






async function displayInfo() {

    $('.tragetInfo').on('click', async function (e) {

        $('#info').removeClass('d-none');



        $('#info').addClass('d-block');



        let data = await getData(e.target.innerText);

        clearPage('page');
        clearPage('Search');
        clearPage('Categories');
        clearPage('Area');
        clearPage('Ingredients');
        clearPage('Contact');


        let finshData = data[0];

        let cartona = '';


        cartona = `
        <div class="col-sm-12 col-lg-4 ">
                    <div class="w-100 h-100">
                        <img id="imageInfo" class="w-100 rounded-3" src="${finshData.strMealThumb}" alt="">
                        <p class="fw-bold fs-4 mt-1 mealInfo">${finshData.strMeal}</p> 
                    </div>
                </div>

                <div class=" col-sm-12 col-lg-8 ">
                    <div>
                        <h2>Instructions</h2>

                        <p id="instructions">
                            ${finshData.strInstructions}
                        </p>

                        <p class="p-info">Area : ${finshData.strArea}</p>
                        <p class="p-info"> Category : ${finshData.strCategory}</p>
                        <p class="p-info"> Recipes :</p>

                        <ul class="list-unstyled d-flex ul">
                            ${toUl(finshData)}
                        </ul>

                        <div>
                            <p class="p-info">Tags:</p>
                            <a href="${finshData.strSource}" target="_blank"
                                class="py-1 p-2 rounded-2 a-1">Source</a>
                            <a href="${finshData.strYoutube}" class="py-1 p-2 rounded-2 a-2"
                                target="_blank">Youtube</a>
                        </div>

                    </div>
                </div>  `

        rowInfo.innerHTML = cartona;

    })


}

function removeDisplayInfo() {
    rowInfo.innerHTML = '';
}

function toUl(data) {

    let cartonaUl = '';
    for (let i = 1; i <= 20; i++) {

        if (data['strIngredient' + i] != "" && data['strIngredient' + i] != null) {

            cartonaUl += `<li class="li"> ${data['strMeasure' + i]} ${data['strIngredient' + i]}</li>`
        }

    }

    return cartonaUl;
}

function clearPage(page) {
    $(`#${page}`).addClass('d-none');
}


function sideBar() {
    $('.li-an').on('click', function (e) {

        let x = e.target.innerText;

        if (e.target.innerText == 'Contact Us') {
            x = 'Contact';
        }

        $('#Search , #Categories , #Area , #Ingredients , #Contact , #info').addClass('d-none');
        $(`#${x}`).removeClass('d-none');
        $(`#${x}`).addClass('d-block');
        clearInput();
        theAnimate();
        clearPage('page');
        toClear();
    })
}

function clearInput() {
    $('#inputSearch1 , #inputSearch2').val("");
    $('#searchData').html('');
}

function toClear() {
    displayCategoriesData();
    displayAreaData();
    displayIngredientsData();
    clearAllInput();
    removeDisplayInfo();
    removeAllAlert();
}



async function inputValue1() {
    $('#inputSearch1').on('input', async function (e) {


        let z = e.target.value;
        x = await searchByName(z);


        if (x != null) {
            await displayData(searchByName, z, searchData);

        }

    })

}

async function inputValue2() {
    $('#inputSearch2').on('input', async function (e) {


        let z = e.target.value;
        x = await searchByFirstName(z);


        if (x != null) {
            await displayData(searchByFirstName, z, searchData);

        }




    })

}


async function searchByFirstName(mealName) {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`);

    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}



async function searchByName(mealName) {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);

    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}

// categories
async function categories() {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    let reReponse = await respose.json();

    let finshReponse = reReponse.categories;
    return finshReponse;
}

async function categoriesToDisplay(mealName) {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}



async function displayCategoriesData() {


    let data = await categories();


    let cartona = '';
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class=" col-sm-12  col-md-4 col-lg-3  categoriesInfo">
                    <div class="w-100 h-100 div-cover ">
                        <img class="w-100 rounded-3" src="${data[i].strCategoryThumb}" alt="">
                        <div class="layer-cate rounded-3 text-center pt-2 px-1">
                            <h3 class=" ">${data[i].strCategory}</h3>
                            <p class="text-dark line-p">
                               ${data[i].strCategoryDescription}
                            </p>
                        </div>
                    </div>

                </div>
       `

    }

    categoriesData.innerHTML = cartona;
    categoriesMeals();

}


function categoriesMeals() {
    $('.categoriesInfo').on('click', async function (e) {
        let x = e.currentTarget.childNodes[1].querySelector('h3').innerText;
        displayData(categoriesToDisplay, x, categoriesData);
    });
}

// area
async function area() {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);

    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;
}

async function areaToDisplay(mealName) {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealName}`);
    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}


async function displayAreaData() {


    let data = await area();


    let cartona = '';
    for (let i = 0; i < data.length; i++) {
        cartona += `
              

        <div class="col-sm-12  col-md-4 col-lg-3 areaInfo topointer">
        <div class="w-100 h-100 div-cover  text-center">
            <i class="fa-solid fa-house-laptop fs"></i>
            <p class="fs-3 fw-bold">${data[i].strArea}</p>
        </div>

      </div>

       `

    }


    areaRow.innerHTML = cartona;
    areaMeals();

}

function areaMeals() {
    $('.areaInfo').on('click', async function (e) {
        let x = e.currentTarget.childNodes[1].querySelector('p').innerText;
        displayData(areaToDisplay, x, areaRow);
    });
}


// ingredients 


async function ingredients() {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    let dataFinsh = [];
    for (let i = 0; i < 25; i++) {
        dataFinsh[i] = finshReponse[i];
    }
    return dataFinsh;
}

async function displayIngredientsData() {


    let data = await ingredients();


    let cartona = '';
    for (let i = 0; i < data.length; i++) {
        cartona += `
              

        <div class="col-sm-12 col-md-6 col-lg-3 ingredientsClass topointer">
                    <div class="w-100 line-p div-cover  text-center">
                        <i class="fa-solid fa-drumstick-bite fs"></i>
                        <p class="fs-3 fw-bold mb-1 mt-2">${data[i].strIngredient}</p>
                        <p class="fs-6 fw-bolder p-w ">
                           ${data[i].strDescription}
                        </p>
                    </div>

        </div>

       `

    }


    ingredientsRow.innerHTML = cartona;

    ingredientsMeals();

}

async function ingredientsToDisplay(mealName) {
    let respose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let reReponse = await respose.json();

    let finshReponse = reReponse.meals;
    return finshReponse;

}

function ingredientsMeals() {
    $('.ingredientsClass').on('click', async function (e) {
        let x = e.currentTarget.childNodes[1].children[1].innerHTML;
        displayData(ingredientsToDisplay, x, ingredientsRow);
    });
}


// text input

let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let input3 = document.getElementById('input3');
let input4 = document.getElementById('input4');
let input5 = document.getElementById('input5');
let input6 = document.getElementById('input6');
let button = document.getElementById('button');

let regexname = /^[A-Z ]{3,}$/i;

let regexEmail = /^\S+@(gmail)\.(com)$/;


let regexPhone = /^01(0|1|2|5)\d{8}$/


let regexAge = /^[0-9]{2,3}$/;

let regexPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function inputTest() {
    if (input1.value == '' && input2.value == '' && input3.value == '' && input4.value == '' && input5.value == '' && input6.value == '') {
        return true;
    }
    else {
        return false;
    }
}


function validationForName() {
    return regexname.test(input1.value);
}


function validationForEmail() {
    return regexEmail.test(input2.value);
}


function validationForPhone() {
    return regexPhone.test(input3.value);
}


function validationForAge() {
    return regexAge.test(input4.value);
}


function validationForPassword() {
    return regexPassword.test(input5.value);
}


function validationForRepassword() {
    return input6.value == input5.value;
}


function logicInput() {

    if (inputTest() == false) {
        if (validationForName() && validationForEmail() && validationForPhone() && validationForAge() && validationForPassword() && validationForRepassword()) {
            button.removeAttribute("disabled")
        }
        else {
            button.setAttribute("disabled", true)
        }
    }
    else {
        button.setAttribute("disabled", true)
    }
}

function eventInput() {
    $('.my-input').on('input', function () {

        logicInput();

    })
}

eventInput();

function clearAllInput() {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    input4.value = '';
    input5.value = '';
    input6.value = '';
}

function sumitButton() {
    $(button).on('click', function () {
        clearAllInput();
        button.setAttribute("disabled", true);
    })
}

sumitButton();

function removeAlert(toAlertInput) {
    $(`.${toAlertInput}`).addClass('d-none');
}

function removeAllAlert() {
    removeAlert('alertInput1')
    removeAlert('alertInput2')
    removeAlert('alertInput3')
    removeAlert('alertInput4')
    removeAlert('alertInput5')
    removeAlert('alertInput6')
}

function alertInput(input, validation, toAlertInput) {
    $(input).on('input', function () {
        if (validation()) {
            $(`.${toAlertInput}`).addClass('d-none');
        }
        else {
            $(`.${toAlertInput}`).removeClass('d-none');
        }
    })
}


function alertInput_7(input, toAlertInput) {
    $(input).on('input', function () {
        if (input5.value == input6.value) {
            $(`.${toAlertInput}`).addClass('d-none');
            console.log("hello");
        }
    })
}

alertInput_7(input5, 'alertInput6');

alertInput(input1, validationForName, 'alertInput1');
alertInput(input2, validationForEmail, 'alertInput2');
alertInput(input3, validationForPhone, 'alertInput3');
alertInput(input4, validationForAge, 'alertInput4');
alertInput(input5, validationForPassword, 'alertInput5');
alertInput(input6, validationForRepassword, 'alertInput6');

//  masterFunction

async function masterFunction() {
    sideBar();


    await displayData(getData, '', genralData);
    await inputValue1();
    await inputValue2();
    await displayData(searchByName, '', genralData);
    await displayCategoriesData();
    await displayAreaData();
    await displayIngredientsData();






}

masterFunction();


