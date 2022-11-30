//
//  ViewControllerTetramestre.swift
//  appProyecto
//
//  Created by Hugo Palomares on 09/11/22.
//

import UIKit
import Firebase

class ViewControllerTetramestre: UIViewController {
    
    @IBOutlet weak var nombreAlumno: UILabel!
    var listaTalleres = [taller]()
    var taller1: taller!

    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var matricula: String!
    var alumno1: userAlumno!
//    var unTaller: taller!
    
    @IBOutlet weak var lbDetalle: UILabel!
    @IBOutlet weak var lbCodigoTaller: UILabel!
    @IBOutlet weak var lbNombreTaller: UILabel!
    @IBOutlet weak var lbStatus: UILabel!
    @IBOutlet weak var lbCampus: UILabel!
    @IBOutlet weak var lbPeriodo: UILabel!
    @IBOutlet weak var lbCalif: UILabel!
    @IBOutlet weak var vista3: UIView!
    @IBOutlet weak var lbTetramestre: UILabel!
    
    @IBOutlet weak var btTetra1: UIButton!
    @IBOutlet weak var btTetra2: UIButton!
    @IBOutlet weak var btTetra3: UIButton!
    @IBOutlet weak var btTetra4: UIButton!
    @IBOutlet weak var btTetra5: UIButton!
    @IBOutlet weak var btTetra6: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        let taller1 = getTaller()
//        var t = 1;
        
        btTetra1.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        btTetra2.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        btTetra3.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        btTetra4.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        btTetra5.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        btTetra6.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
        
        btTetra1.layer.cornerRadius = CGFloat(19)
        btTetra2.layer.cornerRadius = CGFloat(19)
        btTetra3.layer.cornerRadius = CGFloat(19)
        btTetra4.layer.cornerRadius = CGFloat(19)
        btTetra5.layer.cornerRadius = CGFloat(19)
        btTetra6.layer.cornerRadius = CGFloat(19)
        
