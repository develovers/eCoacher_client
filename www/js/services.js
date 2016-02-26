angular.module('starter')

.factory('MainService', ['FunctionsService', function(FunctionsService) {
  // Return public API.
  return({
      title: title,
      generateComment: generateComment,
      generateAvatar: generateAvatar
  });

  // ---
  // PUBLIC METHODS.
  // ---

  function title() {
    return "eCoacher";
  }

  function generateComment() {
    var comments = [
      {
        type: "COMENTARIO",
        avatar: "wink",
        header: "¡Hola David!",
        title: "No tengo nada que decirte ahora, ¡ve a divertirte!"
      }, {
        type: "COMENTARIO",
        avatar: "sleepy",
        header: "Lo siento David",
        title: "Ahora estoy cansado para atenderte"
      }, {
        type: "INFO",
        subtype: "text",
        avatar: "wary",
        title: "¿De dónde eres?",
        placeholder: "Introduce tu ciudad"
      }, {
        type: "INFO",
        subtype: "number",
        avatar: "wary",
        title: "¿Cuántos años tienes?",
        placeholder: "Introduce tu edad"
      }, {
        type: "INFO",
        subtype: "yes_no",
        avatar: "cute",
        title: "¿Tienes hijos?"
      }, {
        type: "RETO",
        avatar: "demon",
        title: "¿Estar un día entero sin utilizar el teléfono? Desde ahora hasta mañana a la misma hora.",
        minutesAsk: 1
      }, {
        type: "SABIASQUE",
        avatar: "happy",
        title: "Todo lo que alguna vez has deseado, está al otro lado del miedo."
      }
    ];

    var random = FunctionsService.getRandomInt(0, comments.length-1);

    return comments[random];
  }

  function generateAvatar() {
    var types = [ "blue", "green", "red", "yellow" ];
    var names = [ "Winky", "Stuart", "Kevin", "Bob" ];

    var randomType = FunctionsService.getRandomInt(0, types.length-1);
    var randomName = FunctionsService.getRandomInt(0, names.length-1);

    var avatar = {
      type: types[randomType],
      name: names[randomName]
    };

    return avatar;
  }

}])

.factory('FunctionsService', function() {
  // Return public API.
  return({
      getRandomInt: getRandomInt
  });

  // ---
  // PUBLIC METHODS.
  // ---

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});