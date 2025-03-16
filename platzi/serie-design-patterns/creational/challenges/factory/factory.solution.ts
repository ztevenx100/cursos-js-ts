/**
 *
 * Factory Method challenge:
 *
 * Make a HttpAdapters factory.
 *
 * Steps followed to implement the solution:
 *
 * 1. Add HttpAdapter base product class
 * 2. Add concrete implementation of HttpAdapter: RestHttpAdapter
 * 3. Add HttpAdapterFactory base factory class
 * 4. Add concrete implementation of HttpAdapterFactory: RestHttpAdapterFactory
 */

// ----- Base product -----

/**
 * HttpAdapter base class
 */
abstract class HttpAdapterTs {
/**
 * @param {string} _type adapter type eg. REST, GraphQL
 */
constructor(private _type: string) {}

abstract get(): void;

abstract post(): void;

abstract put(): void;

abstract delete(): void;

/**
 * @returns {string} adapter type
 */
get type(): string {
    return this._type;
}
}

// ----- Concrete product -----

class RestHttpAdapterTs extends HttpAdapterTs {
constructor() {
    super('REST');
}

/** @override get() method */
get() {
    console.log(`[${this.type}] GET method`);
}

/** @override post() method */
post() {
    console.log(`[${this.type}] POST method`);
}

/** @override put() method */
put() {
    console.log(`[${this.type}] PUT method`);
}

/** @override delete() method */
delete() {
    console.log(`[${this.type}] DELETE method`);
}
}

// ----- Base Factory -----

interface HttpAdapterFactoryTs {
makeAdapterTs(): HttpAdapter;
}

// ----- Concrete Factory -----

class RestHttpAdapterFactoryTs implements HttpAdapterFactoryTs {
/**
 * @override makeAdapter() method
 * @returns HttpAdapter
 */
makeAdapterTs() {
    return new RestHttpAdapter();
}
}

/**
 * Main function
 * @param {HttpAdapterFactory} factory HttpAdapter factory
 */
function appFactoryTs(factory: HttpAdapterFactoryTs) {
console.log('--- [JS] Calling appFactory ---\n');

if (!factory) {
    console.log('--- No factory provided ---');
    return;
}

const adapter = factory.makeAdapterTs();
console.log(`Http Adapter is ${adapter.type}\n`);
adapter.get();
adapter.post();
adapter.put();
adapter.delete();
}

appFactory(new RestHttpAdapterFactory());