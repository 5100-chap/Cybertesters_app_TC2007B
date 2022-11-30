//
//  ViewControllerGrupo.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 07/11/22.
//

import UIKit
import Firebase


class ViewControllerGrupo: UIViewController, UITableViewDelegate, UITableViewDataSource{
    
    var db = Firestore.firestore()
    let defaults = UserDefaults.standard
    var nomina: String?
    var campus: String?
    var taller: String = "Prueba"
    
    var codigo: String!
    
    var listaGrupos = [grupo]()
    
    
    @IBOutlet weak var tlTexto: UILabel!
    
    @IBOutlet weak var tlNombre: UILabel!
    
    @IBOutlet weak var tableView: UITableView!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tlTexto.text = "Grupos del taller " + taller
        tlNombre.text = defaults.string(forKey: "nombre")!
        getGrupos()
        
        
    }
    
    func getGrupos(){
        var arrGrupos = [grupo]()
        
        db.collection("grupo").whereField("codigoTaller", isEqualTo: codigo!).getDocuments() { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let campus = data["campus"] as! String
                    let codigoTaller = data["codigoTaller"] as! String
                    
                    let grupoId = data["grupoId"] as! String
                    
                    let numAlumnos = 0
                    
                    let unGrupo = grupo(ident: ident, campus: campus, codigoTaller: codigoTaller, grupoID: grupoId, numAlumnos: numAlumnos)
                    arrGrupos.append(unGrupo)
                    
                }
                self.listaGrupos = arrGrupos
                self.tableView.reloadData()
            }
        }
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return listaGrupos.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let celda = tableView.dequeueReusableCell(withIdentifier: "celda")!
        celda.textLabel?.text = "Grupo " +  listaGrupos[indexPath.row].grupoID
        celda.imageView?.image = UIImage(named:"grupo")
        return celda
    }
    
    
    @IBAction func cerrarSesión(_ sender: UIButton) {
        let vistaAnterior = presentingViewController
              let vistaInicial = vistaAnterior?.presentingViewController
              vistaInicial!.dismiss(animated: true)
        
    }
    
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        let vistaAlumnos = segue.destination as! ViewControllerAlumnos
        
        let indice = tableView.indexPathForSelectedRow!
        
        vistaAlumnos.grupoId = listaGrupos[indice.row].grupoID
        
        vistaAlumnos.codigo = listaGrupos[indice.row].codigoTaller
        
        self.defaults.set(listaGrupos[indice.row].grupoID, forKey: "grupoID")
        
        self.defaults.set(listaGrupos[indice.row].codigoTaller, forKey: "Codigo")
        
        
        
    }
    

}
