/**
 *
 * Abstract Factory challenge:
 *
 * Make factories families that implement the creation of each product.
 *
 * Steps followed to implement the solution:
 *
 * 1. Add base products clases for each component
 * 2. Add concrete products classes for each version of the components to be used in each device
 * 3. Add DeviceFactory abstract factory class
 * 4. Add concrete implementations of DeviceFactory for each device and implement the creation method for each component
 */

// ----- Base products -----

interface CPUTs {
  setSeries(series: string): void;
}

interface MemoryTs {
  setCapacityInGB(capacity: number): void;
}

interface DisplayTs {
  setResolution(): void;
}

// ----- Concrete products -----

// ***** CPU *****

class MobileCPUTs implements CPUTs {
  /**
   * @override setSeries() method
   */
  setSeries(series: string) {
    console.log(`[MOBILE] ${series}`);
  }
}

class LaptopCPUTs implements CPUTs {
  /**
   * @override setSeries() method
   */
  setSeries(series: string) {
    console.log(`[LAPTOP] ${series}`);
  }
}

// ***** Memory *****

class MobileMemoryTs implements MemoryTs {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity: number) {
    console.log(`[MOBILE] ${capacity}GB`);
  }
}

class LaptopMemoryTs implements MemoryTs {
  /**
   * @override setCapacityInGB() method
   */
  setCapacityInGB(capacity: number) {
    console.log(`[LAPTOP] ${capacity}GB`);
  }
}

// ***** Display *****

class PhoneDisplayTs implements DisplayTs {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[PHONE] 2340x1080`);
  }
}

class TabletDisplayTs implements DisplayTs {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[TABLET] 2048x1536`);
  }
}

class LaptopDisplayTs implements DisplayTs {
  /**
   * @override setResolution() method
   */
  setResolution() {
    console.log(`[LAPTOP] 2560x1600`);
  }
}

// ----- Abstract factory -----
interface DeviceFactoryTs {
  createCPUTs(): CPUTs;
  createMemoryTs(): MemoryTs;
  createDisplayTs(): DisplayTs;
}

// ----- Concrete factories -----
class PhoneDeviceFactoryTs implements DeviceFactoryTs {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in mobile devices
   */
  createCPUTs() {
    return new MobileCPUTs();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in mobile devices
   */
  createMemoryTs() {
    return new MobileMemoryTs();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in phone devices
   */
  createDisplayTs() {
    return new PhoneDisplayTs();
  }
}

class TabletDeviceFactoryTs implements DeviceFactoryTs {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in mobile devices
   */
  createCPUTs() {
    return new MobileCPUTs();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in mobile devices
   */
  createMemoryTs() {
    return new MobileMemoryTs();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in phone devices
   */
  createDisplayTs() {
    return new TabletDisplayTs();
  }
}

class LaptopDeviceFactoryTs implements DeviceFactoryTs {
  /**
   * @override createCPU() method
   * @returns a cpu component to be used in laptops
   */
  createCPUTs() {
    return new LaptopCPUTs();
  }

  /**
   * @override createMemory() method
   * @returns a memory component to be used in laptops
   */
  createMemoryTs() {
    return new LaptopMemoryTs();
  }

  /**
   * @override createDisplay() method
   * @returns a display component to be used in laptops
   */
  createDisplayTs() {
    return new LaptopDisplayTs();
  }
}

type FactoryType = 'phone' | 'tablet' | 'laptop';
/**
 *
 * @param type type of factory family to create
 * @returns A device factory instance
 */
function createFactoryTs(name: FactoryType): DeviceFactoryTs {
  const factories = {
    phone: PhoneDeviceFactoryTs,
    tablet: TabletDeviceFactoryTs,
    laptop: LaptopDeviceFactoryTs,
  };

  const Factory = factories[name];
  return new Factory();
}

/**
 * Main function
 * @param {Params} params devices factory and flag to indicate if is mobile
 */
type Params = { factory: DeviceFactoryTs; isMobileFactory?: boolean };
function appAbstractFactoryTs({
  factory,
  isMobileFactory = true,
}: Params) {
  console.log('\n--- [JS] Calling appAbstractFactory ---\n');
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const cpu = factory.createCPUTs();
  const memory = factory.createMemoryTs();
  const display = factory.createDisplayTs();

  cpu.setSeries(isMobileFactory ? 'MB001' : 'LP001');
  memory.setCapacityInGB(isMobileFactory ? 16 : 32);
  display.setResolution();
}

appAbstractFactoryTs({
  factory: createFactoryTs('phone'),
});
appAbstractFactoryTs({
  factory: createFactoryTs('tablet'),
});
appAbstractFactoryTs({
  factory: createFactoryTs('laptop'),
  isMobileFactory: false,
});