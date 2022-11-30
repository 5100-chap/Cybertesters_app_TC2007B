//
//  ViewControllerAlumnos.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 11/11/22.
//

import UIKit
import Firebase

class ViewControllerAlumnos: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    
    var nomina: String?

    var codigo: String?
    var grupoId: String = "prueba"
    
    var matricula: String?
    
    var listaAlumnos = [Alumno]()
    
    var admin : Int?
    
    var campus: String?
    
    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var tlNombre: UILabel!
    
    @IBOutlet weak var tlTexto: UILabel!
    
    @IBOutlet weak var ModFechas: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tlTexto.text = "Alumnos del taller " + codigo! + " Grupo " + grupoId
        
        tlNombre.text = defaults.string(forKey: "nombre")!
        
        getAlumnos()
        
        admin = defaults.integer(forKey: "Admin")
        
        if admin == 1 {
            ModFechas.isEnabled = true
            ModFechas.isHidden = false
        } else if admin == 0 {
            ModFechas.isHidden = true
        }
        

    }
    
    func obtenerId(completion: @escaping(String) -> Void){
        campus = defaults.string(forKey: "campus")!
        
        db.collection("inscripcion").whereField("matricula", isEqualTo: matricula!).whereField("codigoTaller", isEqualTo: codigo!).whereField("grupoID", isEqualTo: grupoId) .whereField("campus", isEqualTo: campus!)
            .getDocuments() { (querySnapshot, err) in
                if let error = err {
                    print(error.localizedDescription)
                } else {
                    for document in querySnapshot!.documents{
                        let data = document.data()
                        let ident = document.documentID
            
                        completion(ident)
                    }
                }
        }
    }
    
    
    func getAlumnos(){
        var arrAlumnos = [Alumno]()
        
        db.collection("alumno-taller").whereField("codigoTaller", isEqualTo: codigo!)
            .whereField("grupoId",isEqualTo: grupoId)
            .getDocuments() { (querySnapshot, err) in
                if let err = err {
                    print("Error getting documents: \(err)")
                } else {
                    for document in querySnapshot!.documents {
                        let data = document.data()
                        let ident = document.documentID
                        let matricula = data["matricula"] as! String
                        
                        
                        let unAlumno = Alumno(ident: ident, matricula: matricula, nombre: "", correoInstitucional: "", password: "", campus: "")
                        arrAlumnos.append(unAlumno)
                        
                    }
                    self.listaAlumnos = arrAlumnos
                    self.tableView.reloadData()
                }
                
            }
    }
        
        //MARK: - Métodos de data source
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return listaAlumnos.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let celda = tableView.dequeueReusableCell(withIdentifier: "celda")!
            celda.textLabel?.text = listaAlumnos[indexPath.row].matricula
            celda.imageView?.image = UIImage(named:"user")
    
            return celda
        }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            
            matricula = listaAlumnos[indexPath.row].matricula
            
            obtenerId(){ id in
                self.db.collection("inscripcion").document(id).delete()
            }
            
            db.collection("alumno-taller").document(listaAlumnos[indexPath.row].ident).delete()
            
            listaAlumnos.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
            
            let alerta = UIAlertController(title: "Listo", message: "Alumno dado de baja del curso exitosamente", preferredStyle: .alert)
            let accion = UIAlertAction(title: "Okay", style: .cancel)
            alerta.addAction(accion)
            self.present(alerta, animated: true)
            
            
            
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }
    }
    
    
    @IBAction func cerrarSesion(_ sender: UIButton) {
        let vistaAnterior = presentingViewController
              let vistaInicial = vistaAnterior?.presentingViewController
              vistaInicial!.dismiss(animated: true)
    }
    
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "detalle"{
            let vistaAlumno = segue.destination as! ViewControllerDetalleAlumno
            let indice = tableView.indexPathForSelectedRow!
            
            vistaAlumno.matricula = listaAlumnos[indice.row].matricula
        } else if segue.identifier == "add" {
            let vistaAdd = segue.destination as! ViewControllerAddAlumno
            vistaAdd.codigo = codigo
            vistaAdd.grupoId = grupoId
            vistaAdd.vistaIni = self
            
        }
        
    }
    
    
    
    
}
