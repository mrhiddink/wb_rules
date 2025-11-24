function makeMALight(sensor, lights, timeout){
  var offTimer = null;
  defineRule({
    whenChanged: sensor,
    then: function(newValue){
      var time = new Date(), hour = time.getHours() + 3, minute = time.getMinutes(); //Получаем текущие час и минуту
      if (newValue == "true") { //Включаем свет при активации датчика движения
        if (offTimer) {
          clearTimeout(offTimer); //Обнуляем таймер выключения, если включен
          offTimer = null;
//          log ("Таймер выключения обнулен по движению");
        }
        if (dev[lights[0]] == false && dev[lights[1]] == false && dev[lights[2]] == false){
          if ((hour < 20 || (hour == 20 && minute < 30)) && (hour > 7  || (hour == 7  && minute >= 30))) { //Если время между 7:30 и 20:30
            dev[lights[0]] = true;
//            log("Включили свет днем");
          } else {
            dev[lights[1]] = true;
//            log("Включили свет ночью");
          }
        }
        return;
      }
      if (newValue == "false") { //Выключаем свет 
//        log("Свет выключится через ",timeout / 1000 / 60," минут");
        if (offTimer) {
          clearTimeout(offTimer);    // На всякий случай очищаем старый таймер
          offTimer = null;
        }
        offTimer = setTimeout(function() {
          lights.forEach(function(light){
            dev[light] = false;
          });
//          log ("Свет выключен");
          offTimer = null;
        }, timeout);
      }
    }
  });
  lights.forEach(function(light){         // Если любой светильник включился — отменяем таймер
    defineRule({
      whenChanged: light,
      then: function(newValue){
        if (newValue == true && offTimer) {
          clearTimeout(offTimer);
          offTimer = null;
//          log("Таймер выключения обнулен из-за включения света")
        }
      }
    });
  });
}

//Создаем правило (сенсор, выключаемые светильники, тайм-аут):
makeMALight(
  "motion_sensor_vanna/occupancy",
  [
    "wb-mr6c_196/K5",
    "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)",
    "wb-mrgbw-d-fw3_61/Channel 3 (G)"
  ],
  5 * 60 * 1000   // 5 минут
);
