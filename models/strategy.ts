export type ConfigObject = Record<
  string,
  number | string | Record<string, number | object>
>;

class Strategy<T extends ConfigObject> {
  constructor(config: T) {
    if (new.target === Strategy) {
      throw new TypeError('Strategy is abstract');
    }
  }

  isBroken(data: string) {
    return false;
  }
}

class MarketsDiversityStrategy<T extends ConfigObject> extends Strategy<T> {
  marketsDiversity: Record<string, number> = {};
  threshold = 0.05;
  constructor(config: T) {
    super(config);
    const parsedMarketDiversity = {};
    if (typeof config.marketsDiversity !== 'object')
      throw Error('Market diversity settings missing');
    const marketDiversity = config.marketDiversity as Record<
      string,
      string | number
    >;
    Object.keys(
      config.marketsDiversity as Record<string, string | number>
    ).forEach((item) => {
      const parsedValue = parseInt(`${marketDiversity[item]}`, 10);
      if (isNaN(parsedValue)) throw new Error('Incorrect config field value');
      return parsedValue;
    });
    this.marketsDiversity = parsedMarketDiversity;
  }

  isBroken(data: string) {
    return false;
  }
}

class SingleMarketDiversity<T extends ConfigObject> extends Strategy<T> {
  singleTickerMaximumShare = 0;
  constructor(config: T) {
    super(config);
    if (!config.maximumShare || typeof config.maximumShare === 'object')
      throw Error('Market diversity settings missing');
    this.singleTickerMaximumShare = parseInt(`${config.maximumShare}`, 10);
  }

  isBroken(data: string) {
    return false;
  }
}

class NurtureProfitsTransactionStrategy<
  T extends ConfigObject
> extends Strategy<T> {
  event: 'loss' | 'gain' = 'loss';
  threshold = 0;
  constructor(config: T) {
    super(config);
    const { event, threshold } = config;

    if (!event || typeof event != 'string' || !['gain', 'loss'].includes(event))
      throw new Error('Incorrect type of event object');

    this.event = event as typeof this.event;

    if (
      !threshold ||
      isNaN(parseInt(`${threshold}`, 10)) ||
      parseInt(`${threshold}`, 10) > 1
    )
      throw new Error('Incorrect type of threshold object');

    this.threshold = threshold as number;
  }

  isBroken(data: string) {
    console.log('isBroken');
    return false;
  }
}

class MovingLineStrategy<T extends ConfigObject> extends Strategy<T> {
  threshold = 0.0;
  constructor(config: T) {
    super(config);
    const { threshold } = config;

    if (
      !threshold ||
      isNaN(parseInt(`${threshold}`, 10)) ||
      parseInt(`${threshold}`, 10) > 1
    )
      throw new Error('Incorrect type of threshold object');

    this.threshold = threshold as number;
  }

  isBroken(data: string) {
    return false;
  }
}

const strategies = {
  movingLine: MovingLineStrategy.prototype.constructor,
  nurtureProfits: NurtureProfitsTransactionStrategy.prototype.constructor,
  singleMarketDiversity: SingleMarketDiversity.prototype.constructor,
  marketsDIversity: MarketsDiversityStrategy.prototype.constructor,
};

export default strategies;
