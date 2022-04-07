export class DistrictDIToken {
  // Service
  public static readonly GetAllDistrictsService: unique symbol = Symbol(
    'GetAllDistrictsService',
  );

  // Repository
  public static readonly IDistrictRepository: unique symbol = Symbol(
    'IDistrictRepository',
  );
}
