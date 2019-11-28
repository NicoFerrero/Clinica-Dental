import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";
import { Turno } from "../models/turno";
import { Opinion } from "../models/opinion";
import { Comentario } from "../models/comentario";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: User;
  usersCollection: AngularFirestoreCollection<any>;
  users: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fbStorage: AngularFireStorage
  ) {
    this.usersCollection = this.afs.collection<any>("Users");
    this.users = this.usersCollection.valueChanges();
  }

  login(user: User) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .catch(err => this.eventAuthError.next(err))
      .then(cred => {
        if (cred) {
          const auxFechaHora = new Date();
          const dia = auxFechaHora.getDate();
          const mes = auxFechaHora.getMonth();
          const anio = auxFechaHora.getFullYear();
          const hora = auxFechaHora.getHours();
          const minutos = auxFechaHora.getMinutes();
          const fechaHora = `${dia}/${mes}/${anio} ${hora}:${minutos}`;
          this.getUser(this.currentUser().uid).subscribe(data => {
            this.addLogs(fechaHora, data).then(() => {
              this.router.navigate(["/home"]);
            });
          });
        }
      });
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  async register(user: User) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      this.newUser = user;
      //console.log(cred);
      cred.user.updateProfile({
        // solo es necesario cuando se hacen register con email y pass
        displayName: user.nombre + " " + user.apellido
      });
      this.insertUserData(cred).then(() => {
        this.eventAuthError.next("exito registro");
      });
    } catch (error) {
      this.eventAuthError.next(error);
    }
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      nombre: this.newUser.nombre,
      apellido: this.newUser.apellido,
      uid: userCredential.user.uid,
      foto: this.newUser.foto,
      tipo: this.newUser.tipo
    });
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  getUser(uid: string) {
    return this.afs.doc(`Users/${uid}`).valueChanges();
  }

  getUsers() {
    return this.users;
  }

  subirArchivo(file: any, path: string) {
    return this.fbStorage.upload(path, file);
  }

  traerArchivo(path: string) {
    return this.fbStorage.ref(path).getDownloadURL();
  }

  getPacientes() {
    return this.afs
      .collection("Users", ref => ref.where("tipo", "==", "paciente"))
      .valueChanges();
  }

  getEspecialistas() {
    return this.afs
      .collection("Users", ref => ref.where("tipo", "==", "especialista"))
      .valueChanges();
  }

  getEspecialistasRama(especialidad: string) {
    return this.afs
      .collection("Users", ref =>
        ref
          .where("tipo", "==", "especialista")
          .where("especialidad", "==", especialidad)
      )
      .valueChanges();
  }

  addTurno(turno: Turno) {
    return this.afs
      .collection("Turnos")
      .add(turno)
      .then(ref => {
        this.afs.doc(`Turnos/${ref.id}`).set(
          {
            uid: ref.id,
            estado: "pendiente",
            opinion: false
          },
          { merge: true }
        );
        this.eventAuthError.next("exito turno");
      });
  }

  getTurnos(paciente: string) {
    return this.afs
      .collection("Turnos", ref => ref.where("paciente", "==", paciente))
      .valueChanges();
  }

  getTurnosEspecialista(especialista: string) {
    return this.afs
      .collection("Turnos", ref =>
        ref
          .where("especialista", "==", especialista)
          .where("estado", "==", "pendiente")
      )
      .valueChanges();
  }

  getTurnosAll() {
    return this.afs
      .collection("Turnos", ref => ref.where("estado", "==", "pendiente"))
      .valueChanges();
  }

  getTurno(uid: string) {
    return this.afs
      .collection("Turnos", ref => ref.where("uid", "==", uid))
      .valueChanges();
  }

  cancelarTurno(turno: string) {
    this.afs
      .doc(`Turnos/${turno}`)
      .set(
        {
          estado: "cancelado"
        },
        { merge: true }
      )
      .then(() => {
        this.eventAuthError.next("exito cancelar");
      });
  }

  atenderTurno(turno: string, comentario: Comentario) {
    return this.afs
      .doc(`Turnos/${turno}`)
      .set(
        {
          estado: "atendido"
        },
        { merge: true }
      )
      .then(() => {
        this.afs
          .collection("ComentariosMedicos")
          .add(comentario)
          .then(ref => {
            this.afs.doc(`ComentariosMedicos/${ref.id}`).set(
              {
                uid: ref.id
              },
              { merge: true }
            );
            this.eventAuthError.next("exito atencion");
          });
      });
  }

  //el uid del log es el mismo del user que se loguea por si se necesita mas info
  addLogs(fechaHora: string, user: User) {
    return this.afs.doc(`Logs/${user.uid}`).set({
      fechaHora: fechaHora,
      tipo: user.tipo,
      displayName: `${user.nombre} ${user.apellido}`
    });
  }

  //funciona
  /*getLogs() {
    return this.afs
      .collection("Logs", ref => ref.where("fechaHora", ">", "25/10/2019"))
      .valueChanges();
  }*/
  getLogs() {
    return this.afs.collection("Logs").valueChanges();
  }

  addOpinion(opinion: Opinion) {
    return this.afs
      .collection("Opiniones")
      .add(opinion)
      .then(ref => {
        this.afs
          .doc(`Opiniones/${ref.id}`)
          .set(
            {
              uid: ref.id
            },
            { merge: true }
          )
          .then(() => {
            this.afs
              .doc(`Turnos/${opinion.turno}`)
              .set(
                {
                  opinion: true
                },
                { merge: true }
              )
              .then(() => {
                this.eventAuthError.next("exito opinion");
              });
          });
      });
  }

  getOpiniones(paciente: string) {
    return this.afs
      .collection("Opiniones", ref => ref.where("paciente", "==", paciente))
      .valueChanges();
  }

  getOpinionTurno(turno: string) {
    return this.afs
      .collection("Opiniones", ref => ref.where("turno", "==", turno))
      .valueChanges();
  }
}
