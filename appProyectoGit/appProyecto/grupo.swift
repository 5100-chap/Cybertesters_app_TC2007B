//
//  grupo.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 11/11/22.
//

import UIKit

class grupo: NSObject {
    var ident: String
    var campus: String
    var codigoTaller: String
    var grupoID: String
    var numAlumnos: Int
    
    
    init(ident: String, campus: String, codigoTaller: String, grupoID: String, numAlumnos: Int) {
        self.ident = ident
        self.campus = campus
        self.codigoTaller = codigoTaller
        self.grupoID = grupoID
        self.numAlumnos = numAlumnos
    }

}
