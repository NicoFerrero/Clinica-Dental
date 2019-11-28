export class Comentario {
  especialista?: string;
  uid?: string;
  paciente?: string;
  turno?: string;
  comentario?: string;
  consultorio?: string;

  constructor(
    uid?: string,
    comentario?: string,
    especialista?: string,
    paciente?: string,
    turno?: string,
    consultorio?: string
  ) {
    this.comentario = comentario ? comentario : "";
    this.especialista = especialista ? especialista : "";
    this.paciente = paciente ? paciente : "";
    this.uid = uid ? uid : "";
    this.turno = turno ? turno : "";
    this.consultorio = consultorio ? consultorio : "";
  }
}
