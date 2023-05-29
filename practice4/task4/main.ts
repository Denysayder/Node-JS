import * as os from 'os';
import * as si from 'systeminformation';

//Завдання 4
const frequencyInSeconds = parseInt(process.argv[2]);

function printSystemInfo(): void {
    const systemInfo = {
        'Operating System': os.platform(),
        'Architecture': os.arch(),
        'Current User': os.userInfo().username,
    };

    console.log('System Information:');
    Object.entries(systemInfo).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}

async function printCPUInfo(): Promise<void> {
    const cpuInfo = await si.cpu();

    console.log('CPU Cores:');
    // if (Array.isArray(cpuInfo.cores)) {
    //     cpuInfo.cores.forEach((core: si.CpuData) => {
    //         console.log(`CPU Core: ${core.model}`);
    //     });
    // } else {
    //     console.log('Unable to retrieve CPU core information.');
    // }

    const temperatureInfo = await si.cpuTemperature();
    console.log(`CPU Temperature: ${temperatureInfo.main} °C`);
}

async function printGraphicsInfo(): Promise<void> {
    const graphicsInfo = await si.graphics();

    console.log('Graphics Controllers:');
    graphicsInfo.controllers.forEach((controller, index) => {
        console.log(`Controller ${index + 1}: ${controller.vendor} ${controller.model}`);
    });
}

async function printMemoryInfo(): Promise<void> {
    const memoryInfo = await si.mem();

    console.log('Memory:');
    console.log(`Total: ${Math.round(memoryInfo.total / 1024 ** 3)} GB`);
    console.log(`Used: ${Math.round(memoryInfo.used / 1024 ** 3)} GB`);
    console.log(`Free: ${Math.round(memoryInfo.free / 1024 ** 3)} GB`);
}

async function printBatteryInfo(): Promise<void> {
    const batteryInfo = await si.battery();

    console.log('Battery Information:');
    console.log(`Charging: ${batteryInfo.isCharging}`);
    console.log(`Percent: ${batteryInfo.percent}`);
    console.log(`Remaining Time: ${batteryInfo.timeRemaining}`);
}

async function runSystemInfo(): Promise<void> {
    while (true) {
        printSystemInfo();
        await printCPUInfo();
        await printGraphicsInfo();
        await printMemoryInfo();
        await printBatteryInfo();
        console.log('----------------------------------');
        await sleep(frequencyInSeconds * 1000);
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


runSystemInfo();