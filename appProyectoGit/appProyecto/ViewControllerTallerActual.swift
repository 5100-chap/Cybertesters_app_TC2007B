//
//  ViewControllerTallerActual.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 28/11/22.
//

import UIKit
import Firebase

class ViewControllerTallerActual: UIViewController {
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var matricula: String!
    var alumno1: userAlumno!
    
    var listaTalleres = [taller]()
    var taller1: taller!
    
    @IBOutlet weak var nombreAlumno: UILabel!
    @IBOutlet weak var lbDetalle: UILabel!
    @IBOutlet weak var lbCodigoTaller: UILabel!
    @IBOutlet weak var lbNombreTaller: UILabel!
    @IBOutlet weak var lbStatus: UILabel!
    @IBOutlet weak var lbCampus: UILabel!
    @IBOutlet weak var lbPeriodo: UILabel!
    @IBOutlet weak var lbCalif: UILabel!
    @IBOutlet weak var vista3: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        alumno1 = getAlumnoDefault()
        if (alumno1.tetraActual == 0) {
            getTaller(tetramestre: 1)
        }
        else{
            getTaller(tetramestre: alumno1.tetraActual)
        }
        nombreAlumno.text = alumno1.nombre
        lbDetalle.text = alumno1.campus + " / Tetramestre " + String(alumno1.tetraActual)
    }
    
    func getAlumnoDefault() -> userAlumno{
        var alumno: userAlumno!
        if let data = UserDefaults.standard.data(forKey: "usuarioAlumno") {
            do {
                let decoder = JSONDecoder()
                alumno = try decoder.decode(userAlumno.self, from: data)
            }
            catch {
                print("Unable to Decode User (\(error))")
                alumno = userAlumno(ident: "N/A", matricula: "N/A", nombre: "N/A", campus: "N/A", tetraActual: 0)
            }
        }
        return alumno
    }

    
    func getTaller(tetramestre: Int) {
        let cDate = Date()
        let formatoMes = DateFormatter()
        let formatoYear = DateFormatter()
        formatoMes.dateFormat = "M"
        formatoYear.dateFormat = "YYYY"
        let mesString = formatoMes.string(from: cDate)
        let yearString = formatoYear.string(from: cDate)
        let mesActual = Int(mesString)!
        let yearActual = Int(yearString)!
        
        var arrTalleres = [taller]()
        var unTaller: taller!
        
        matricula = defaults.string(forKey: "matricula")
        
        db.collection("inscripcion").whereField("matricula", isEqualTo: alumno1.matricula).whereField("tetramestre", isEqualTo: tetramestre).getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)

            }
            else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let matricula = data["matricula"] as! String
                    let calif = data["calif"] as! Int
                    let codigoTaller = data["codigoTaller"] as! String
                    let grupoID = data["grupoID"] as! String
                    let periodo = data["periodo"] as! Int
                    let status = data["status"] as! String
                    let campus = data["campus"] as! String
                    let tituloTaller = data["tituloTaller"] as! String
                    
                    
                    unTaller = taller(ident: ident, calif: calif, codeTaller: codigoTaller, grupoID: grupoID, periodo: periodo, status: status, campus: campus, titulo: tituloTaller, tetramestre: tetramestre)
                }
            }
            self.taller1 = unTaller
           
            self.lbCodigoTaller.text = unTaller.codeTaller
            self.lbNombreTaller.text = "\(unTaller.titulo) (Gpo \(unTaller.grupoID))"
            self.lbStatus.text = unTaller.status
            self.lbCampus.text = "Campus: \(unTaller.campus)"
//            self.lbPeriodo.text = unTaller.periodo
            
            if unTaller.periodo == 2271 {
                self.lbPeriodo.text = "Enero - Abril \(yearActual)"
            }
            else if unTaller.periodo == 2272 {
                self.lbPeriodo.text = "Mayo - Agosto \(yearActual)"
            }
            else if unTaller.periodo == 2273 {
                self.lbPeriodo.text = "Septiembre - Diciembre \(yearActual)"
            }
            self.lbCalif.text = "\(unTaller.calif)"
            
            if unTaller.status == "Reprobado"{
                self.lbStatus.textColor = UIColor(named: "reprobado")
                self.vista3.backgroundColor = UIColor(named: "reprobado")
                self.lbCalif.backgroundColor = UIColor(named: "reprobado")
                
            }
            else if unTaller.status == "Cursando"{
                self.lbStatus.textColor = UIColor(named: "cursando")
                self.vista3.backgroundColor = UIColor(named: "cursando")
                self.lbCalif.backgroundColor =  UIColor(named: "cursando")
                
            }
            else if unTaller.status == "Aprobado"{
                self.lbStatus.textColor = UIColor(named: "aprobado")
                self.vista3.backgroundColor = UIColor(named: "aprobado")
                self.lbCalif.backgroundColor =  UIColor(named: "aprobado")
            }
            else if unTaller.status == "Baja"{
                self.lbStatus.textColor = UIColor(named: "baja")
                self.vista3.backgroundColor = UIColor(named: "baja")
                self.lbCalif.backgroundColor =  UIColor(named: "baja")
            }
        
        }
        
        
    }
    

    
    @IBAction func CerrarSesion(_ sender: Any) {
        let vistaAnterior = presentingViewController
        let vistaInicial = vistaAnterior?.presentingViewController
        vistaInicial!.dismiss(animated: true)
    }
    
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let vistaDet = segue.destination as! ViewControllerDetalle
        vistaDet.tallerAct = taller1
    }
}
