//
//  ViewControllerAddAlumno.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 14/11/22.
//

import UIKit
import Firebase

class ViewControllerAddAlumno: UIViewController {
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var codigo: String?
    var grupoId: String?
    
    var estatus: String = "Cursando"
    var periodo: String = "Enero – Abril"
    
    var vistaIni : ViewControllerAlumnos!
    var campus : String!
    var taller1 : Talleres!
    
    
    @IBOutlet weak var tfMatricula: UITextField!
    
    @IBOutlet weak var estatusMenu: UIButton!
    
    @IBOutlet weak var periodoMenu: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setEstatusButton()
        setPeriodoButton()
        getTaller()
    }
    
    func  setPeriodoButton(){
        
            let optionClosure = {(action: UIAction) in
                self.periodo = action.title
            }
          
        periodoMenu.menu = UIMenu(children: [
            UIAction(title: "Enero – Abril", state: .on, handler: optionClosure),
                UIAction(title: "Mayo – Agosto", state: .off, handler: optionClosure),
                UIAction(title: "Sep – Diciembre", state: .off, handler: optionClosure),
            ])
    
        periodoMenu.showsMenuAsPrimaryAction = true
        periodoMenu.changesSelectionAsPrimaryAction = true
            
        }
    
    func setEstatusButton(){
        
            let optionClosure = {(action: UIAction) in
                self.estatus = action.title
            }
          
        estatusMenu.menu = UIMenu(children: [
            UIAction(title: "Cursando", state: .on, handler: optionClosure),
                UIAction(title: "Aprobado", state: .off, handler: optionClosure),
                UIAction(title: "Reprobado", state: .off, handler: optionClosure),
            ])
    
        estatusMenu.showsMenuAsPrimaryAction = true
        estatusMenu.changesSelectionAsPrimaryAction = true
            
        }
    
    func verificar (completion: @escaping(String) -> Void){
        db.collection("alumno").whereField("matricula", isEqualTo: tfMatricula.text!)
            .whereField("clave", isEqualTo: "Alumno")
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \(err)")
                } else {
                    if(querySnapshot!.documents.isEmpty){
                        completion("no")
                    
                    } else {
                        completion("si")
                    }
                }
        }
    }
    
    func verificarRepetidos(completion: @escaping(String) -> Void){
        db.collection("alumno-taller").whereField("matricula", isEqualTo: tfMatricula.text!)
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \(err)")
                } else {
                    if(querySnapshot!.documents.isEmpty){
                        completion("no")
                    } else {
                        completion("si")
                    }
                }
        }
    }
    
    func getTaller(){
        
        db.collection("taller").whereField("codigoTaller", isEqualTo: codigo!).getDocuments() { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                    
                    let ident = document.documentID
                    
                    let nombreTaller = data["nombreTaller"] as! String
                    let codigoTaller = data["codigoTaller"] as! String
                    let periodo = data["periodo"] as! Int
                    let tetramestre = data["tetramestre"] as! Int
                    let description = data["Description"] as! String
                    
                    let unTaller = Talleres(ident: ident, nombreTaller: nombreTaller, codigoTaller: codigoTaller, descripTaller: description, periodo: periodo, tetramestre: tetramestre)
                    
                    self.taller1 = unTaller
            
                }
                
            }
        }
        
    }
    
    
    @IBAction func AñadirAlumno(_ sender: UIButton) {
        
        campus = defaults.string(forKey: "campus")!
        
        if tfMatricula.text == "" {
            let alerta = UIAlertController(title: "Error", message: "No deje en blanco el campo de matricula", preferredStyle: .alert)
            let accion = UIAlertAction(title: "Okay", style: .cancel)
            alerta.addAction(accion)
            self.present(alerta, animated: true)
            
        } else {
            
            verificar(){ existe in
                if existe == "no"{
                    let alerta = UIAlertController(title: "Error", message: "No se encuentró un alumno asociado con la matrícula introducida", preferredStyle: .alert)
                    let accion = UIAlertAction(title: "Okay", style: .cancel)
                    alerta.addAction(accion)
                    self.present(alerta, animated: true)
                    
                } else if existe == "si"{
                    
                    self.verificarRepetidos(){ repetido in
                        
                        if repetido == "si"{
                            let alerta = UIAlertController(title: "Error", message: "Este alumno ya esta inscrito en el curso", preferredStyle: .alert)
                            let accion = UIAlertAction(title: "Okay", style: .cancel)
                            alerta.addAction(accion)
                            self.present(alerta, animated: true)
                            
                        } else if repetido == "no"{
                            var codigo : Int?
                            
                            if self.periodo == "Enero – Abril"{
                                codigo = 2271
                            } else if self.periodo == "Mayo – Agosto"{
                                codigo = 2272
                            } else if self.periodo == "Sep – Diciembre"{
                                codigo = 2273
                            }
                            let _ = self.db.collection("alumno-taller").addDocument(data: [
                                "codigoTaller": self.codigo!, "estatus": self.estatus, "grupoId":self.grupoId!, "matricula": self.tfMatricula.text!, "periodo": codigo! ]) { error in
                                    if let error = error{ // Si hay error
                                        print(error.localizedDescription)
                                    } else {
                                        print("Datos guardados con éxito")
                                        
                                        let alerta = UIAlertController(title: "Listo", message: "Alumno inscrito correctamente", preferredStyle: .alert)
                                        let accion = UIAlertAction(title: "Okay", style: .cancel)
                                        alerta.addAction(accion)
                                        self.present(alerta, animated: true)
                                        self.tfMatricula.text = ""
                                        
                                    }
                                }
                            let _ = self.db.collection("inscripcion").addDocument(data: [
                                "calif": 0, "campus": self.campus!, "codigoTaller": self.codigo!, "grupoID": self.grupoId!, "matricula": self.tfMatricula.text!, "periodo": codigo!,"status": self.estatus, "tetramestre": self.taller1.tetramestre, "tituloTaller": self.taller1.nombreTaller]) { error in
                                    if let error = error{ // Si hay error
                                        print(error.localizedDescription)
                                    } else {
                                        print("Datos guardados con éxito")
                                        
                                    }
                                }
                        }
                        
                    }
                }
            }
        }
    }
    

    override func viewWillDisappear(_ animated: Bool) {
        vistaIni.getAlumnos()
    }
 
    
}
