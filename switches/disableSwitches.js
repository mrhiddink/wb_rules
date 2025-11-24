//Создаем вирутальное устройство для режима "Заблокировать выключатели"
defineVirtualDevice ("disableSwitches", { //Создаем виртуальное устройство
  title: "Заблокировать выключатели", 
	cells: {
	On: {
		type:"switch", //Выключатель устройства
		title: "Блокировка",
		order: 1,
		value: false,
	}
    }
});
function pairSwitches(pairs) {
  pairs.forEach(function(p) {
    defineRule({
      whenChanged: p[0],
      then: function() {
          if ((dev["disableSwitches/On"] == false) && (dev[p[0]] > 0)) {
        dev[p[1]] = !dev[p[1]]
          }
      }
    });
  });
}
pairSwitches([
  ["wb-mr6c_204/Input 1 counter", "wb-mr6c_204/K1"], //Коридор
  ["wb-mr6c_204/Input 2 counter", "wb-mr6c_204/K2"], //Люстра
  ["wb-mr6c_204/Input 3 counter", "wb-mr6c_204/K3"], //Холл
  ["wb-mr6c_204/Input 4 counter", "wb-mr6c_204/K4"], //Трек в детской
  ["wb-mr6c_196/Input 1 counter", "wb-mr6c_196/K1"], //Вентилятор в кальянной
  ["wb-mr6c_196/Input 4 counter", "wb-mr6c_196/K4"], //Туалет (точечные)
  ["wb-mr6c_196/Input 5 counter", "wb-mr6c_196/K5"], //Ванная (точечные)
  ["wb-mr6c_196/Input 6 counter", "wb-mr6c_196/K6"], //Кальянная  (точечные)
  ["wb-mrgbw-d-fw3_61/Input 1 Counter", "wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)"], //Мягкий свет в гостиной
  ["wb-mrgbw-d-fw3_102/Input 1 Counter", "wb-mrgbw-d-fw3_102/Channels 1_2_3_4"], //Большой свет в гостиной
  ["wb-mrgbw-d-fw3_121/Input 3 Counter", "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)"], //Мягкий свет в ванной
  ["wb-mrgbw-d-fw3_127/Input 1 Single Press Counter", "wb-mrgbw-d-fw3_127/Channel 3 (G)"], //Большой свет в детской
  ])
