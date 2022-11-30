//
//  TableViewController.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 02/11/22.
//

import UIKit
import Firebase

class TableViewController: UITableViewController {    
    var listaTalleres = [taller]()
    var db = Firestore.firestore()
    var alumno1: userAlumno!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
        
        getTalleres()
        alumno1 = getAlumnoDefault()
        print(alumno1.nombre)
    }
    
    func getTalleres(){
        var arrTalleres = [taller]()
        
        db.collection("inscripcion").getDocuments { querySnapshot, error in
            if let error = error {
                print(error.localizedDescription)
            } else {
                for document in querySnapshot!.documents{
                    let data = document.data()
                    let ident = document.documentID
                    let calif = data["calif"] as! Int
                    let codigoTaller = data["codigoTaller"] as! String
                    let grupoID = data["grupoID"] as! String
                    let periodo = data["periodo"] as! Int
                    let status = data["status"] as! String
                    let campus = data["campus"] as! String
                    let titulo = data["tituloTaller"] as! String
                    let tetramestre = data["tetramestre"] as! Int
                    
                    let unTaller = taller(ident: ident, calif: calif, codeTaller: codigoTaller, grupoID: grupoID, periodo: periodo, status: status, campus: campus, titulo: titulo, tetramestre: tetramestre)
                    arrTalleres.append(unTaller)
                    
                }
                self.listaTalleres = arrTalleres
                self.tableView.reloadData()
            }
        }
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return listaTalleres.count
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 200
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cDate = Date()
        let formatoMes = DateFormatter()
        let formatoYear = DateFormatter()
        formatoMes.dateFormat = "M"
        formatoYear.dateFormat = "YYYY"
        let mesString = formatoMes.string(from: cDate)
        let yearString = formatoYear.string(from: cDate)
        let mesActual = Int(mesString)!
        let yearActual = Int(yearString)!
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "celda", for: indexPath) as! CustomTableViewCell
        
        // Configure the cell...
        cell.LbCodigoTaller.text = listaTalleres[indexPath.row].codeTaller
        cell.LbTituloTaller.text = "\(listaTalleres[indexPath.row].titulo) (Gpo \(listaTalleres[indexPath.row].grupoID))"
        cell.LbStatus.text = listaTalleres[indexPath.row].status
        if listaTalleres[indexPath.row].status == "Reprobado"{
            cell.LbStatus.textColor = UIColor(named: "reprobado")
            cell.vista3.backgroundColor = UIColor(named: "reprobado")
            cell.LbCalif.backgroundColor = UIColor(named: "reprobado")
            
        } else if listaTalleres[indexPath.row].status == "Cursando"{
            cell.LbStatus.textColor = UIColor(named: "cursando")
            cell.vista3.backgroundColor = UIColor(named: "cursando")
            cell.LbCalif.backgroundColor = UIColor(named: "cursando")
        
        }
        else if listaTalleres[indexPath.row].status == "Aprobado"{
            cell.LbStatus.textColor = UIColor(named: "aprobado")
            cell.vista3.backgroundColor = UIColor(named: "aprobado")
            cell.LbCalif.backgroundColor = UIColor(named: "aprobado")
            
            
        }
        
        if listaTalleres[indexPath.row].periodo == 2271 {
            cell.LbPerido.text = "Enero - Abril \(yearActual)"
        }
        else if listaTalleres[indexPath.row].periodo == 2272 {
            cell.LbPerido.text = "Mayo - Agosto \(yearActual)"
        }
        else if listaTalleres[indexPath.row].periodo == 2273 {
            cell.LbPerido.text = "Septiembre - Diciembre \(yearActual)"
        }
        
        cell.LbCampus.text = listaTalleres[indexPath.row].campus
        cell.LbCalif.text = String(listaTalleres[indexPath.row].calif)
        
       
        
        return cell
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
    
    /*
     // Override to support conditional editing of the table view.
     override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the specified item to be editable.
     return true
     }
     */
    
    /*
     // Override to support editing the table view.
     override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
     if editingStyle == .delete {
     // Delete the row from the data source
     tableView.deleteRows(at: [indexPath], with: .fade)
     } else if editingStyle == .insert {
     // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
     }
     }
     */
    
    /*
     // Override to support rearranging the table view.
     override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
     
     }
     */
    
    /*
     // Override to support conditional rearranging of the table view.
     override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the item to be re-orderable.
     return true
     }
     */
    
    
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let vistaDet = segue.destination as! ViewControllerDetalle
        let indice = tableView.indexPathForSelectedRow!
        vistaDet.tallerAct = listaTalleres[indice.row]
    }


}
