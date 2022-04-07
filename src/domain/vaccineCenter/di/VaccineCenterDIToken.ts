export class VaccineCenterDIToken {
  // Service
  public static readonly GetAllVaccineCenterService: unique symbol = Symbol(
    'GetAllVaccineCenterService',
  );

  // Repository
  public static readonly IVaccineCenterRepository: unique symbol = Symbol(
    'IVaccineCenterRepository',
  );
}
