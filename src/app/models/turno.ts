export class Turno {
  especialista?: string;
  fecha?: string;
  hora?: string;
  uid?: string;
  especialidad?: string;
  paciente?: string;
  estado?: string;
  opinion?: boolean;

  constructor(
    uid?: string,
    fecha?: string,
    hora?: string,
    especialista?: string,
    paciente?: string,
    especialidad?: string,
    estado?: string,
    opinion?: boolean
  ) {
    this.fecha = fecha ? fecha : "";
    this.hora = hora ? hora : "";
    this.especialista = especialista ? especialista : "";
    this.paciente = paciente ? paciente : "";
    this.uid = uid ? uid : "";
    this.especialidad = especialidad ? especialidad : "";
    this.estado = estado ? estado : "";
    this.opinion = opinion ? opinion : false;
  }
}
