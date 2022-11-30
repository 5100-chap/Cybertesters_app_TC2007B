//
//  ViewControllerAdministrador.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 16/11/22.
//

import UIKit
import Firebase

class ViewControllerAdministrador: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var nomina: String?
    var campus: String?
    
    @IBOutlet weak var tlNombre: UILabel!
    
    @IBOutlet weak var table: UITableView!
    
    var listaCampus = [String]()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        getAdministrador()
        getCampus()
    }
    
    
    func getCampus(){
        
        campus = defaults.string(forKey: "campus")!
        var arrCampus = [String]()
        
        db.collection("grupo").whereField("campus", isNotEqualTo: "").getDocuments() { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                  
        
                    let campus = data["campus"] as! String
                    print(campus)
                
                    arrCampus.append(campus)
                    
                }
                self.listaCampus = arrCampus
                self.table.reloadData()
                
            }
        }
        
        
    }
    
    
    
    func getAdministrador(){
        nomina = defaults.string(forKey: "nominaAdmin")!
        
        
        db.collection("administrador").whereField("nomina", isEqualTo: nomina!)
        .getDocuments() { QuerySnapshot, error in
            if let error = error{
                print(error.localizedDescription)

            } else {
                for document in QuerySnapshot!.documents{
                    let data = document.data()
                    
                    let nombre : String = data["nombre"] as! String
                    
                    self.tlNombre.text = nombre
                    
                    self.defaults.set(nombre, forKey: "nombre")
                }
            }
        }
    }
    
   //MARK: - Métodos de data source
   func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
       return listaCampus.count
   }
   
   func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
       let celda = tableView.dequeueReusableCell(withIdentifier: "celda")!
       
       celda.textLabel?.text = listaCampus[indexPath.row]
     
       celda.imageView?.image = UIImage(named:"school")
       
       return celda
   }
       
    @IBAction func cerrarSesion(_ sender: Any) {
        let vistaAnterior = presentingViewController
              let vistaInicial = vistaAnterior?.presentingViewController
              vistaInicial!.dismiss(animated: true)
    }
    


    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let indice = table.indexPathForSelectedRow!
        
        self.defaults.set(listaCampus[indice.row], forKey: "campus")
        
        self.defaults.set(1, forKey: "Cord")
        
    }
    

}
