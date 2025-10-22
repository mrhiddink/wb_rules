//Синхронизируем светильники
function makeLightSync(light1,light2, func) {
  defineRule({ 
    whenChanged: light1,
    then: function (newValue, devName, cellName) {
                  if (func == "switcher") {
                  dev[light2] = dev[light1]  
                  }
                  else {
                  dev[light2] = func;                    
                  }
          }
  });
};
//На вход даем, список светильников для переключения (Light1 - ведущий, Light2 - синхронизируемый) и функцию ("switcher" = переключить, false = выключить, true = включить)
makeLightSync("wb-mr6c_204/K5", "wb-mrgbw-d-fw3_144/Channel 3 (G)", "switcher"); //Ночник справа (у двери) + подсветка стены
makeLightSync("wb-mr6c_204/K6", "wb-mrgbw-d-fw3_61/Channel 4 (W)", "switcher"); //Ночник слева (у окна) + подсветка стены
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 1 (B)"), "switcher"; //Мягкий свет в гостиной + картина
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 2 (R)", "switcher"); //Ночник свет в гостиной + вешалка
makeLightSync("wb-mr6c_196/K4", "wb-mrgbw-d-fw3_121/Channel 1 (B)", false); //Точечный свет в гостевом с/у + мягкий свет
