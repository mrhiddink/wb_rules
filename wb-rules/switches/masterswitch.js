defineVirtualDevice("masterswitch", {
    title: "Мастер-выключатель",
    cells: {
        power_off: {
            type: "pushbutton",
            title: "Мастер-выключатель",
        },
    }
});

//var ps = new PersistentStorage("power-storage", { global: true });
var lights = [
              "wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", //Мягкий свет в гостиной
              "wb-mrgbw-d-fw3_61/Channel 3 (G)", //Подсветка раковины в ванной
              "wb-mrgbw-d-fw3_61/Channel 4 (W)", //Подсветка стены в спальне слева
              "wb-mrgbw-d-fw3_102/Channels 1_2_3_4", //Большой свет в гостиной
              "wb-mrgbw-d-fw3_121/Channel 1 (B)", //Мягкий свет в туалете
              "wb-mrgbw-d-fw3_121/Channel 2 (R)", //Подсветка кухни
              "wb-mrgbw-d-fw3_121/Channels 3_4 (G_W)", //Мягкий свет в ванной
              "wb-mrgbw-d-fw3_127/Channels 1_2 (B_R)", //Мгякий свет в детской
              "wb-mrgbw-d-fw3_127/Channel 3 (G)", //Большой свет в десткой
              "wb-mrgbw-d-fw3_127/Channel 4 (W)", //Вешалка
              "wb-mrgbw-d-fw3_139/Channels 1_2 (B_R)", //Мягкий свет в спальне
              "wb-mrgbw-d-fw3_139/Channels 3_4 (G_W)", //Большой свет в спальне
              "wb-mrgbw-d-fw3_144/Channel 1 (B)", //Картина
              "wb-mrgbw-d-fw3_144/Channel 2 (R)", //Шкафы
              "wb-mrgbw-d-fw3_144/Channel 3 (G)", //Подсветка стены в спальне справа
              "wb-mrgbw-d-fw3_144/Channel 4 (W)", //Подсветка рабочего места
              "wb-mr6c_196/K1", //Вентилятор в ванной
              "wb-mr6c_196/K2", //Вентилятор в туалете
              "wb-mr6c_196/K3", //Вентилятор в кальянной
              "wb-mr6c_196/K4", //Свет в туалете
              "wb-mr6c_196/K5", //Свет в ванной
              "wb-mr6c_196/K6", //Свет в кальянной
			  "wb-mr6c_204/K1", //Свет в коридоре            
			  "wb-mr6c_204/K2", //Люстра
              "wb-mr6c_204/K3", //Свет в холле
              "wb-mr6c_204/K4", //Трек в детской
//			  "wb-mr3_103/K1", //Розетка у окна в гостиной 
              "wb-mr3_103/K2", //Розетка у окна в спальне
              "wb-mr3_103/K3", //Розетка у ванной в гостиной 
             ];

//var isPowerOff = true;

defineRule({
    whenChanged: ["wb-gpio/EXT2_IN11", "masterswitch/power_off"],
    then: function (newValue, devName, cellName) {
//        if (isPowerOff) {
            lights.forEach(function (light) {
//                ps[light] = dev[light];
                dev[light] = false;
            });
//        } else {
//            lights.forEach(function (light) {
//                dev[light] = ps[light];
//            });
//        }
//        isPowerOff = !isPowerOff;
    }
});

//Для раелизации функционала возврата состояния света после повтороного нажатия кнопки - раскомменитровать строки 11, 44, 49, 51, 54-59
