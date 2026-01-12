	{
        fingerprint: tuya.fingerprint("TS0601", ["_TZE284_cgr0rhza"]),
        model: "TS0601_thermostat_4",
        vendor: "Tuya",
        description: "Thermostatic radiator valve",
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        onEvent: tuya.onEventSetLocalTime,
        configure: tuya.configureMagicPacket,
        exposes: [
            e.child_lock(),
            e.battery(),
			e.open_window(),
			e.window_detection(),
            e.battery_low(),
            e
                .climate()
                .withSetpoint("current_heating_setpoint", 5, 45, 0.5, ea.STATE_SET)
                .withLocalTemperature(ea.STATE)
                .withPreset(["manual", "schedule", "eco", "comfort","antifrost","off"])
                .withSystemMode(["off", "heat"], ea.STATE)
                .withLocalTemperatureCalibration(-12, 12, 1, ea.STATE_SET),
            ...tuya.exposes.scheduleAllDays(ea.STATE_SET, "HH:MM/C HH:MM/C HH:MM/C HH:MM/C HH:MM/C HH:MM/C"),
            e.comfort_temperature().withValueMin(5).withValueMax(45),
            e.eco_temperature().withValueMin(5).withValueMax(45),
            e
                .binary("scale_protection", ea.STATE_SET, "ON", "OFF")
                .withDescription("If the heat sink is not fully opened within " +
                "two weeks or is not used for a long time, the valve will be blocked due to silting up and the heat sink will not be " +
                "able to be used. To ensure normal use of the heat sink, the controller will automatically open the valve fully every " +
                'two weeks. It will run for 30 seconds per time with the screen displaying "Ad", then return to its normal working state ' +
                "again."),
            e
                .binary("frost_protection", ea.STATE_SET, "ON", "OFF")
                .withDescription("When the room temperature is lower than 5 °C, the valve opens; when the temperature rises to 8 °C, the valve closes."),
            e.numeric("error", ea.STATE).withDescription('If NTC is damaged, "Er" will be on the TRV display.'),
        ],
        meta: {
            tuyaDatapoints: [
                [
                    2,
                    "preset",
                    tuya.valueConverterBasic.lookup({
                        manual: tuya.enum(0),
                        schedule: tuya.enum(1),
                        eco: tuya.enum(2),
                        comfort: tuya.enum(3),
                        antifrost: tuya.enum(4),
						off: tuya.enum(5),
                    }),
                ],
                [4, "current_heating_setpoint", tuya.valueConverter.divideBy10],
                [5, "local_temperature", tuya.valueConverter.divideBy10],
                [6, "battery", tuya.valueConverter.raw],
                [7, "child_lock", tuya.valueConverter.lockUnlock],
				[8, "window_detection", tuya.valueConverter.onOff],
                [14, "open_window", tuya.valueConverter.onOff],
                [24, "comfort_temperature", tuya.valueConverter.divideBy10],
                [25, "eco_temperature", tuya.valueConverter.divideBy10],
				[28, "schedule_monday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(1)],
                [29, "schedule_tuesday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(2)],
                [30, "schedule_wednesday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(3)],
                [31, "schedule_thursday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(4)],
                [32, "schedule_friday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(5)],
                [33, "schedule_saturday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(6)],
                [34, "schedule_sunday", tuya.valueConverter.thermostatScheduleDayMultiDPWithDayNumber(7)],
                [35, "fault_alarm", tuya.valueConverter.errorOrBatteryLow],
                [36, "frost_protection", tuya.valueConverter.onOff],
                [39, "scale_protection", tuya.valueConverter.onOff],
                [47, "local_temperature_calibration", tuya.valueConverter.localTempCalibration2],
                [
                    49,
                    "system_mode",
                    tuya.valueConverterBasic.lookup({
                        off: tuya.enum(0),
                        heat: tuya.enum(1),
                    }),
                ],
			
            ],
        },
    },	
