//
//  ViewControllerInscripción.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 17/10/22.
//

import UIKit
import Firebase

class ViewControllerInscripcio_n: UIViewController {

    @IBOutlet weak var txtDescripcion: UITextView!
    @IBOutlet weak var lbNombreCurso: UILabel!
    @IBOutlet weak var lbCodigoTaller: UILabel!
    @IBOutlet weak var lbPeriodo: UILabel!
    
    let db = Firestore.firestore()
    var listaTalleres = [Talleres]()
    var taller1: Talleres!
    
    var talleresCursados = [Talleres]()
    var taller2: Talleres!
    var tallerInscripcion: Talleres!
    
    var alumno1: userAlumno!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        alumno1 = getAlumnoDefault()
        getLatestTaller()
        // Do any additional setup after loading the view.
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
    
    func getLatestTaller() {
        let cDate = Date()
        let formatoMes = DateFormatter()
        let formatoYear = DateFormatter()
        formatoMes.dateFormat = "M"
        formatoYear.dateFormat = "YYYY"
        let mesString = formatoMes.string(from: cDate)
        let yearString = formatoYear.string(from: cDate)
        let mesActual = Int(mesString)!
        let yearActual = Int(yearString)!
        
        var arrTalleres = [Talleres]()
        var unTaller: Talleres!
        db.collection("taller").getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)
                
            }
            else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let codigoTaller = data["codigoTaller"] as! String
                    let periodo = data["periodo"] as! Int
                    let tituloTaller = data["nombreTaller"] as! String
                    let descripTaller = data["Description"] as! String
                    let tetramestre = data["tetramestre"] as! Int
                    
                    
                    unTaller = Talleres(ident: ident, nombreTaller: tituloTaller, codigoTaller: codigoTaller, descripTaller: descripTaller, periodo: periodo, tetramestre: tetramestre)
//                    print(unTaller.codigoTaller)
                    arrTalleres.append(unTaller)
                }
            }
            
            
            var cursosDisponibles = [Talleres]()
            let tetraOffset = self.alumno1.tetraActual + 1
            
            for iTaller in arrTalleres {
                if iTaller.periodo == 2271 && (mesActual >= 9 && mesActual <= 12){
                    cursosDisponibles.append(iTaller)
                }
                else if iTaller.periodo == 2272 && (mesActual >= 1 && mesActual <= 4){
                    cursosDisponibles.append(iTaller)
                }
                else if iTaller.periodo == 2273 && (mesActual >= 5 && mesActual <= 8){
                    cursosDisponibles.append(iTaller)
                }
            }
            
            if tetraOffset - cursosDisponibles[0].tetramestre > tetraOffset - cursosDisponibles[1].tetramestre {
                self.tallerInscripcion = cursosDisponibles[0]
                self.lbNombreCurso.text = "\(cursosDisponibles[0].nombreTaller)"
                self.lbCodigoTaller.text = "\(cursosDisponibles[0].codigoTaller)"
                self.txtDescripcion.text = "\(cursosDisponibles[0].descripTaller)"
                if cursosDisponibles[0].periodo == 2271 {
                    self.lbPeriodo.text = "Enero - Abril \(yearActual)"
                }
                else if cursosDisponibles[0].periodo == 2272 {
                    self.lbPeriodo.text = "Mayo - Agosto \(yearActual)"
                }
                else if cursosDisponibles[0].periodo == 2273 {
                    self.lbPeriodo.text = "Septiembre - Diciembre \(yearActual)"
                }
            }
            else {
                self.tallerInscripcion = cursosDisponibles[1]
                self.lbNombreCurso.text = "\(cursosDisponibles[1].nombreTaller)"
                self.lbCodigoTaller.text = "\(cursosDisponibles[1].codigoTaller)"
                self.txtDescripcion.text = "\(cursosDisponibles[1].descripTaller)"
            }
            
//            for iTaller in cursosDisponibles {
//                if iTaller.periodo == self.alumno1.tetraActual + 1 {
//                    self.lbNombreCurso.text = "\(iTaller.nombreTaller)"
//                    self.lbCodigoTaller.text = "\(iTaller.codigoTaller)"
//                    self.txtDescripcion.text = "\(iTaller.descripTaller)"
//                    print(iTaller.codigoTaller)
//                }
//            }
        }
        
//        self.taller1 = unTaller
//        self.listaTalleres = arrTalleres
        
        
//        self.lbNombreCurso.text = "\(listaTalleres[0].tetramestre)"
//        self.lbCodigoTaller.text = "aa"
        
//        if let i = listaTalleres.firstIndex(where: { $0.tetramestre == 1} ) {
//            print(listaTalleres[i].codigoTaller)
//            self.lbNombreCurso.text = "\(listaTalleres[i].nombreTaller)"
//            self.lbCodigoTaller.text = "\(listaTalleres[i].codigoTaller)"
////            print(listaTalleres[i].tetramestre)
//        }
    }
    
    
    @IBAction func btInscribir(_ sender: Any) {
        let _ = db.collection("inscripcion").addDocument(data: [
            "calif": 0,
            "campus": alumno1.campus,
            "codigoTaller": tallerInscripcion.codigoTaller,
            "grupoID": 1,
            "matricula": alumno1.matricula,
            "periodo": tallerInscripcion.periodo,
            "status": "Cursando",
            "tetramestre": alumno1.tetraActual + 1,
            "tituloTaller": tallerInscripcion.nombreTaller]) { error in
                 if let error = error{ // Si hay error
                     print(error.localizedDescription)
                 } else {
                     print("Datos guardados con éxito")
                     
                     let alerta = UIAlertController(title: "Listo", message: "Alumno inscrito correctamente", preferredStyle: .alert)
                     let accion = UIAlertAction(title: "Okay", style: .cancel)
                     alerta.addAction(accion)
                     self.present(alerta, animated: true)
//                     self.tfMatricula.text = ""
//                     self.tfStatus.text = ""
//                     self.tfPeriodo.text = ""
                 }
             }
    }

    
    // MARK: - Navigation

    @IBAction func Back(_ sender: UIButton) {
        dismiss(animated: true)
    }
    
    @IBAction func finalizar(_ sender: UIButton) {
        let alerta = UIAlertController(title: "Confirmación", message: "Inscripción realizada con éxito", preferredStyle: .alert)
        let accion = UIAlertAction(title: "Okay", style: .cancel)
        alerta.addAction(accion)
        present(alerta, animated: true)
        
        
    }
}
