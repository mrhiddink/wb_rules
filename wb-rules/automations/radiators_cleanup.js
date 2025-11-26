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
      var state = dev[radiator + '/On']; //Запоминаем состояние радиатора
      dev[radiator + '/On'] = false; //Выключаем радиатор
      setTiemout(function() {
        dev[control] = true; 
      }, 1000); //Ждем 1 секунду, открываем клапан
      setTimeout(function() {
        dev[control] = false;
      }, 600000); //Ждем 15 минут, закрываем клапан
      dev[radiator + '/On'] = state; //Возвращаем радиатор в первоначальное состояние
      log.info("Цикл очистки радиатора", radiator, "завершен");
      }  
    });
}
radiatorCleanup("ARA1", "wb-gpio/EXT1_K1");
radiatorCleanup("ARA2", "wb-gpio/EXT1_K2");
radiatorCleanup("ARA3", "wb-gpio/EXT1_K3");
radiatorCleanup("ARA4", "wb-gpio/EXT1_K4");
