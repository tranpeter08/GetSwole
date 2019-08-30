import {config} from './config';

describe('Routes config.js', () => {
  it('contains the right path names', () => {
    const expectedPaths = [
      '/login',
      '/register',
      '/user/:username',
      '/unauthorized',
      '/'
    ];

    expect(config.length).toEqual(expectedPaths.length);
    expect(config[config.length - 1].path).toEqual('/');

    config.forEach(({path}, i) => 
      expect(path).toEqual(expectedPaths[i])
    );

  });
});