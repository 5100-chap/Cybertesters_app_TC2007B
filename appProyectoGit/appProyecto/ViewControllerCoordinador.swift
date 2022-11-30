//
//  ViewControllerCoordinador.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 07/11/22.
//

import UIKit
import Firebase

class ViewControllerCoordinador: UIViewController, UITableViewDelegate, UITableViewDataSource{
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var nomina: String?
    var campus: String?
    
    var listaTalleres = [tallerr]()
    
    var coordinador: Int = 0
    
    @IBOutlet weak var tlCampus: UILabel!
    
    @IBOutlet weak var table: UITableView!
    
    @IBOutlet weak var tlNombre: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        coordinador = defaults.integer(forKey: "Cord")
        print(coordinador)
        
        tlCampus.text = "Lista de talleres campus " + defaults.string(forKey: "campus")!
        
        if coordinador == 0{
            getCoordinador()
            
        } else if coordinador == 1{
            
            tlNombre.text = defaults.string(forKey: "nombre")!
            
        }
        getTaller()
    
    }
    
    func getCoordinador(){
        nomina = defaults.string(forKey: "nominaCoordinador")!
        
        db.collection("coordinador").whereField("nomina", isEqualTo: nomina!)
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
    
    
    
    func getTaller(){
        
        campus = defaults.string(forKey: "campus")!
        
        var arrTalleres = [tallerr]()
        
        
        db.collection("grupo").whereField("campus", isEqualTo: campus!).getDocuments() { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let codigoTaller = data["codigoTaller"] as! String
                    
                    let titulo = data["nombre"] as! String
                    
                    let unTaller = tallerr(ident: ident, descripcion: "", codigoTaller: codigoTaller, nombreTaller: titulo)
                    arrTalleres.append(unTaller)
                    
                }
                self.listaTalleres = arrTalleres
                self.table.reloadData()
                
            }
        }
        
    }
     
     
    
    //MARK: - Métodos de data source
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return listaTalleres.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let celda = tableView.dequeueReusableCell(withIdentifier: "celda")!
        celda.textLabel?.text = listaTalleres[indexPath.row].codigoTaller
        celda.detailTextLabel?.text = listaTalleres[indexPath.row].nombreTaller
        celda.imageView?.image = UIImage(named:"taller")
        
        return celda
    }
    
    
    
    @IBAction func CerrarSesión(_ sender: UIButton) {
        let vistaAnterior = presentingViewController
        let vistaInicial = vistaAnterior?.presentingViewController
        vistaInicial!.dismiss(animated: true)
    }
    
            
            
             // MARK: - Navigation
             
             // In a storyboard-based application, you will often want to do a little preparation before navigation
             override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
                 let vistaGrupos = segue.destination as! ViewControllerGrupo
                 let indice = table.indexPathForSelectedRow!
                 vistaGrupos.taller = listaTalleres[indice.row].nombreTaller
                 
                 vistaGrupos.codigo = listaTalleres[indice.row].codigoTaller
            
             }
             
            
        }
        
    
