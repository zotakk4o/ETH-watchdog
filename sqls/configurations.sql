USE eth_watchdog;
INSERT IGNORE INTO configurations (configName, gasFrom, isActive) VALUES ('configTest1', 200000, 1);
INSERT IGNORE INTO configurations (configName, gasTo) VALUES ('configTest2', 300000);
INSERT IGNORE INTO configurations (configName, valueFrom) VALUES ('configTest3', '20000');
INSERT IGNORE INTO configurations (configName, valueTo) VALUES ('configTest4', '100000');
INSERT IGNORE INTO configurations (configName, gasPriceFrom) VALUES ('configTest5', '20000000000');
INSERT IGNORE INTO configurations (configName, gasPriceTo) VALUES ('configTest6', '50000000000');
INSERT IGNORE INTO configurations (configName) VALUES ('configTest7');
INSERT IGNORE INTO configurations (configName, valueFrom) VALUES ('configTest8', '10000000000000000000');
INSERT IGNORE INTO configurations (configName, valueFrom) VALUES ('configTest9', '500000000000000000');
