export class InflowDIToken {
  // Service
  public static readonly GetInflowBetweenDatesService: unique symbol = Symbol(
    'GetInflowBetweenDatesService',
  );

  // Repository
  public static readonly IInflowRepository: unique symbol =
    Symbol('IInflowRepository');
}
