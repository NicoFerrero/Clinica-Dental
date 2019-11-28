export class Opinion {
  especialista?: number;
  clinica?: number;
  opinion?: string;
  uid?: string;
  paciente?: string;
  turno?: string;

  constructor(
    uid?: string,
    clinica?: number,
    opinion?: string,
    especialista?: number,
    paciente?: string,
    turno?: string
  ) {
    this.clinica = clinica ? clinica : 0;
    this.opinion = opinion ? opinion : "";
    this.especialista = especialista ? especialista : 0;
    this.paciente = paciente ? paciente : "";
    this.uid = uid ? uid : "";
    this.turno = turno ? turno : "";
  }
}
