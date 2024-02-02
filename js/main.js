const links = document.querySelectorAll(".links li");
let i = 1000;

async function mealInfo (id) {
    $("body").css("overflow-y", "hidden");
    $(".meal-info").css("display", "block");

    $(".show-info").addClass("d-flex", "justify-content-center", "align-items-center");
    $(".show-info").html(`<section class="loading">
                            <div class="sk-folding-cube">
                                <div class="sk-cube1 sk-cube"></div>
                                <div class="sk-cube2 sk-cube"></div>
                                <div class="sk-cube4 sk-cube"></div>
                                <div class="sk-cube3 sk-cube"></div>
                            </div>
                        </section>`);

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const res = await data.json();
    const meal = res.meals[0];

    let tags = ``;
    if (meal.strTags !== null) {
        meal.strTags.split(",").forEach((tag)=> {
            tags += `<span class="badge bg-success rounded-1 p-2 fs-6 mx-2">${tag}</span>`;
        }) 
    } else {
        tags = `<h2 class="text-black fs-2 m-0 fw-bolder">_</h2>`;
    }
    // console.log(meal.strTags.split(","));

    $(".show-info").html(`<div class="col-lg-5 col-md-6 pt-3">
                            <img src="${meal.strMealThumb}" class="object-fit-cover" alt="${meal.strMeal}">
                            <h2 class="text-white fs-1 mt-2"><span class="text-warning">(</span>${meal.strMeal}<span class="text-warning">)</span></h2>
                        </div>
                        <div class="col-lg-7 col-md-6">
                            <h2 class="text-white fs-1 mt-0">Instructions</h2>
                            <p class="text-light">
                                ${meal.strInstructions}
                            </p>
                            <ul class="p-0 text-white">
                                <li class="fs-2 fw-bold"><span class="text-warning">Area:</span> ${meal.strArea}</li>
                                <li class="fs-2 fw-bold"><span class="text-warning">Category:</span> ${meal.strCategory}</li>
                                <li class="fs-2 fw-bold"><span class="text-warning">Recipes:</span> ${meal.strDrinkAlternate !== null? meal.strDrinkAlternate : "_"}</li>
                            </ul>

                            <div class="meal-ingredient justify-content-between mb-3">
                                ${meal.strMeasure1 !== " " && meal.strIngredient1 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure1} ${meal.strIngredient1}</span>` : ""}
                                ${meal.strMeasure2 !== " " && meal.strIngredient2 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure2}  ${meal.strIngredient2}</span>` : ""}
                                ${meal.strMeasure3 !== " " && meal.strIngredient3 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure3}  ${meal.strIngredient3}</span>` : ""}
                                ${meal.strMeasure4 !== " " && meal.strIngredient4 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure4}  ${meal.strIngredient4}</span>` : ""}
                                ${meal.strMeasure5 !== " " && meal.strIngredient5 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure5}  ${meal.strIngredient5}</span>` : ""}
                                ${meal.strMeasure5 !== " " && meal.strIngredient6 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure6}  ${meal.strIngredient6}</span>` : ""}
                                ${meal.strMeasure7 !== " " && meal.strIngredient7 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure7}  ${meal.strIngredient7}</span>` : ""}
                                ${meal.strMeasure8 !== " " && meal.strIngredient8 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure8}  ${meal.strIngredient8}</span>` : ""}
                                ${meal.strMeasure9 !== " " && meal.strIngredient9 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure9}  ${meal.strIngredient9}</span>` : ""}
                                ${meal.strMeasure10 !== " " && meal.strIngredient10 !== ""? `<span class="badge bg-warning text-dark rounded-1 p-3 mb-2">${meal.strMeasure10}  ${meal.strIngredient10}</span>` : ""}
                            </div>

                            <div class="d-flex mb-2">
                                <h3 class="text-white">Tags:</h3>
                                <p class="ms-2">
                                    ${tags}
                                </p>
                            </div>
                            <a class="btn btn-primary rounded-1" href="${meal.strSource !== null? meal.strSource : "#"}" target="_blank" role="button">Source</a>
                            <a class="btn btn-danger rounded-1 ms-2" href="${meal.strYoutube}" target="_blank" role="button">Youtupe</a>
                        </div>`);

    $(".show-info").removeClass("d-flex", "justify-content-center", "align-items-center");

    $("nav").animate({ left: -208 }, 700);
    $(".open-close").attr("src", "images/menu-button.png");

    i = 1000;
    links.forEach((link) => {
        $(link).animate({ top: 300 }, 1000);
    });
}

function closeMealInfo() {
    $("body").css("overflow-y", "auto");
    $(".meal-info").css("display", "none");
}

$(function () {
    // ====================nav====================
    function closeSidebar() {
        $("nav").animate({ left: -208 }, 700);
        $(".open-close").attr("src", "images/menu-button.png");
    
        i = 1000;
        links.forEach((link) => {
            $(link).animate({ top: 300 }, 1000);
        });
    }

    $(".open-close").on("click", () => {
        if ($("nav").css("left") !== "0px") {
            $("nav").animate({ left: 0 }, 700);
            $(".open-close").attr("src", "images/cross-mark.png");

            links.forEach((link) => {
                $(link).animate({ top: 0 }, i);
                i += 150;
            });
        } else {
            closeSidebar();
        }
    });

    $("#search, #categories, #area, #ingredient, #contact").on("click", ()=> {
        closeSidebar();
    })
    // ====================nav====================

    // ====================meals====================
    const getMeals = async (url, type) => {
        // ===============loading===============
        $(".meals").html(`<section class="loading">
                            <div class="sk-folding-cube">
                                <div class="sk-cube1 sk-cube"></div>
                                <div class="sk-cube2 sk-cube"></div>
                                <div class="sk-cube4 sk-cube"></div>
                                <div class="sk-cube3 sk-cube"></div>
                            </div>
                        </section>`);
        // ===============loading===============
        const meals = await fetch(url);
        const res = await meals.json();
        // console.log(res.meals);

        let mealsContainer = ``;
        if (type === "someMeals" || type === "searchMeals") {
            res.meals.slice(0, 21).forEach((meal) => {
                mealsContainer += `<div onclick="mealInfo(${meal.idMeal})" class="col-lg-3 col-md-4 col-sm-6 mb-4 meal">
                                        <div class="rounded-1 position-relative overflow-hidden">
                                            <img src="${meal.strMealThumb}" class="w-100 rounded-1 object-fit-cover" alt="${meal.strMeal}">
                                            <div class="meal-name text-center p-4 rounded-1 w-100 h-100 position-absolute d-flex justify-content-center align-items-center">
                                                ${meal.strMeal}
                                            </div>
                                        </div>
                                    </div>`;
            });

        } else if (type === "allCategories") {
            res.categories.slice(0, 21).forEach((cat) => {
                mealsContainer += `<div cat-name="${cat.strCategory}" class="col-lg-3 col-md-4 col-sm-6 mb-4 meal category-meal">
                                        <div class="rounded-2 position-relative overflow-hidden">
                                            <img src="${cat.strCategoryThumb}" class="w-100 rounded-2 object-fit-cover" alt="${cat.strCategory}">
                                            <div class="meal-name text-center p-4 rounded-2 w-100 h-100 position-absolute d-flex flex-column justify-content-center align-items-center">
                                                <h2 class="fs-2">${cat.strCategory}</h2>
                                                <p class='fs-6'>${cat.strCategoryDescription.length > 70? cat.strCategoryDescription.slice(0, 71) + "..." : cat.strCategoryDescription}</p>
                                            </div>
                                        </div>
                                    </div>`;
            });

        } else if (type === "getArea") {
            res.meals.slice(0, 21).forEach((area) => {
                mealsContainer += `<div area-name="${area.strArea}" class="col-lg-3 col-md-4 col-sm-6 mb-4 area d-flex flex-column align-items-center justify-content-center overflow-hidden">
                                        <img src="images/maps.png" class="w-50 object-fit-cover" alt="map">
                                        <h2 class="fs-1 fw-bolder pt-2 text-center text-white">${area.strArea}</h2>
                                    </div>`;
            });

        } else if (type === "getIngredient") {
            res.meals.slice(0, 21).forEach((ingredient) => {
                mealsContainer += `<div ingredient-name="${ingredient.strIngredient}" class="col-lg-3 col-md-4 col-sm-6 mb-4 ingredient d-flex flex-column align-items-center justify-content-center overflow-hidden">
                                        <img src="images/ready-meal2.png" class="w-50 object-fit-cover" alt="map">
                                        <h2 class="fs-1 fw-bolder pt-0 text-center text-white">${ingredient.strIngredient}</h2>
                                    </div>`;
            });
        }

        $(".meals").html(mealsContainer);
    };
    getMeals(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        "someMeals"
    );
    // ====================meals====================

    // ====================search meals====================
    $("#search").on("click", () => {
        $(".search").css("display", "block");
        $(".meals").html("");
        $(".meals-section").removeClass("h-100")
        $("form").css("display", "none");

        closeMealInfo();
    })

    $(".search-name").on("keyup", () => {
        $(".meals-section").addClass("h-100")
        getMeals(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${$(".search-name").val()}`,
            "searchMeals"
        );
    })

    $(".search-letter").on("keyup", () => {
        $(".meals-section").addClass("h-100")
        if ($(".search-letter").val() !== "") {
            getMeals(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${$(".search-letter").val()}`,
                "searchMeals"
            );
        } else {
            getMeals(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${$(".search-letter").val()}`,
                "searchMeals"
            );
        }
    })
    // ====================search meals====================

    // ====================all categories====================
    $("#categories").on("click", () => {
        $(".search").css("display", "none");
        $("form").css("display", "none");
        $(".meals-section").addClass("h-100")

        closeMealInfo();

        getMeals(
            `https://www.themealdb.com/api/json/v1/1/categories.php`,
            "allCategories"
        );
    })
    // ====================all categories====================

    // ====================Area====================
    $("#area").on("click", () => {
        $(".search").css("display", "none");
        $("form").css("display", "none");
        $(".meals-section").addClass("h-100");

        closeMealInfo();

        getMeals(
            `https://www.themealdb.com/api/json/v1/1/list.php?a=`,
            "getArea"
        );
    })
    // ====================Area====================
    
    // ====================ingredient====================
    $("#ingredient").on("click", () => {
        $(".search").css("display", "none");
        $("form").css("display", "none");
        $(".meals-section").addClass("h-100")

        closeMealInfo();

        getMeals(
            `https://www.themealdb.com/api/json/v1/1/list.php?i=`,
            "getIngredient"
        );
    })
    // ====================ingredient====================

    // ====================contact====================
    $("#contact").on("click", () => {
        $(".search").css("display", "none");
        $(".meals-section").html("");
        $(".meals-section").removeClass("h-100")
        $("form").css("display", "flex")

        $("body").css("overflow-y", "auto");
        $(".meal-info").css("display", "none");
    })

    function validateName() {
        const regex = /^[^\d^\W^_]{3,}$/;
        return regex.test($("#name").val());
    }
    function validateEmail() {
        const regex = /^.+@\w+\.\w+$/;
        return regex.test($("#email").val());
    }
    function validatePass() {
        const regex = /^((?=.*\d+)(?=.*[a-zA-Z]+)(?=.*\W*).{8,})$/;
        return regex.test($("#pass").val());
    }
    function validateConfirmPass() {
        return $("#repass").val() === $("#pass").val();
    }
    function validatePhone() {
        const regex = /^01([0-2]|5)\d{8}$/;
        return regex.test($("#phone").val());
    }
    function validateAge() {
        const regex = /^[1,9][0,9]?$/;
        return regex.test($("#age").val());
    }

    function validationRight(elm) {
        elm.addClass("is-valid");
        elm.removeClass("is-invalid");
    }
    function validationWrong(elm) {
        elm.removeClass("is-valid");
        elm.addClass("is-invalid");
    }

    $("#name").on("keyup", ()=> {
        if (validateName()) {
            validationRight($("#name"));
        } else {
            validationWrong($("#name"));
        }

        testBtn();
    })
    $("#email").on("keyup", ()=> {
        if (validateEmail()) {
            validationRight($("#email"));
        } else {
            validationWrong($("#email"));
        }

        testBtn();
    })
    $("#pass").on("keyup", ()=> {
        if (validatePass()) {
            validationRight($("#pass"));
        } else {
            validationWrong($("#pass"));
        }

        testBtn();
    })
    $("#repass").on("keyup", ()=> {
        if (validateConfirmPass()) {
            validationRight($("#repass"));
        } else {
            validationWrong($("#repass"));
        }

        testBtn();
    })
    $("#phone").on("keyup", ()=> {
        if (validatePhone()) {
            validationRight($("#phone"));
        } else {
            validationWrong($("#phone"));
        }

        testBtn();
    })
    $("#age").on("keyup", ()=> {
        if (validateAge()) {
            validationRight($("#age"));
        } else {
            validationWrong($("#age"));
        }

        testBtn();
    })

    function testBtn() {
        if (validateName() && validateEmail() && validatePass() && validateConfirmPass() && validatePhone() && validateAge()) {
            $("form button").removeClass("disabled");
        } else {
            $("form button").addClass("disabled");
        }
    }
    // ====================contact====================

    // ====================meal-info====================
    $(".close").on("click", ()=> {
        closeMealInfo();
    })
    // ====================meal-info====================

    // ====================(category/area/ingredient)-filter====================
    $(".meals").on("click", (e)=> {
        const elm1 = $(e.target).closest(".category-meal")[0];
        const elm2 = $(e.target).closest(".area")[0];
        const elm3 = $(e.target).closest(".ingredient")[0];

        if (elm1) {
            const catName = $(elm1).attr("cat-name");
            getMeals(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`,
                "someMeals"
            );

            closeSidebar();
        } else if (elm2) {
            const areaName = $(elm2).attr("area-name");
            getMeals(
                `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`,
                "someMeals"
            );

            closeSidebar();
        } else if (elm3) {
            const ingredientName = $(elm3).attr("ingredient-name");
            getMeals(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`,
                "someMeals"
            );

            closeSidebar();
        }
    })
    // ====================(category/area/ingredient)-filter====================
});