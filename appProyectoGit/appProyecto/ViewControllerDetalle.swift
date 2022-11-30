//
//  ViewControllerDetalle.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 03/11/22.
//

import UIKit

class ViewControllerDetalle: UIViewController {


    @IBOutlet weak var lbInfo: UILabel!
    
    @IBOutlet weak var lbTitulo: UILabel!
    
    @IBOutlet weak var lbStatus: UILabel!
    
    @IBOutlet weak var lbCampus: UILabel!
    
    @IBOutlet weak var txtDescrip: UITextView!
    
    @IBOutlet weak var lbCalif: UILabel!
    
    @IBOutlet weak var lbPeriodo: UILabel!
    
    var codigo : String!
    var tallerAct: taller!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let cDate = Date()
        let formatoMes = DateFormatter()
        let formatoYear = DateFormatter()
        formatoMes.dateFormat = "M"
        formatoYear.dateFormat = "YYYY"
        let mesString = formatoMes.string(from: cDate)
        let yearString = formatoYear.string(from: cDate)
        let mesActual = Int(mesString)!
        let yearActual = Int(yearString)!
        
        lbInfo.text = "Taller \(tallerAct.codeTaller).\(tallerAct.grupoID)"
        lbTitulo.text = tallerAct.titulo
        lbCampus.text = tallerAct.campus

//        lbPeriodo.text = tallerAct.periodo + " 2022"
        
        if tallerAct.periodo == 2271 {
            self.lbPeriodo.text = "Enero - Abril \(yearActual)"
        }
        else if tallerAct.periodo == 2272 {
            self.lbPeriodo.text = "Mayo - Agosto \(yearActual)"
        }
        else if tallerAct.periodo == 2273 {
            self.lbPeriodo.text = "Septiembre - Diciembre \(yearActual)"
        }

        lbStatus.text = tallerAct.status
        if tallerAct.status == "Aprobado"{
            lbStatus.textColor = UIColor(named: "aprobado")
            lbCalif.backgroundColor = UIColor(named: "aprobado")
        }
        else if tallerAct.status == "Reprobado"{
            lbStatus.textColor = UIColor(named: "reprobado")
            lbCalif.backgroundColor = UIColor(named: "reprobado")
        }
        else if tallerAct.status == "Cursando"{
            lbStatus.textColor = UIColor(named: "cursando")
            lbCalif.backgroundColor = UIColor(named: "cursando")
        }
        else if tallerAct.status == "Baja"{
            lbStatus.textColor = UIColor(named: "baja")
            lbCalif.backgroundColor = UIColor(named: "baja")
        }
        lbCalif.text = String(tallerAct.calif)
        

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
