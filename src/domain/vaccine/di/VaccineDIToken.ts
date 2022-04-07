export class VaccineDIToken {
  // Service
  public static readonly GetAllVaccinesService: unique symbol = Symbol(
    'GetAllVaccinesService',
  );

  // Repository
  public static readonly IVaccineRepository: unique symbol =
    Symbol('IVaccineRepository');
}
