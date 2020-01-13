$(document).ready(function() {
    var urlToDo = 'http://157.230.17.132:3014/todos/'; //Url API

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
            hideInput(); //Richiamo funzione per nascondere input
        }
    });

    $("#abort").click(function() { //Se viene cliccato tasto per annullare
        hideInput(); //Richiamo funzione per nascondere input
    });

    $(document).on('click', '.to-do-el .fa-times', function() { //Se cliccato X su lista..
        var id = $(this).parent().attr('data-to-do'); //Prendo id elemento
        removeData(id); //Richiamo funzione per rimuovere elemento
    });

    $(document).on('click', '.fa-pencil-alt', function() { //Se cliccata la matita..
        var parentToDo = $(this).parent(); //Padre della matita

        showMod(parentToDo); //Richiamo funzione che mostra modifica
    });

    $(document).on('click', '.fa-save', function() { //Se cliccato il floppy
        var parentToDo = $(this).parent(); //Padre della matita

        var parentToDoId = parentToDo.attr('data-to-do'); //Prendo data id
        var getText = parentToDo.find(".mod-to-do").val(); //Prendo testo modifica
        if (getText.length > 0) { //Se l'input non è vuoto
            modData(parentToDoId,getText); //Richiamo funzione per modificare
        }
    });


    //*** FUNZIONI ***/

    function printToDoData() {
        $.ajax ({ //Chiamata AJAX per recuperare dati
            'url' : urlToDo,
            'method' : 'GET', //Metodo GET
            'success' : function(data) { //Caso funzionamento richiesta
                $("#to-do-list").empty(); //Svuoto lista precedente
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

    function addToData(addToDo) { //Funzione che aggiunge elemento
        $.ajax ({ //Chiamata AJAX per recuperare dati
            'url' : urlToDo,
            'method' : 'POST', //Metodo POST
            'data' : {
                'text' : addToDo
            },
            'success' : function(data) { //Caso funzionamento richiesta
                printToDoData(); //Richiamo funzione per stampare per aggiornare lista
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

    function removeData(idToDo) { //Funzione che rimuove elemento
        $.ajax ({ //Chiamata AJAX per recuperare dati
            'url' : urlToDo + idToDo,
            'method' : 'DELETE', //Metodo DELETE
            'success' : function(data) { //Caso funzionamento richiesta
                printToDoData(); //Richiamo funzione per stampare per aggiornare lista
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

    function modData(idSel,newText) { //Funzione che modifica elemento
        $.ajax ({ //Chiamata AJAX per recuperare dati
            'url' : urlToDo + idSel,
            'method' : 'PUT', //Metodo PUT
            'data' : {
                'text' : newText //Nuovo testo
            },
            'success' : function(data) { //Caso funzionamento richiesta
                printToDoData(); //Richiamo funzione per stampare per aggiornare lista
            },
            'error' : function() { //Caso di errore di caricamento
                alert("Errore");
            }
        });
    }

    function hideInput() { //Funzione che nasconde input
        $("#textbox-to-do").val(""); //Svuoto input
        $("#textbox-to-do").removeClass("active"); //Nascondo input
        $("body").removeClass("not-active"); //Nascondo colore scuro body
        $("#abort").removeClass("active"); //Mostro pulsante per annullare
    }

    function showMod(parent) {  //Funzione che mostra modifica
        parent.find(".mod-to-do").addClass("active"); //Mostro input
        parent.find(".to-do-text").addClass("hidden"); //Nascondo testo
        parent.find(".fa-save").addClass("on"); //Mostro Floppy
        parent.find(".fa-pencil-alt").hide(); //Nascondo penna
    }
});
