function addVirtualRadiator(id, name, temp_sensor, actuator) {
	var virt = 'ARA' + id.toLowerCase(); //Генерируем имя виртуального устройства
	defineVirtualDevice (virt, { //Создаем виртуальное устройство
	  title: name, 
	  cells: {
		set_temp: { //Заданная температура
		  type:"range",
		  title: "Целевая температура",
		  value: 35,
		  max: 50,
		  min: 18,
          precision: 0.5,
		  order: 3,
		},
		On: {
		  type:"switch", //Выключатель устройства
		  title: "Вкл/выкл",
		  order: 1,
		  value: false,
		},
		current_temp: { //Реальная температура
		  type:"temperature",
		  title: "Текущая температура",
		  value: 0,
		  max: 70,
		  order: 2,
		},
		hysteresis: { //Гистерезис
		  type:"range",
		  title:"Гистерезис",
		  value: 2,
		  max: 3,
		  min: 0,
          precision: 0.5,
		  order: 4,
		}
	  }
	});
    defineRule (virt + '-auto_on', { // Правило работы для виртуального устройства при изменении температуры от датчика
      whenChanged: temp_sensor, // Когда изменились показания датчика
      then: function (newValue, devName, cellName) {
        dev[virt + '/current_temp'] = newValue; // обновляем значение текущей температуры в окошке
        if (newValue<(dev[virt + '/set_temp']-dev[virt + '/hysteresis'])&&(dev[virt + '/On']==true)) { // Если значение датчика меньше установки минус гестерезис и "On" установлено 
          dev[actuator] = true; // Вкключаем питание на термоголовке NC (открыли приток теплоносителя температура растет к цели)
        } 
        if (newValue>(dev[virt + '/set_temp']+dev[virt + '/hysteresis'])&&(dev[virt + '/On']==true)) { // Если значение датчика больше установки плюс гестерезис и "On" установлено
          dev[actuator] = false; // Выключаем питание на термоголовке NC (закрыли приток теплоносителя температура падает к цели)
        }
      }
    });

    defineRule(virt + '-manual_on', { // Правило работы для виртуального устройства при включении/выключении устройства
      whenChanged: [virt + '/On'], //Когда переключился выключатель
      then: function (newValue, devName, cellName) {
        if (newValue==false) { //Если выключатель в положении Off
          dev[actuator] = false; // Выключаем питание на термоголовке NC (открыли приток теплоносителя)
        }
        if (newValue==true) { //Если выключатель в положении On
          if (dev[temp_sensor]<(dev[virt + '/set_temp']-dev[virt + '/hysteresis'])) { // Если значение датчика меньше установки минус гестерезис 
          dev[actuator] = true; // Включаем питание на термоголовке NC (открыли приток теплоносителя температура растет к цели)
          } 
          if (dev[temp_sensor]>(dev[virt + '/set_temp']+dev[virt + '/hysteresis'])) { // Если значение датчика больше установки плюс гестерезис
          dev[actuator] = false; // Выключаем питание на термоголовке NC (закрыли приток теплоносителя температура падает к цели)
          }
        }
      }
    });
    defineRule(virt + '-set_temp_on', { // Правило работы для виртуального устройства при изменении заданной температуры
      whenChanged: [virt + '/set_temp'],
      then: function (newValue, devName, cellName) {
        if (newValue>(dev[temp_sensor]+dev[virt + '/hysteresis'])&&(dev[virt + '/On']==true)) { // Если значение установки больше датчика плюс гестерезиса и "On" установлено 
          dev[actuator] = true; // Включаем питание на термоголовке NC (открыли приток теплоносителя температура растет к цели)
        } 
        if (newValue<(dev[temp_sensor]-dev[virt + '/hysteresis'])&&(dev[virt + '/On']==true)) { // Если значение установки меньше датчика минус гестерезиса и "On" установлено
          dev[actuator] = false; // Выключаем питание на термоголовке NC (закрыли приток теплоносителя температура падает к цели)
        }
      } 
    });
    }
//Создаем устройства. Параметры: ID устройства, наименование, датчик температуры, канал управления термоголовкой
addVirtualRadiator('1','Радиатор - кальянная','wb-w1/28-00000d2a3003','wb-gpio/EXT1_K1');
//addVirtualRadiator('2','Радиатор - гостиная','wb-w1/28-00000d2af9b3','wb-gpio/EXT1_K1');
addVirtualRadiator('2','Радиатор - гостиная','syberia5_5/Room temp','wb-gpio/EXT1_K2'); //от датчика температуры вентмашины
addVirtualRadiator('3','Радиатор - спальня','wb-w1/28-00000d2a9f3d','wb-gpio/EXT1_K3');
addVirtualRadiator('4','Радиатор - детская','wb-w1/28-00000d28f9d4','wb-gpio/EXT1_K4');
