//
//  ViewControllerFechas.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 21/11/22.
//

import UIKit
import Firebase

class ViewControllerFechas: UIViewController {
    
    
    //Variables
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    
    var codigo: String?
    var grupoId: String?
    var campus: String?
    var documentID: String?
    
    var dateInicio: String?
    var dateFinal: String?
    
    //Outlets
    
    @IBOutlet weak var tlFechaIn: UILabel!
    
    @IBOutlet weak var tlFechaFin: UILabel!
    
    @IBOutlet weak var detalle: UILabel!
    
    @IBOutlet weak var dateI: UIDatePicker!
    
    @IBOutlet weak var dateFin: UIDatePicker!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        getFechas()
        
        dateI.preferredDatePickerStyle = .compact
        dateFin.preferredDatePickerStyle = .compact
        
        let date = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        var dateInicial = formatter.string(from: date)
        
        dateInicio = dateInicial
        dateFinal = dateInicial
        
              
    }
    
   
    
    func getFechas(){
        
        var FechaIn : String?
        var FechaFin : String?
        var documentID: String?
        
        codigo = defaults.string(forKey: "Codigo")!
        grupoId = defaults.string(forKey: "grupoID")!
        campus = defaults.string(forKey: "campus")!
        
        
        db.collection("grupo").whereField("codigoTaller", isEqualTo: codigo!)
            .whereField("grupoId",isEqualTo: grupoId!)
            .whereField("campus",isEqualTo: campus!)
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \(err)")
                } else {
                    for document in querySnapshot!.documents {
                        let data = document.data()
                        let ident = document.documentID
                        let fechaFin = data["fechaInscripcionFin"] as! String
                        let fechaIn = data["fechaInscripcionIn"] as! String
                    
                        FechaIn = fechaIn
                        FechaFin = fechaFin
                        documentID = ident
                        
                    }
                    self.tlFechaIn.text = FechaIn!
                    self.tlFechaFin.text = FechaFin!
                    self.detalle.text = "Taller " + self.codigo! + " Gpo " + self.grupoId!
                    self.documentID = documentID
                }
            }
    }
    
    
    @IBAction func ActualizarFechas(_ sender: UIButton) {
        
        db.collection("grupo").document(documentID!).updateData(["fechaInscripcionIn" : dateInicio!])
        db.collection("grupo").document(documentID!).updateData(["fechaInscripcionFin" : dateFinal!])
        
        
        let alerta = UIAlertController(title: "Listo", message: "Fecha actualizada correctamente", preferredStyle: .alert)
        let accion = UIAlertAction(title: "Okay", style: .cancel)
        alerta.addAction(accion)
        self.present(alerta, animated: true)
        
        self.getFechas()
        
    }
    
    
    
    @IBAction func FechaIn(_ sender: UIDatePicker) {
        
        let date = sender.date
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        var dateIn = formatter.string(from: date)
        
        dateInicio = dateIn
        
        print(dateInicio)

    }
    
    @IBAction func FechaFin(_ sender: UIDatePicker) {
        
        let date = sender.date
        let formatter = DateFormatter()
        formatter.dateFormat = "dd/MM/yyyy"
        var dateFinall = formatter.string(from: date)
        
        dateFinal = dateFinall
        print(dateFinal)
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
