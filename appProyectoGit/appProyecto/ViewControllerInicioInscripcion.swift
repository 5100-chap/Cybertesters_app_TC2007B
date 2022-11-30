//
//  ViewControllerInicioInscripcion.swift
//  appProyecto
//
//  Created by Hugo Palomares on 18/11/22.
//

import UIKit
import Firebase

class ViewControllerInicioInscripcion: UIViewController {
    
    let db = Firestore.firestore()
    var listaTalleres = [Talleres]()
    var taller1: Talleres!
    
    var talleresCursados = [Talleres]()
    var taller2: Talleres!
    
    var alumno1: userAlumno!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        alumno1 = getAlumnoDefault()
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
    
    func getTalleresCursados() {
        var arrTalleres = [Talleres]()
        var unTaller: Talleres!
        db.collection("inscripcion").whereField("matricula", isEqualTo: alumno1.matricula).getDocuments() { QuerySnapshot, error in
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
                    arrTalleres.append(unTaller)
                }
            }
        }
        
        self.taller2 = unTaller
        self.talleresCursados = arrTalleres
    }
    
    func getLatestTaller() {
        let cDate = Date()
        let formatoFecha = DateFormatter()
        formatoFecha.dateFormat = "M"
        let mesString = formatoFecha.string(from: cDate)
        let mesActual = Int(mesString)
        
        var arrTalleres = [Talleres]()
        var unTaller: Talleres!
        db.collection("taller").whereField("matricula", isEqualTo: alumno1.matricula).getDocuments() { QuerySnapshot, error in
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
                    arrTalleres.append(unTaller)
                }
            }
        }
        
        self.taller1 = unTaller
        self.listaTalleres = arrTalleres
        
        if let i = listaTalleres.firstIndex(where: { $0.tetramestre == alumno1.tetraActual + 1 }) {
            print(listaTalleres[i].tetramestre)
        }
        
//        for i in 0..<listaTalleres.count {
//            if !talleresCursados.contains(listaTalleres[i]) {
//                if mesActual! >= 1 && mesActual! <= 4 {
//
//                }
//                else if mesActual! >= 5 && mesActual! <= 8 {
//
//                }
//                else if mesActual! >= 9 && mesActual! <= 12 {
//
//                }
//
//            }
//        }
        
        //            self.lbCodigoTaller.text = unTaller.codeTaller
        //            self.lbNombreTaller.text = "\(unTaller.titulo) (Gpo \(unTaller.grupoID))"
        //            self.lbStatus.text = unTaller.status
        //            self.lbCampus.text = "Campus: \(unTaller.campus)"
        //            self.lbPeriodo.text = unTaller.periodo
        //            self.lbCalif.text = "\(unTaller.calif)"
        //                self.lbTetramestre.text = "Tetramestre \(tetramestre)"
        
        
        //            if unTaller.status == "Reprobado"{
        //                self.lbStatus.textColor = UIColor(named: "reprobado")
        //                self.vista3.backgroundColor = UIColor(named: "reprobado")
        //                self.lbCalif.backgroundColor = UIColor(named: "reprobado")
        //
        //            }
        //            else if unTaller.status == "Cursando"{
        //                self.lbStatus.textColor = UIColor(named: "cursando")
        //                self.vista3.backgroundColor = UIColor(named: "cursando")
        //                self.lbCalif.backgroundColor =  UIColor(named: "cursando")
        //
        //            }
        //            else if unTaller.status == "Aprobado"{
        //                self.lbStatus.textColor = UIColor(named: "aprobado")
        //                self.vista3.backgroundColor = UIColor(named: "aprobado")
        //                self.lbCalif.backgroundColor =  UIColor(named: "aprobado")
        //            }
        //            else if unTaller.status == "Baja"{
        //                self.lbStatus.textColor = UIColor(named: "baja")
        //                self.vista3.backgroundColor = UIColor(named: "baja")
        //                self.lbCalif.backgroundColor =  UIColor(named: "baja")
        //            }
        
    }
    
    func getTalleres() {
        var arrTalleres = [Talleres]()
        
        db.collection("taller").getDocuments { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let codigoTaller = data["codigoTaller"] as! String
                    let periodo = data["periodo"] as! Int
                    let titulo = data["tituloTaller"] as! String
                    let descripcion = data["Description"] as! String
                    let tetramestre = data["tetramestre"] as! Int
                    
                    let unTaller = Talleres(ident: ident, nombreTaller: titulo, codigoTaller: codigoTaller, descripTaller: descripcion, periodo: periodo, tetramestre: tetramestre)
                    arrTalleres.append(unTaller)
                    
                }
                self.listaTalleres = arrTalleres
            }
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
}
