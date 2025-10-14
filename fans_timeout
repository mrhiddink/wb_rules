//Правило для выключения вентилятора с задержкой после выключения света. Если выключен не весь свет, то вентилятор не выключится.
function makeFanRule (light1,light2,light3,fan,set_timeout) {
  defineRule({
    whenChanged: light1,
    then:  function (newValue, devName, cellName) {
        if ((dev[light2] == false) && (dev[light3] == false) && (dev[fan] == true)) {
          setTimeout(function() {
            dev[fan] = false;
          }, set_timeout);
        }
      }   
  });
  defineRule({
    whenChanged: light2,
    then:  function (newValue, devName, cellName) {
        if ((dev[light1] == false) && (dev[light3] == false) && (dev[fan] == true)) { 
          setTimeout(function() {
            dev[fan] = false;
          }, set_timeout);
        }
    }   
  });
  defineRule({
    whenChanged: light3,
    then:  function (newValue, devName, cellName) {
        if ((dev[light1] == false) && (dev[light2] == false) && (dev[fan] == true)) { 
          setTimeout(function() {
            dev[fan] = false;
          }, set_timeout);
        }
    }   
  });
};
//Создаем правила: (Светильник 1, Светильник 2, Светильник 3, Вентилятор, Тайм-аут выключения)
makeFanRule("wb-mr6c_196/K4", "wb-mrgbw-d-fw3_121/Channel 1 (B)", "wb-mrgbw-d-fw3_121/Channel 1 (B)", "wb-mr6c_196/K2", 30000); //Вентилятор в туалете
makeFanRule("wb-mr6c_196/K5", "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)", "wb-mrgbw-d-fw3_61/Channel 3 (G)", "wb-mr6c_196/K3", 30000); //Вентилятор в ванной
