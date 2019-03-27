// Node Modules
const express = require('express');

// Test Modules
const createServer = require('../server');

const commonDeps = { app: express(), serverPort: 0 };

describe('createServer', () => {
  it('should return a Promise', () => {
    const createServerPromise = createServer(commonDeps);
    expect(createServerPromise).toBeInstanceOf(Promise);
    return createServerPromise;
  });

  it('should be a function', () => {
    expect(createServer).toBeInstanceOf(Function);
  });

  it('should resolve to an express application instance', () => {
    return createServer(commonDeps).then((app) => {
      expect(app).toBeInstanceOf(Function);
    });
  });
});

describe('setupMiddlewares', () => {
  it('should be a function', () => {
    expect(createServer.setupMiddlewares).toBeInstanceOf(Function);
  });

  it('should assign middlewares', () => {
    // Create a fake express application with a mocked `use` method.
    const mockedApp = express();
    mockedApp.use = jest.fn();
    const mockedDependencies = {
      ...commonDeps,
      app: mockedApp,
    };

    return createServer.setupMiddlewares(mockedDependencies).then(() => {
      expect(mockedApp.use).toHaveBeenCalled();
    });
  });

  it('should return a Promise', () => {
    expect(createServer.setupMiddlewares(commonDeps)).toBeInstanceOf(Promise);
  });

  it('should resolve to the passed interface', () => {
    return createServer.setupMiddlewares(commonDeps).then((data) => {
      expect(data).toEqual(commonDeps);
    });
  });
});

describe('setupRoutes', () => {
  it('should return a Promise', () => {
    expect(createServer.setupRoutes(commonDeps)).toBeInstanceOf(Promise);
  });

  it('should be a function', () => {
    expect(createServer.setupRoutes).toBeInstanceOf(Function);
  });

  it('should resolve to the passed interface', () => {
    return createServer.setupRoutes(commonDeps).then((data) => {
      expect(data).toEqual(commonDeps);
    });
  });

  it('should set a static route on `/static`', () => {
    // Create a fake express application with a mocked `use` method.
    const mockedApp = express();
    mockedApp.use = jest.fn();
    const mockedDependencies = {
      ...commonDeps,
      app: mockedApp,
    };

    return createServer.setupRoutes(mockedDependencies).then(() => {
      expect(mockedApp.use).toHaveBeenCalledWith('/static', expect.any(Function));
    });
  });

  it('should set the main express.Router on `/`', () => {
    // Create a fake express application with a mocked `use` method.
    const mockedApp = express();
    mockedApp.use = jest.fn();
    const mockedDependencies = {
      ...commonDeps,
      app: mockedApp,
    };

    return createServer.setupRoutes(mockedDependencies).then(() => {
      expect(mockedApp.use).toHaveBeenCalledWith('/', expect.any(Function));
    });
  });
});

describe('initServer', () => {
  it('should be a function', () => {
    expect(createServer.initServer).toBeInstanceOf(Function);
  });

  it('should return a Promise', () => {
    expect(createServer.initServer(commonDeps)).toBeInstanceOf(Promise);
  });

  it('should resolve to the passed interface', () => {
    return createServer.initServer(commonDeps).then((data) => {
      expect(data).toEqual(commonDeps);
    });
  });

  it('should make the application listen on the defined port', () => {
    // Create a fake express application with a mocked `use` method.
    const mockedApp = express();
    mockedApp.listen = jest.fn().mockImplementation((_, cb) => cb());
    const mockedDependencies = {
      ...commonDeps,
      app: mockedApp,
      serverPort: 8081,
    };

    return createServer.initServer(mockedDependencies).then(() => {
      expect(mockedApp.listen).toHaveBeenCalled();
      expect(mockedApp.listen).toHaveBeenCalledWith(mockedDependencies.serverPort, expect.anything());
    });
  });
});
