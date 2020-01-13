$(document).ready(function() {

    //Preparo template Handlebars
    var source = $("#to-do-template").html();
    //Preparo template con funzione
    var template = Handlebars.compile(source);

    printToDoData(); //Richiamo funzione per stampare dati già presenti nell'APi

    $("#plus-to-do").click(function() {
        $("#abort").addClass("active"); //Mostro pulsante per annullare
        $("#textbox-to-do").addClass("active"); //Mostro input
        $("body").addClass("not-active"); //Aggiungo colore scuro al body
        var newToDo = $("#textbox-to-do").val().trim(); //Prendo valore scritto dall'utente
        if (newToDo.length > 0) { //Controllo che non sia vuoto..
            addToData(newToDo); //Richiamo funzione per aggiungere todo
            $("#textbox-to-do").val(""); //Svuoto input
            $("#textbox-to-do").removeClass("active"); //Nascondo input
            $("body").removeClass("not-active"); //Nascondo colore scuro body
            $("#abort").removeClass("active"); //Mostro pulsante per annullare
        }
    });

    $("#abort").click(function() { //Se viene cliccato tasto per annullare
        $("#textbox-to-do").val(""); //Svuoto input
        $("#textbox-to-do").removeClass("active"); //Nascondo input
        $("body").removeClass("not-active"); //Nascondo colore scuro body
        $("#abort").removeClass("active"); //Mostro pulsante per annullare
    });

    $(document).on('click', '.to-do-el i', function() {
        var id = $(this).parent().attr('data-to-do');
        console.log(id);
        removeData(id);
    })


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

    function removeData(idToDo) {
        $.ajax ({ //Chiamata AJAX per recuperare dati film
            'url' : 'http://157.230.17.132:3014/todos/' + idToDo,
            'method' : 'REMOVE', //Metodo REMOVE
            'success' : function(data) { //Caso funzionamento richiesta
                // $("#to-do-list").empty(); //Svuoto lista precedente
                // printToDoData(); //Richiamo funzione per stampare per aggiornare lista
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

});
