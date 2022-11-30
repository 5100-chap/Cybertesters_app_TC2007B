//
//  ViewControllerCorreo.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 17/10/22.
//

import UIKit
import Firebase

class ViewControllerCorreo: UIViewController {
    var db = Firestore.firestore()
    var band : Bool?
    var mat : String?
    var nombre : String?
    var campus : String?
    var tetramestre : Int?

    
    let defaults = UserDefaults.standard
    
    @IBOutlet weak var tfCorreo: UITextField!
    
    @IBOutlet weak var tfContra: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    @IBAction func botonRegresar(_ sender: UIButton) {
        dismiss(animated: true)
    }
    
    func verificar (completion: @escaping(String) -> Void){
        db.collection("alumno").whereField("matricula", isEqualTo: tfCorreo.text!)
            .whereField("password", isEqualTo: tfContra.text!)
        
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \(err)")
                } else {
                    if(querySnapshot!.documents.isEmpty){
                        completion("no")
                    
                    } else {
                        let data = querySnapshot!.documents[0].data()
                        let ident = querySnapshot!.documents[0].documentID
                        
                        if  data["clave"] as! String == "Alumno"{
                            self.mat = data["matricula"] as! String
                            self.nombre = data["nombre"] as! String
                            self.campus = data["campus"] as! String
                            self.tetramestre = data["tetramestreActual"] as! Int
                            
                            let unUsuario = userAlumno(ident: ident, matricula: self.mat!, nombre: self.nombre!, campus: self.campus!, tetraActual: self.tetramestre!)
                            
                            do {
                                let encoder = JSONEncoder()
                                let data = try encoder.encode(unUsuario)
                                UserDefaults.standard.set(data, forKey: "usuarioAlumno")
                            } catch {
                                print("Unable to Encode User (\(error))")
                            }
                            self.defaults.set(self.mat, forKey: "matricula")
                            
                            completion("Alumno")
                        }
                        else if data["clave"] as! String == "Coordinador"{
                            self.defaults.set(data["matricula"] as! String, forKey: "nominaCoordinador")
                            self.defaults.set(data["campus"] as! String, forKey: "campus")
                        
                            completion("Coordinador")
                        }
                        else if data["clave"] as! String == "Administrador" {
                            
                            self.defaults.set(data["matricula"] as! String, forKey: "nominaAdmin")
                            self.defaults.set(data["campus"] as! String, forKey: "campus")

                            completion("Administrador")
                            
                        }

                    }
                }
        }
    }
    
    
    @IBAction func ini(_ sender: UIButton) {
        if tfCorreo.text == "" {
            let alerta = UIAlertController(title: "Error", message: "No se introdujo un correo/matricula", preferredStyle: .alert)
            let accion = UIAlertAction(title: "Okay", style: .cancel)
            alerta.addAction(accion)
            present(alerta, animated: true)
            

        } else if tfContra.text == ""{
            let alerta = UIAlertController(title: "Error", message: "No se introdujo una contraseña", preferredStyle: .alert)
            let accion = UIAlertAction(title: "Okay", style: .cancel)
            alerta.addAction(accion)
            present(alerta, animated: true)
            
        } else {
            verificar(){ tipo in
                
                if tipo == "no"{
                    let alerta = UIAlertController(title: "Error", message: "Correo o Contraseña invalido", preferredStyle: .alert)
                    let accion = UIAlertAction(title: "Okay", style: .cancel)
                    alerta.addAction(accion)
                    self.present(alerta, animated: true)
                    
                } else if tipo == "Alumno"{
                    DispatchQueue.main.async {
                        [unowned self] in
                        self.performSegue(withIdentifier: "siguiente", sender: self)
                    }

                } else if tipo == "Coordinador" {
                    DispatchQueue.main.async {
                        [unowned self] in
                        self.performSegue(withIdentifier: "coordinador", sender: self)
                        self.defaults.set(0, forKey: "Cord")
                        self.defaults.set(0, forKey: "Admin")
                    }
            
                } else if tipo == "Administrador" {
                    DispatchQueue.main.async {
                        [unowned self] in
                        self.performSegue(withIdentifier: "Admin", sender: self)
                        self.defaults.set(1, forKey: "Admin")
                    }
                    
                }
            }
            
        }
        
    }
    
    
    
    
    
/*
    override func shouldPerformSegue(withIdentifier identifier: String, sender: Any?) -> Bool {
        
        if identifier == "siguiente"{
            
            if tfCorreo.text == "" {
                let alerta = UIAlertController(title: "Error", message: "No se introdujo un correo/matricula", preferredStyle: .alert)
                let accion = UIAlertAction(title: "Okay", style: .cancel)
                alerta.addAction(accion)
                present(alerta, animated: true)
                return false
                
            } else {
                
                verificar(){ bandera in
                    
                    if bandera == true{
                        let alerta = UIAlertController(title: "Error", message: "No se encontró una cuenta registrada con la informacion proporcionada", preferredStyle: .alert)
                        let accion = UIAlertAction(title: "Okay", style: .cancel)
                                               alerta.addAction(accion)
                        self.present(alerta, animated: true)
                        
                    } else {
                        print("okay")
                        self.band = true
                        
                    }
                }
              
            }
            
            
        }
        if self.band == true{
            return true
        }
        
        return false
    }
    
    
*/
    
    
}
