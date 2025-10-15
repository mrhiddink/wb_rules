//Синхронизируем светильники
function makeLightSync(light1,light2) {
  defineRule({ 
    whenChanged: light1,
    then: function (newValue, devName, cellName) {
                dev[light2] = dev[light1];
    }
  });
};
makeLightSync("wb-mr6c_204/K5", "wb-mrgbw-d-fw3_144/Channel 3 (G)"); //Ночник справа + подсветка стены
makeLightSync("wb-mr6c_204/K6", "wb-mrgbw-d-fw3_61/Channel 4 (W)"); //Ночник слева + подсветка стены
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 1 (B)"); //Мягкий свет в гостиной + картина
makeLightSync("wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 2 (R)"); //Ночник свет в гостиной + вешалка
