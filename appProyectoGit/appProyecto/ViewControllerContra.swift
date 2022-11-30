//
//  ViewControllerContra.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 17/10/22.
//

import UIKit
import Firebase

class ViewControllerContra: UIViewController {
    
    @IBOutlet weak var tlNombre: UILabel!
    
    @IBOutlet weak var tfContra: UITextField!
    
    var listaAlumnos = [Alumno]()
    var db = Firestore.firestore()
    var arrAlumnos = [Alumno]()
    
    var matricula:String!
    
    var pass:String!
    let defaults = UserDefaults.standard
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        getAlumno()
    }
    
    
    func getAlumno(){
        matricula = defaults.string(forKey: "matricula")
        
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
                self.pass = self.listaAlumnos[0].password
            }
        
        }
    }
    
    // MARK: - Navigation
    
    
  
    
    
    override func shouldPerformSegue(withIdentifier identifier: String, sender: Any?) -> Bool {
        if identifier == "iniciar"{
            if tfContra.text == "" {
                let alerta = UIAlertController(title: "Error", message: "No se introdujo una contraseña", preferredStyle: .alert)
                let accion = UIAlertAction(title: "Okay", style: .cancel)
                alerta.addAction(accion)
                present(alerta, animated: true)
                return false
                
            } else if tfContra.text != self.pass {
                let alerta = UIAlertController(title: "Error", message: "Contraseña incorrecta", preferredStyle: .alert)
                let accion = UIAlertAction(title: "Okay", style: .cancel)
                alerta.addAction(accion)
                present(alerta, animated: true)
                return false
            }
        }
        return true
    }
    /*
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "iniciar"{
            let viewEditar = segue.destination as! ViewControllerCursos
            
            viewEditar.nombre = self.listaAlumnos[0].nombre
            
        }
    }
     
     */
}
