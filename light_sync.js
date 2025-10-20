//Синхронизируем светильники полностью
function makeLightSync(light1,light2) {
  defineRule({ 
    whenChanged: light1,
    then: function (newValue, devName, cellName) {
                dev[light2] = dev[light1];
    }
  });
};
//Синхронизируем светильники только на выключение (ведущий - light1)
function makeLightOffSync(light1,light2) {
  defineRule({ 
    whenChanged: light1,
    then: function (newValue, devName, cellName) {
      if (dev[light1] == false) {
          dev[light2] = false;
      }
    }
  });
};
makeLightSync("wb-mr6c_204/K5", "wb-mrgbw-d-fw3_144/Channel 3 (G)"); //Ночник справа (у двери) + подсветка стены
makeLightSync("wb-mr6c_204/K6", "wb-mrgbw-d-fw3_61/Channel 4 (W)"); //Ночник слева (у окна) + подсветка стены
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 1 (B)"); //Мягкий свет в гостиной + картина
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 2 (R)"); //Ночник свет в гостиной + вешалка
makeLightOffSync("wb-mr6c_196/K4", "wb-mrgbw-d-fw3_121/Channel 1 (B)"); //Точечный свет в гостевом с/у + мягкий свет
