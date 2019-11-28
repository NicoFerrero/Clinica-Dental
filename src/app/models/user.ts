export class User {
  email?: string;
  password?: string;
  tipo?: string;
  nombre?: string;
  apellido?: string;
  foto?: string;
  uid?: string;
  especialidad?: string;

  constructor(
    uid?: string,
    email?: string,
    password?: string,
    tipo?: string,
    nombre?: string,
    apellido?: string,
    foto?: string,
    especialidad?: string
  ) {
    this.email = email ? email : "";
    this.password = password ? password : "";
    this.tipo = tipo ? tipo : "";
    this.nombre = nombre ? nombre : "";
    this.apellido = apellido ? apellido : "";
    this.foto = foto ? foto : "";
    this.uid = uid ? uid : "";
    this.especialidad = especialidad ? especialidad : "";
  }
}
