//
//  userAlumno.swift
//  appProyecto
//
//  Created by Hugo Palomares on 11/11/22.
//

import UIKit

class userAlumno: NSObject, Codable{
    var ident: String
    var matricula: String
    var nombre: String
    var campus: String
    var tetraActual: Int
    
    init(ident: String, matricula: String, nombre: String, campus: String, tetraActual: Int) {
        self.ident = ident
        self.matricula = matricula
        self.nombre = nombre
        self.campus = campus
        self.tetraActual = tetraActual
    }

}
