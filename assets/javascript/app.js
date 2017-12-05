var pokedex = ["Bulbasaur", "Venusaur", "Charmander", "Charizard", "Squirtle", "Blastoise", "Pikachu", "Raichu", "Vulpix",
    "Ninetales", "Growlithe", "Arcanine", "Haunter", "Gengar", "Hitmonlee", "Hitmonchan", "Magikarp", "Gyarados", "Lapras",
    "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Omanyte", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini",
    "Dragonite", "Mewtwo", "Mew"
];

var numResults = 0;
var Pokemon = $(this).attr("data-name");
var apiKey = "NzPgX0d8X7mQF3az8okD95CSLzjSmrAX";
var queryURLStarter = "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=" + apiKey;

var giphyCounter = 0;

function displayGiphy(numGIPHY, queryURL) {

    //AJAX grabbing giphy
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);

                //holds new pokemon input
                var holdPokemon = $("<div>");
                //get ratings
                $("<p>").text(response.data[i].rating).appendTo(holdPokemon);
                console.log(response.data[i].rating);
                //toggle between still and animate
                $("<img>").attr({
                    "src": response.data[i].images.fixed_height_still.url,
                    "data-still": response.data[i].images.fixed_height_still.url,
                    "data-animate": response.data[i].images.fixed_height.url,
                    "data-state": "still",
                    "class": "giphy"
                }).appendTo(holdPokemon);

                $("#pokemon-view").append(holdPokemon);
            }
            $(".giphy").on("click", function () {

                var imgState = $(this).attr("data-state");



                if (imgState === "still") {
                    $(this).attr('src', $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        });
}



function renderButtons() {

    $('#buttons-view').empty();

    //loop through the the Pokemon array

    for (var i = 0; i < pokedex.length; i++) {

        //renders buttons 
        var PokemonBtn = $("<button>");

        PokemonBtn.addClass("btn-primary Pokemon");

        PokemonBtn.attr("data-name", pokedex[i]);

        PokemonBtn.text(pokedex[i]);

        $("#buttons-view").append(PokemonBtn);
    }


    $(".Pokemon").on("click", function () {

        $("#pokemon-view").empty();

        var newURL = queryURLStarter + "&q=" + $(this).attr("data-name") + "&limit=10";

        numResults = $("#numGifs").val();

        displayGiphy(10, newURL);
    });
}

$(function () {

    $("#add-pokemon").on("click", function (event) {
        event.preventDefault();
        var pokemon = $("#pokemon-input").val().trim();
        console.log("new",pokemon);
        console.log("array",pokedex);
        pokedex.push(pokemon);
        console.log("new Array",pokedex)

        renderButtons();
    });
    renderButtons();
})