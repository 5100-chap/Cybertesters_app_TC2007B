//
//  ViewControllerCursos.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 31/10/22.
//

import UIKit
import Firebase

class ViewControllerCursos: UIViewController {
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var matricula: String?
    
    var listaAlumnos = [Alumno]()
    var arrAlumnos = [Alumno]()
    
    
    @IBOutlet weak var tlNombre: UILabel!
    
    var nombre: String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        getAlumno()
        
        
    }
    
    
    func getAlumno(){
        matricula = defaults.string(forKey: "matricula")!
        db.collection("alumno").whereField("matricula", isEqualTo: matricula!)
        .getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)

            } else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let matricula = data["matricula"] as! String
                    let nombre = data["nombre"] as! String
                    let correoIn = data["correoInstitucional"] as! String
                    let password = data["password"] as! String
                    let campus = data["campus"] as! String
    
                    let unAlumno = Alumno(ident: ident, matricula: matricula, nombre: nombre, correoInstitucional: correoIn, password: password, campus: campus)
                    self.arrAlumnos.append(unAlumno)
                    
                }
                self.listaAlumnos = self.arrAlumnos
                self.tlNombre.text = self.listaAlumnos[0].nombre
            }
        
        }
    }
        
    
    


    // MARK: - Navigation



}
