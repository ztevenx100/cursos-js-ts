/**
 *
 * Prototype challenge:
 *
 * Add RhinoCar class, create instances and clone it.
 *
 * Steps followed to implement the solution:
 *
 * 1. Add RhinoSedanCar class
 * 2. Add RhinoSedanCarFactory class
 * 3. Add setCarFactory method to CarProductionLine class to allow change
 *  car factory to be used
 * 4. Rename mastodonSedanProductionLine by sedanProductionLine
 * 5. Add setProductionLineCarFactory method in Director class
 */

// ----- Base product -----

class BaseCar {
  /**
   * In case that no value for some property is passed, a default
   * value has been assigned to each one.
   *
   * @param edition edition of car like cvt/signature
   * @param model car model like sedan/hatchback
   * @param airBags number of car air bags
   * @param color car color
   */
  constructor({
    edition = '',
    model = '',
    airBags = 0,
    color = '',
  } = {}) {
    this._edition = edition;
    this._model = model;
    this._airBags = airBags;
    this._color = color;
  }

  /**
   * Base car edition attribute setter
   * @param {string} edition car edition
   */
  set edition(edition) {
    this._edition = edition;
  }

  /**
   * Base car model attribute setter
   * @param {string} model car model (sedan/hatchbak)
   */
  set model(model) {
    this._model = model;
  }

  /**
   * Base car airBags attribute setter
   * @param {number} howMany airbags number
   */
  set airBags(howMany) {
    this._airBags = howMany;
  }

  /**
   * Base car color attribute setter
   * @param {string} color car color from a specific list
   */
  set color(color) {
    this._color = color;
  }

  /**
   * Base car edition attribute getter
   * @returns car edition
   */
  get edition() {
    return this._edition;
  }

  /**
   * Base car model attribute getter
   * @returns car model
   */
  get model() {
    return this._model;
  }

  /**
   * Base car airBags attribute getter
   * @returns airbags number
   */
  get airBags() {
    return this._airBags;
  }

  /**
   * Base car color attribute getter
   * @returns car color
   */
  get color() {
    return this._color;
  }

  /**
   * Abastract method to be implemented by all the classes
   * that inherits from BaseCar.
   */
  clone() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete products -----

class MastodonSedanCar extends BaseCar {
  /**
   * Since JS is not strict with the functions signature
   * verification we don't need to do constructor overload.
   * We can use the same signature for all the cases.
   *
   * @param carToClone instance of MastodonSedanCar
   */
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      model: 'sedan',
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  /**
   * @override clone() method
   * @returns a mastodon sedan car configured as the original
   */
  clone() {
    return new MastodonSedanCar(this);
  }
}

class RhinoSedanCar extends BaseCar {
  /**
   * Since JS is not strict with the functions signature
   * verification we don't need to do constructor overload.
   * We can use the same signature for all the cases.
   *
   * @param carToClone instance of MastodonSedanCar
   */
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      model: 'sedan',
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  /**
   * @override clone() method
   * @returns a mastodon sedan car configured as the original
   */
  clone() {
    return new RhinoSedanCar(this);
  }
}

// ----- Base factory -----

class CarFactory {
  create() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete factories -----

class MastodonSedanCarFactory extends CarFactory {
  create() {
    return new MastodonSedanCar();
  }
}

class RhinoSedanCarFactory extends CarFactory {
  create() {
    return new RhinoSedanCar();
  }
}

// ----- Base builder -----

class CarProductionLine {
  /**
   * @param {string} edition sedan edition to be set to car
   */
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {number} howMany number of airbags to be set to car
   */
  setAirBags(howMany) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {string} color color to be set to car
   */
  setColor(color) {
    throw new Error('Method not implemented!');
  }

  /**
   * @param {CarFactory} factory car factory used for production line
   */
  setCarFactory(factory) {
    throw new Error('Method not implemented!');
  }

  /**
   * Emulates how the production line receives a new
   * car to work.
   *
   * @param {BaseCar} newCar new car instance to customize
   */
  resetProductionLine(newCar) {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete builder -----

class SedanProductionLine extends CarProductionLine {
  /**
   *
   * @param {CarFactory} factory car factory instance
   */
  constructor({ factory }) {
    super();
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override setEdition() method
   * @param {string} edition car edition
   * @returns production line working instance
   */
  setEditon(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  /**
   * @override setAirBags() method
   * @param {number} howMany airbags number
   * @returns production line working instance
   */
  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  /**
   * @override setColor() method
   * @param {string} color car color
   * @returns production line working instance
   */
  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  /**
   * @override setCarFactory() method
   * @param {CarFactory} factory car factory to be used by production line
   */
  setCarFactory(factory) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  /**
   * @override resetProductionLine() method
   * @param {BaseCar} car new car to be customized by the production line
   */
  resetProductionLine(car) {
    this.sedanCar = car;
  }

  /**
   * Restart production line and returns customized sedan car instance.
   *
   * For this case we decided to set BaseCar as return type.
   *
   * @returns {BaseCar} base car instance
   */
  build() {
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

// ----- Director -----

class Director {
  /**
   * Set the production line to be used for the director to build editions
   * @param {CarProductionLine} productionLine contains concrete customization steps implementation
   */
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  /**
   * Set a new car factory to be used by the production line
   * @param {CarFactory} carFactory new car factory
   */
  setProductionLineCarFactory(carFactory) {
    this.productionLine.setCarFactory(carFactory);
  }

  /**
   * Sedan CVT Edition customization steps
   */
  constructCvtEdition() {
    this.productionLine.setAirBags(4).setColor('red').setEditon('cvt');
  }

  /**
   * Sedan Signature Edition customization steps
   */
  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('gray')
      .setEditon('signature');
  }
}

/**
 * Main function
 */
function appPrototype(director) {
  console.log('--- [JS] Calling appPrototype ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const sedanProductionLine = new SedanProductionLine({
    factory: new MastodonSedanCarFactory(),
  });

  director.setProductionLine(sedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = sedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log('\n--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtClone);

  /**
   * 1. We update the car factory to use Rhino cars factory
   * 2. Create Rhino cars and clone them
   * */
  director.setProductionLineCarFactory(new RhinoSedanCarFactory());
  director.constructCvtEdition();
  const rhinoSedanCvt = sedanProductionLine.build();
  console.log('\n--- Rhino Sedan CVT ---\n');
  console.log(rhinoSedanCvt);

  const rhinoSedanCvtClone = rhinoSedanCvt.clone();
  console.log('\n--- Rhino Sedan CVT Clone ---\n');
  console.log(rhinoSedanCvtClone);
}

appPrototype(new Director());