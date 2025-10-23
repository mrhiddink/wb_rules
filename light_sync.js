// Универсальная функция синхронизации светильников
function makeLightSync(pairs) {
  pairs.forEach(function(p) {
    defineRule({
      whenChanged: p[0],
      then: function() {
        dev[p[1]] = (p[2] === "switcher") ? dev[p[0]] : p[2];
      }
    });
  });
}

// Формат: [ведущий, ведомый, режим]
// Режим может быть:
//  "switcher" — копировать состояние ведущего
//   true / false — принудительно включить / выключить
makeLightSync([
  ["wb-mr6c_204/K5", "wb-mrgbw-d-fw3_144/Channel 3 (G)", "switcher"], // Ночник справа + подсветка стены
  ["wb-mr6c_204/K6", "wb-mrgbw-d-fw3_61/Channel 4 (W)", "switcher"],  // Ночник слева + подсветка стены
  ["wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 1 (B)", "switcher"], // Мягкий свет + картина
  ["wb-mrgbw-d-fw3_61/Channels 1_2 (B_R)", "wb-mrgbw-d-fw3_144/Channel 2 (R)", "switcher"], // Мягкий свет + шкафы
  ["wb-mr6c_196/K4", "wb-mrgbw-d-fw3_121/Channel 1 (B)", false] // Точечный свет + мягкий свет
]);
