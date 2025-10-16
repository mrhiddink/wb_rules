//Правила обработки длинных нажатий на кнопки по маппинг-матрице
function makeLongPressLightMatrix(switch1, light1) {
defineRule("long_press", {
    whenChanged: switch1,
    then: function(newValue, devName, cellName) {
            if (newValue > 0) {
                dev[light1] = !dev[light1];
                dev[switch1] = 0;
            }
          }
    });
};
//На вход даем счетчик длинных нажатий и светильник для переключения
makeLongPressLightMatrix("wb-mr6c_196/Input 4 Long Press Counter", "wb-mrgbw-d-fw3_121/Channel 1 (B)") //Долгое нажатие вправляет мягким светом в туалете
