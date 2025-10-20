//Создаем вирутальное устройство для режима "В отпуске"
defineVirtualDevice ("VacationMode", { //Создаем виртуальное устройство
  title: "Режим отпуска", 
	cells: {
	On: {
		type:"switch", //Выключатель устройства
		title: "В отпуске",
		order: 1,
		value: false,
	}
    }
});

//Синхронизируем краны нептуна с проверкой, что включен режим двух зон
function makeValveSync(Valve1,Valve2, dualzone) {
  defineRule({ 
    whenChanged: [Valve1, Valve2],
    then: function (newValue, devName, cellName) {
      if (dev[dualzone] == true) {
        dev[Valve1] = newValue;
        dev[Valve2] = newValue;
      }           
    }
  });
};
makeValveSync("neptun_240/Zona 1", "neptun_240/Zona 2", "neptun_240/Dual zone mode");

//Исправляем самопроизвольноке закрыте кранов - открываем через 15 минут при отсутствии тревоги и не в отпуске
function makeValveOn(Valve1, Valve2, Alarm1, Alarm2) {
  defineRule({ 
    whenChanged: [Valve1, Valve2],
    then: function (newValue, devName, cellName) {
      if ((dev[Alarm1] == false) && (dev[Alarm2] == false) && (dev[VacationMode/On] == false)) {
        setTimeout(function(){
        dev[Valve1] = true;
        dev[Valve2] = true;
        }, 900000);
      }           
    }
  });
};
makeValveOn("neptun_240/Zona 1", "neptun_240/Zona 2", "neptun_240/Alarm zona 1", "neptun_240/Alarm zona 2");
