//Для штор, управляемых реле WB-DO-R10R напрямую (с переключателем направления и питания)
(function() {
	function addVirtualRollet(id, name, control, direction, timeout, buttons, fixed) {
		var moving, virt = 'virtual-rollet-' + id.toLowerCase(), data = {};

		// Инициализируем виртуальное устройство со служебными полями
		defineVirtualDevice(virt, {
			title: name,
			cells: {
				open: {title: 'Открыть', type: 'pushbutton', order: 1},
				close: {title: 'Закрыть', type: 'pushbutton', order: 2},
				stop: {title: 'Остановить', type: 'pushbutton', order: 3},
				position: {title: 'Текущая позиция', type: 'value', forceDefault: false, units: '%', value: 0, max: 100, order: 4},
				target: {title: 'Целевая позиция', type: 'range', forceDefault: false, value: 0, max: 100, order: 5},
				state: {title: 'Состояние', type: 'text', value: 'STOPPED', readonly: true, forceDefault: true, order: 6},
                ext_comand: {
					title: 'Управляющая команда', 
					type: 'value', 
					forceDefault: true, 
					value: null, 
					max: 3,
					order: 7,
                    readonly: false,
					enum:{ 
					1: {'en':'OPEN'}, 
					2: {'en':'CLOSE'}, 
					3: {'en':'STOP'}}
					},
			}
		});
		//Получение внешних команд
      defineRule(virt + '_command',{
        whenChanged: [virt + '/ext_comand'],
        then: function(newValue, devName, cellName) {
		    if (newValue == 1) {
                dev[virt + '/stop'] = true;
				setTimeout(function(){dev[virt + '/open'] = true;},50); //Перед подачей питания ставим тайм-аут в 50мс на переключение реле направления
                dev[virt + '/ext_comand'] = 0;
			};
			if (newValue == 2) {
                dev[virt + '/stop'] = true;
				setTimeout(function(){dev[virt + '/close'] = true;},50); //Перед подачей питания ставим тайм-аут в 50мс на переключение реле направления
                dev[virt + '/ext_comand'] = 0;
			};
			if (newValue == 3) {
				dev[virt + '/stop'] = true;
                dev[virt + '/ext_comand'] = 0;
		    }   
		}
			
      });
		// Работа с топиками напрямую через объект
		function defineVar(name, path) {
			Object.defineProperty(data, name, {
				configurable: true,
				get: function() { return dev[path]; },
				set: function(value) { dev[path] = value; }
			});
		}

		defineVar('position', virt + '/position');
		defineVar('target', virt + '/target');
		defineVar('state', virt + '/state');
		defineVar('route', direction);
		defineVar('power', control);

		// Задание цели по командам от внутренних или внешних кнопок с режимами работы
		defineRule(virt + '-trigger', {
			whenChanged: [virt + '/open', virt + '/close', virt + '/stop'].concat(buttons),
			then: function(click, device, command) {
				if (!click && !fixed) return;

				if (device !== virt)
				{
					command = (buttons.length == 1) ? 0 : buttons.indexOf(device + '/' + command) + 1;

					switch (buttons.length)
					{
						case 1: data.target = (data.state !== 'STOPPED' || !click) ? data.position : (data.position > 0 ? 0 : 100); break;
						case 2: data.target = (data.state !== 'STOPPED') ? data.position : (command == 2 ? 0 : 100); break;
						case 3: data.target = (command == 3) ? data.position : (command == 2 ? 0 : 100); break;
						default: log.warning('{}: only 1/2/3 buttons can be used to control!', virt);
					}
				}
				else
				{
					data.target = {'open': 100, 'close': 0, 'stop': data.position}[command];
				}
			}
		});

		// Работа с приводом: установка целевой позиции и расчет таймингов
		defineRule(virt + '-action', {
			whenChanged: virt + '/target',
			then: function(value) {
				if (moving)
				{
					clearInterval(moving);
					moving = false;
					data.power = false;
				}

				if (data.position === data.target)
				{
					data.state = 'STOPPED';
					return;
				}
				else
				{
					setTimeout(function() {data.route = data.target > data.position;}, 100);
					data.state = data.target > data.position ? 'OPENING' : 'CLOSING';
                    data.power = false;
					setTimeout(function() {
						data.power = true;
						moving = setInterval(function() {
							if (data.position !== data.target)
							{
								data.position += data.route ? 1 : -1;
							}
							else
							{
								clearInterval(moving);
								moving = false;
								data.power = false;
								data.state = 'STOPPED';
							}
						}, Math.round(timeout / 100));
					}, 100);
				}
			}
		});
	}

	// Инициализация виртуальных роллет и правил через общую функцию (датчик открытия в алгоритме не предусмотрен, расчет только на таймингам)
	// Параметры: ID уст-ва, наименование, канал управления мотором, канал управления направлением, время на полное открытие/закрытые, выключатели
	// Выключатели: [..] (1 - open/stop/close, 2 - open/stop и close/stop, 3 - open, close, stop), `true` после если кнопки фиксируемые!
	// addVirtualRollet('1', 'Штора в детской', 'wb-gpio/EXT3_ON1', 'wb-gpio/EXT3_DIR1', 27000, ['wb-gpio/EXT2_IN10', 'wb-gpio/EXT2_IN9']);
    // addVirtualRollet('2', 'Штора в спальне (широкая)', 'wb-gpio/EXT3_ON2', 'wb-gpio/EXT3_DIR2', 22000, ['wb-gpio/EXT2_IN13', 'wb-gpio/EXT2_IN14']);
    // addVirtualRollet('3', 'Штора в спальне (узкая)', 'wb-gpio/EXT3_ON3', 'wb-gpio/EXT3_DIR3', 27000, ['wb-gpio/EXT2_IN13', 'wb-gpio/EXT2_IN14']);
    // addVirtualRollet('4', 'Штора в гостиной', 'wb-gpio/EXT2_ON2', 'wb-gpio/EXT2_DIR2', 30000, ['wb-gpio/EXT2_IN1', 'wb-gpio/EXT2_IN2']);
    // addVirtualRollet('5', 'Штора в кальянной', 'wb-gpio/EXT3_ON4', 'wb-gpio/EXT3_DIR4', 30000, ['wb-gpio/EXT2_IN1', 'wb-gpio/EXT2_IN2']);
    // addVirtualRollet('6', 'Штора в гостиной', 'wb-gpio/EXT2_ON1', 'wb-gpio/EXT2_DIR1', 30000, ['wb-gpio/EXT2_IN1', 'wb-gpio/EXT2_IN2']); //для тестов
    // addVirtualRollet('7', 'Штора в кальянной', 'wb-gpio/EXT2_ON3', 'wb-gpio/EXT2_DIR3', 2000, ['wb-gpio/EXT2_IN1', 'wb-gpio/EXT2_IN2']); //для тестов
})();

//Правила для синхронизации парных штор (гостиная-кальянная и широкая-узкая в спальне)
defineRule({
  whenChanged: "virtual-rollet-4/target",
  then: function (newValue, devName, cellName) {
	dev["virtual-rollet-5/target"] = newValue;

  }
});
defineRule({
  whenChanged: "virtual-rollet-3/target",
  then: function (newValue, devName, cellName) {
	dev["virtual-rollet-2/target"] = newValue;

  }
});
