//Правила обработки длинных или двойных нажатий на кнопки по маппинг-матрице
function makeForeignButtonAction(switch1, lights, func) {
defineRule({
    whenChanged: switch1,
    then: function(newValue, devName, cellName) {
            if (newValue > 0) {
                lights.forEach(function (light) {
                  if (func == "switcher") {
                  dev[light] = !dev[light]  
                  }
                  else {
                  dev[light] = func;                    
                  }
                });
            }
          }
    });
};
//На вход даем счетчик нажатий, список светильников для переключения и функцию ("switcher" = переключить, false = выключить, true = включить)
makeForeignButtonAction(  //Долгое нажатие управляет мягким светом в туалете
                    "wb-mr6c_196/Input 4 Long Press Counter",
                    [
                    "wb-mrgbw-d-fw3_121/Channel 1 (B)"
                    ],
                    "switcher"
)
makeForeignButtonAction( //Двойное нажатие выключателя большого света в спальне выключает весь свет в спальне
                    "wb-mrgbw-d-fw3_139/Input 2 Double Press Counter", 
                    [
                    "wb-mrgbw-d-fw3_61/Channel 4 (W)", //Подсветка стены в спальне слева
                    "wb-mrgbw-d-fw3_139/Channels 1_2 (B_R)", //Мягкий свет в спальне
                    "wb-mrgbw-d-fw3_139/Channels 3_4 (G_W)", //Большой свет в спальне
                    "wb-mrgbw-d-fw3_144/Channel 3 (G)", //Подсветка стены в спальне справа
                    "wb-mrgbw-d-fw3_144/Channel 4 (W)", //Подсветка рабочего места
                    "wb-mr6c_204/K5", //Ночник справа
                    "wb-mr6c_204/K6", //Ночник слева
                    ],
                    false
)
makeForeignButtonAction( //Двойное нажатие выключателя мягкого света в спальне выключает весь свет в доме, кроме спальни
                    "wb-mrgbw-d-fw3_127/Input 1 Double Press Counter", 
                    [
                    "wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", //Мягкий свет в гостиной
                    "wb-mrgbw-d-fw3_61/Channel 3 (G)", //Подсветка раковины в ванной
                    "wb-mrgbw-d-fw3_102/Channels 1_2_3_4", //Большой свет в гостиной
                    "wb-mrgbw-d-fw3_121/Channel 1 (B)", //Мягкий свет в туалете
                    "wb-mrgbw-d-fw3_121/Channel 2 (R)", //Подсветка кухни
                    "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)", //Мягкий свет в ванной
                    "wb-mrgbw-d-fw3_127/Channels 1_2 (B_R)", //Мгякий свет в детской
                    "wb-mrgbw-d-fw3_127/Channel 3 (G)", //Большой свет в десткой
                    "wb-mrgbw-d-fw3_127/Channel 4 (W)", //Вешалка
                    "wb-mrgbw-d-fw3_144/Channel 1 (B)", //Картина
                    "wb-mrgbw-d-fw3_144/Channel 2 (R)", //Шкафы
                    "wb-mr6c_196/K4", //Свет в туалете
                    "wb-mr6c_196/K5", //Свет в ванной
                    "wb-mr6c_196/K6", //Свет в кальянной
                    "wb-mr6c_204/K1", //Свет в коридоре            
                    "wb-mr6c_204/K2", //Люстра
                    "wb-mr6c_204/K3", //Свет в холле
                    "wb-mr6c_204/K4", //Трек в детской
                    ],
                    false
)
makeForeignButtonAction( //Двойное нажатие выключателя трека в детской выключает весь свет в детской
                    "wb-mr6c_204/Input 4 Double Press Counter", 
                    [
                    "wb-mrgbw-d-fw3_127/Channels 1_2 (B_R)", //Мгякий свет в детской
                    "wb-mrgbw-d-fw3_127/Channel 3 (G)", //Большой свет в десткой
                    "wb-mr6c_204/K4", //Трек в детской
                    ],
                    false
)
makeForeignButtonAction( //Двойное нажатие выключателя большого света в детской выключает весь свет в доме, кроме спальни
                    "wb-mrgbw-d-fw3_139/Input 1 Double Press Counter", 
                    [
                    "wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", //Мягкий свет в гостиной
                    "wb-mrgbw-d-fw3_61/Channel 3 (G)", //Подсветка раковины в ванной
                    "wb-mrgbw-d-fw3_102/Channels 1_2_3_4", //Большой свет в гостиной
                    "wb-mrgbw-d-fw3_121/Channel 1 (B)", //Мягкий свет в туалете
                    "wb-mrgbw-d-fw3_121/Channel 2 (R)", //Подсветка кухни
                    "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)", //Мягкий свет в ванной
                    "wb-mrgbw-d-fw3_127/Channels 1_2 (B_R)", //Мгякий свет в детской
                    "wb-mrgbw-d-fw3_127/Channel 3 (G)", //Большой свет в десткой
                    "wb-mrgbw-d-fw3_127/Channel 4 (W)", //Вешалка
                    "wb-mrgbw-d-fw3_144/Channel 1 (B)", //Картина
                    "wb-mrgbw-d-fw3_144/Channel 2 (R)", //Шкафы
                    "wb-mr6c_196/K4", //Свет в туалете
                    "wb-mr6c_196/K5", //Свет в ванной
                    "wb-mr6c_196/K6", //Свет в кальянной
                    "wb-mr6c_204/K1", //Свет в коридоре            
                    "wb-mr6c_204/K2", //Люстра
                    "wb-mr6c_204/K3", //Свет в холле
                    "wb-mr6c_204/K4", //Трек в детской
                    ],
                    false
)
