$(document).ready(function() {

    const textbox = $("textarea");
    textbox.on("input", function(event){
        const characters = 140 - this.value.length; 
        const form = $('textarea').closest('form');
        const counter = form.find('.counter');
        counter.text(characters);
        if (characters < 0) {
            $('.counter').css("color", "red");
        } else {
            $('.counter').css("color", "black");
        }
    })

});


