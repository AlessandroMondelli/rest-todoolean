$(document).ready(function() {

    //Preparo template Handlebars
    var source = $("#to-do-template").html();
    //Preparo template con funzione
    var template = Handlebars.compile(source);

    printToDoData(); //Richiamo funzione per stampare dati già presenti nell'APi

    $(document).on('click','#add-to-do',function() { //Al click su pulsante "+"
        $("#textbox-to-do").addClass("active"); //Mostro input
        $("body").addClass("not-active"); //Aggiungo colore scuro al body
        var newToDo = $("#textbox-to-do").val().trim(); //Prendo valore scritto dall'utente
        if (newToDo.length > 0) { //Controllo che non sia vuoto..
            addToData(newToDo); //Richiamo funzione per aggiungere todo
            $("#textbox-to-do").val(""); //Svuoto input
            $("#textbox-to-do").removeClass("active"); //Nascondo input
            $("body").removeClass("not-active"); //Nascondo colore scuro body
        }

    });



    //*** FUNZIONI ***/

    function printToDoData() {
        $.ajax ({ //Chiamata AJAX per recuperare dati film
            'url' : 'http://157.230.17.132:3014/todos',
            'method' : 'GET', //Metodo GET
            'success' : function(data) { //Caso funzionamento richiesta
                for (var i = 0; i < data.length; i++) {
                    var placeholder = {
                        dataToDo : data[i].id, //Stampo id elemento
                        toDoEl : data[i].text //Stampo testo elemento
                    };
                    var finalHtml = template(placeholder); //Prendo template
                    $("#to-do-list").append(finalHtml); //Appendo in html
                }
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

    function addToData(addToDo) {
        $.ajax ({ //Chiamata AJAX per recuperare dati film
            'url' : 'http://157.230.17.132:3014/todos',
            'method' : 'POST', //Metodo POST
            'data' : {
                'text' : addToDo
            },
            'success' : function(data) { //Caso funzionamento richiesta
                $("#to-do-list").empty(); //Svuoto lista precedente
                printToDoData(); //Richiamo funzione per stampare per aggiornare lista
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

});