        btTetra1.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        btTetra2.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        btTetra3.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        btTetra4.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        btTetra5.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        btTetra6.layer.borderColor = CGColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 255/255)
        
        alumno1 = getAlumnoDefault()
        if (alumno1.tetraActual == 0) {
            getTaller(tetramestre: 1)
        }
        else{
            getTaller(tetramestre: alumno1.tetraActual)
        }
        nombreAlumno.text = alumno1.nombre
        lbDetalle.text = alumno1.campus + " / Tetramestre " + String(alumno1.tetraActual)
        
        enableButtons()
        // Do any additional setup after loading the view.
    }
    
    func enableButtons(){
        if alumno1.tetraActual == 0 || alumno1.tetraActual == 1 {
            btTetra1.isEnabled = true
            btTetra1.backgroundColor = UIColor(named: "cursando")
            btTetra1.layer.cornerRadius = CGFloat(19)
            btTetra1.layer.borderWidth = 3
        }
        if alumno1.tetraActual == 2 {
            btTetra2.isEnabled = true
            btTetra2.backgroundColor = UIColor(named: "cursando")
            btTetra2.layer.cornerRadius = CGFloat(19)
            btTetra2.layer.borderWidth = 3
        }
        if alumno1.tetraActual == 3 {
            btTetra3.isEnabled = true
            btTetra3.backgroundColor = UIColor(named: "cursando")
            btTetra3.layer.cornerRadius = CGFloat(19)
            btTetra3.layer.borderWidth = 3
        }
        if alumno1.tetraActual == 4 {
            btTetra4.isEnabled = true
            btTetra4.backgroundColor = UIColor(named: "cursando")
            btTetra4.layer.cornerRadius = CGFloat(19)
            btTetra4.layer.borderWidth = 3
        }
        if alumno1.tetraActual == 5 {
            btTetra5.isEnabled = true
            btTetra5.backgroundColor = UIColor(named: "cursando")
            btTetra5.layer.cornerRadius = CGFloat(19)
            btTetra5.layer.borderWidth = 3
        }
        if alumno1.tetraActual == 6 {
            btTetra6.isEnabled = true
            btTetra6.backgroundColor = UIColor(named: "cursando")
            btTetra6.layer.cornerRadius = CGFloat(19)
            btTetra6.layer.borderWidth = 3
        }
        
        var t = 1
        while t <= alumno1.tetraActual {
            if t > 1 {
                btTetra1.isEnabled = true
                btTetra1.backgroundColor = UIColor(named: "aprobado")
                btTetra1.layer.cornerRadius = CGFloat(19)
            }
            if t > 2 {
                btTetra2.isEnabled = true
                btTetra2.backgroundColor = UIColor(named: "aprobado")
                btTetra2.layer.cornerRadius = CGFloat(19)
            }
            if t > 3 {
                btTetra3.isEnabled = true
                btTetra3.backgroundColor = UIColor(named: "aprobado")
                btTetra3.layer.cornerRadius = CGFloat(19)
            }
            if t > 4 {
                btTetra4.isEnabled = true
                btTetra4.backgroundColor = UIColor(named: "aprobado")
                btTetra4.layer.cornerRadius = CGFloat(19)
            }
            if t > 5 {
                btTetra5.isEnabled = true
                btTetra5.backgroundColor = UIColor(named: "aprobado")
                btTetra5.layer.cornerRadius = CGFloat(19)
            }
            if t > 6 {
                btTetra6.isEnabled = true
                btTetra6.backgroundColor = UIColor(named: "aprobado")
                btTetra6.layer.cornerRadius = CGFloat(19)
            }
            t += 1
        }
    }
    
    @IBAction func tetra1(_ sender: UIButton) {
        getTaller(tetramestre: 1)
        btTetra1.layer.borderWidth = 3
        btTetra2.layer.borderWidth = 0
        btTetra3.layer.borderWidth = 0
        btTetra4.layer.borderWidth = 0
        btTetra5.layer.borderWidth = 0
        btTetra6.layer.borderWidth = 0
    }
    
    @IBAction func tetra2(_ sender: UIButton) {
        getTaller(tetramestre: 2)
        btTetra1.layer.borderWidth = 0
        btTetra2.layer.borderWidth = 3
        btTetra3.layer.borderWidth = 0
        btTetra4.layer.borderWidth = 0
        btTetra5.layer.borderWidth = 0
        btTetra6.layer.borderWidth = 0
    }
    
    @IBAction func tetra3(_ sender: UIButton) {
        getTaller(tetramestre: 3)
        btTetra1.layer.borderWidth = 0
        btTetra2.layer.borderWidth = 0
        btTetra3.layer.borderWidth = 3
        btTetra4.layer.borderWidth = 0
        btTetra5.layer.borderWidth = 0
        btTetra6.layer.borderWidth = 0
    }
    
    @IBAction func tetra4(_ sender: UIButton) {
        getTaller(tetramestre: 1)
        btTetra1.layer.borderWidth = 0
        btTetra2.layer.borderWidth = 0
        btTetra3.layer.borderWidth = 0
        btTetra4.layer.borderWidth = 3
        btTetra5.layer.borderWidth = 0
        btTetra6.layer.borderWidth = 0
    }
    
    @IBAction func tetra5(_ sender: UIButton) {
        getTaller(tetramestre: 2)
        btTetra1.layer.borderWidth = 0
        btTetra2.layer.borderWidth = 0
        btTetra3.layer.borderWidth = 0
        btTetra4.layer.borderWidth = 0
        btTetra5.layer.borderWidth = 3
        btTetra6.layer.borderWidth = 0
    }
    
    @IBAction func tetra6(_ sender: UIButton) {
        getTaller(tetramestre: 3)
        btTetra1.layer.borderWidth = 0
        btTetra2.layer.borderWidth = 0
        btTetra3.layer.borderWidth = 0
        btTetra4.layer.borderWidth = 0
        btTetra5.layer.borderWidth = 0
        btTetra6.layer.borderWidth = 3
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
                    
                    arrTalleres.append(unTaller)
                }
            }
            self.taller1 = unTaller
            self.listaTalleres = arrTalleres
            
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
            self.lbTetramestre.text = "Tetramestre \(tetramestre)"
            
            
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
    
    
    
    @IBAction func cerrarSesion(_ sender: UIButton) {
        let vistaAnterior = presentingViewController
              let vistaInicial = vistaAnterior?.presentingViewController
              vistaInicial!.dismiss(animated: true)
    }
    
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let vistaDet = segue.destination as! ViewControllerDetalle
        vistaDet.tallerAct = taller1
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
