defineVirtualDevice ("radiatorsCleanup", { //Создаем виртуальное устройство
  title: "Очитска радиаторов", 
	cells: {
      Cleanup: {
        type:"pushbutton", //Выключатель устройства
		title: "Запустить цикл очистки радиаторов",
      }
    }
});
function radiatorCleanup(radiator, control) {
  defineRule({ 
    whenChanged: ['radiatorsCleanup/Cleanup'],
    then: function (newValue, devName, cellName) {
      log.info("Цикл очистки радиатора", radiator, "начат");
      var stateR = dev[radiator + '/On']; //Запоминаем состояние радиатора
      var stateC = dev[control]; //Запоминаем состояние привода
      dev[radiator + '/On'] = false; //Выключаем радиатор
      setTimeout(function() { //Ждем 1 секунду, открываем клапан
        dev[control] = true;
        setTimeout(function() { //Ждем 10 минут, закрываем клапан
          dev[control] = false;
          dev[radiator + '/On'] = stateR; //Возвращаем радиатор в первоначальное состояние
          dev[control] = stateC;
          log.info("Цикл очистки радиатора", radiator, "завершен");
        }, 10*60*1000); 
      }, 1000); 
      }  
    });
}
radiatorCleanup("ARA1", "wb-gpio/EXT1_K1");
radiatorCleanup("ARA2", "wb-gpio/EXT1_K2");
radiatorCleanup("ARA3", "wb-gpio/EXT1_K3");
radiatorCleanup("ARA4", "wb-gpio/EXT1_K4");
