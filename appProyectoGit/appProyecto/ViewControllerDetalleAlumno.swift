//
//  ViewControllerDetalleAlumno.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 11/11/22.
//

import UIKit
import Firebase

class ViewControllerDetalleAlumno: UIViewController {
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    
    var matricula: String!
    var periodo: String!
    var estatus: String!

    
   // var Alumno: Alumno!

    // Coordinador
    @IBOutlet weak var tlNombre: UILabel!
    
    // Alumno
    @IBOutlet weak var tlMatricula: UILabel!
    @IBOutlet weak var tlNombreAlumno: UILabel!
    @IBOutlet weak var tlCampus: UILabel!
    @IBOutlet weak var tlCorreo: UILabel!
    @IBOutlet weak var tlPeriodo: UILabel!
    @IBOutlet weak var tlEstatus: UILabel!
    @IBOutlet weak var lbTetra: UILabel!
     
     
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tlNombre.text = defaults.string(forKey: "nombre")!
        
        getAlumno()
        getDetalle()

    }
    func getAlumno(){
        
        db.collection("alumno").whereField("matricula", isEqualTo: matricula)
        .getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)

            } else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    
                    let matricula : String = data["matricula"] as! String
                    let nombre : String = data["nombre"] as! String
                    let campus: String = data["campus"] as! String
                    let correo: String = data["correoInst"] as! String
                    let tetramestre: Int = data["tetramestreActual"] as! Int
                    
                    self.tlNombreAlumno.text = nombre
                    self.tlMatricula.text = matricula
                    self.tlCampus.text = campus
                    self.tlCorreo.text = correo
                    self.lbTetra.text = String(tetramestre)
                     
                }
            }
        }
    }
    
    func getDetalle(){
        
        let cDate = Date()
        let formatoMes = DateFormatter()
        let formatoYear = DateFormatter()
        formatoMes.dateFormat = "M"
        formatoYear.dateFormat = "YYYY"
        let mesString = formatoMes.string(from: cDate)
        let yearString = formatoYear.string(from: cDate)
        let mesActual = Int(mesString)!
        let yearActual = Int(yearString)!
        
        db.collection("alumno-taller").whereField("matricula", isEqualTo: matricula)
        .getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)

            } else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    
                    let ident = document.documentID
                    
                    let estatus : String = data["estatus"] as! String
                    let periodo : Int = data["periodo"] as! Int
                    
                    self.tlEstatus.text = estatus
                    
                    if estatus == "Reprobado"{
                        self.tlEstatus.textColor = UIColor(named: "reprobado")
                    }
                    else if estatus == "Cursando"{
                        self.tlEstatus.textColor = UIColor(named: "cursando")
                        
                    }
                    else if estatus == "Aprobado"{
                        self.tlEstatus.textColor = UIColor(named: "aprobado")
                    }
                    else if estatus == "Baja"{
                        self.tlEstatus.textColor = UIColor(named: "baja")
                        
                    }
                    
                    
                    if periodo == 2271 {
                        self.tlPeriodo.text = "Enero - Abril \(yearActual)"
                    }
                    else if periodo == 2272 {
                        self.tlPeriodo.text = "Mayo - Agosto \(yearActual)"
                    }
                    else if periodo == 2273 {
                        self.tlPeriodo.text = "Septiembre - Diciembre \(yearActual)"
                    }
                    
                    
                }
            }
        }
        
    }
    
    
    
    
    @IBAction func cerrarSesion(_ sender: UIButton) {
        let vistaAnterior = presentingViewController
              let vistaInicial = vistaAnterior?.presentingViewController
              vistaInicial!.dismiss(animated: true)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
